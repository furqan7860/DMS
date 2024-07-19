import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import {
    Case,
    CaseWithRelations,
    Patient,
    Scan,
    User,
} from 'src/app/api/models';
import {
    CaseControllerService,
    ScanControllerService,
} from 'src/app/api/services';
import { PatientControllerControllerService } from 'src/app/api/services';
@Component({
    selector: 'app-case-view',
    templateUrl: './case-view.component.html',
    styleUrl: './case-view.component.scss',
    providers: [MessageService],
})
export class CaseViewComponent {
    patient: Patient | any = {};
    case: CaseWithRelations = {};
    user: User | any = {};
    scans: Scan[] | any = [];
    currentUser = JSON.parse(localStorage.getItem('user'));
    patientDialog = false;
    caseDialog = false;
    caseId: number;
    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private route: ActivatedRoute,
        private caseController: CaseControllerService,
        private patientController: PatientControllerControllerService,
        private scanController: ScanControllerService,
        private http: HttpClient,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public location: Location
    ) {}

    ngOnInit() {
        this.caseId = this.route.snapshot.params['id'];
        if (this.caseId) {
            this.getCaseInfo(this.caseId);
        }
    }

    getCaseInfo(case_id: number) {
        const filter = {
            include: [
                {
                    relation: 'patient',
                },
                {
                    relation: 'user',
                },
                {
                    relation: 'scan',
                    order: 'id DESC',
                    scope: {
                        include: [
                            {
                                relation: 'user',
                            },
                        ],
                    },
                },
            ],
        };
        this.caseController
            .findById({ id: case_id, filter: JSON.stringify(filter) })
            .subscribe((data: any) => {
                data.delivery_date = new Date(data.delivery_date);
                this.scans = data.scan;
                this.patient = data.patient;
                this.case = data;
                this.user = data.user;
            });
    }

    showCaseDialog() {
        this.caseDialog = true;
    }

    showPatientDialog() {
        this.patientDialog = true;
    }

    saveCase() {
        if (this.case.case_type && this.case.delivery_date) {
            const updated_case = {
                userId: this.case.userId,
                notes: this.case.notes,
                case_type: this.case.case_type,
                deleted: this.case.deleted || false,
                delivery_date: this.case.delivery_date,
                urgent: this.case.urgent || false,
                id: this.case.id,
            };
            let request: Observable<any> = this.caseController.updateById({
                id: this.caseId,
                body: updated_case,
            });

            request.subscribe({
                next: () => {
                    this.caseDialog = false;
                },
                error: (err) => {
                    console.log('err: ', err);
                },
            });
            console.log('Case details saved:', this.case);
        } else {
            console.log('Please fill all required fields.');
        }
    }

    savePatient() {
        // Validate and save patient details
        if (this.case.patient.name && this.case.patient.age) {
            this.patient.deleted = false;
            this.patient.gender = this.patient.gender || '';
            let request: Observable<any> = this.patientController.updateById({
                id: this.patient.id,
                body: this.patient,
            });

            request.subscribe({
                next: () => {
                    this.caseDialog = false;
                },
                error: (err) => {
                    console.log('err: ', err);
                },
            });
            console.log('Patient details saved:', this.case.patient);
            this.patientDialog = false;
        } else {
            console.log('Please fill all required fields.');
        }
    }

    triggerFileInput() {
        this.fileInput.nativeElement.click();
    }

    onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            this.http
                .post('http://localhost:3000/upload', formData)
                .toPromise()
                .then((url: any) => {
                    if (url.imageUrl) {
                        // this.scans.push();
                        this.scanController
                            .create({
                                body: {
                                    filename: file.filename,
                                    url: url.imageUrl,
                                    uploadDate: new Date(),
                                    userId: JSON.parse(
                                        localStorage.getItem('user')
                                    )?.id,
                                    patientId: this.patient.id,
                                    caseId: this.case.id,
                                } as any,
                            })
                            .subscribe(() => this.getCaseInfo(this.case.id));
                    }
                });
            // Reset the file input
            this.fileInput.nativeElement.value = '';
        }
    }

    uploadNewScan() {
        // Logic for uploading new scan
        console.log('Upload new scan clicked');
    }

    downloadScan(url) {
        // Open the scan download URL in a new window
        window.open(url, '_blank');
    }

    deleteScan(_scan) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this scan?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.scanController.deleteById({ id: _scan.id }).subscribe({
                    next: () => {
                        this.getCaseInfo(this.case.id);
                    },
                    error: () => {},
                });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Cancelled',
                    detail: 'You have cancelled',
                });
            },
        });
    }

    deleteCase() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this case?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._deleteCase(this.case);
            },
            reject: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Cancelled',
                    detail: 'You have cancelled',
                });
            },
        });
    }

    _deleteCase(_case: CaseWithRelations) {
        this.caseController.deleteById({ id: _case.id }).subscribe({
            next: (res) => {
                this.patientController
                    .deleteById({
                        id: _case.patient.id,
                    })
                    .subscribe(() => {
                        this.case.scan.forEach((scan) => {
                            this.scanController
                                .deleteById({ id: scan.id })
                                .subscribe();
                        });
                        this.location.back();
                    });
            },
        });
    }
}
