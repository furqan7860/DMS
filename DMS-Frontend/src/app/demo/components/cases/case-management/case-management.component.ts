import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Case, Patient, Scan } from 'src/app/api/models';
import {
    CaseControllerService,
    PatientControllerControllerService,
    ScanControllerService,
} from 'src/app/api/services';
import {
    FileUpload,
    ImageUploadService,
} from 'src/app/demo/service/file-upload.service';

@Component({
    selector: 'app-case-management',
    templateUrl: './case-management.component.html',
    styleUrl: './case-management.component.scss',
})
export class CaseManagementComponent {
    items = [
        { label: 'Case Type' },
        { label: 'Case Info' },
        { label: 'Case Review' },
    ];
    case: Case = {};
    patient: Patient = { name: '', age: null };
    scans: any[] = [];

    caseTypes: any[] = [
        { name: 'Surgical Guide', code: 'surgicalguide' },
        { name: 'Crowns', code: 'crowns' },
        { name: 'Implant Crowns', code: 'implantcrowns' },
    ];

    activeIndex: number = 0;
    selectedCaseType = null;

    uploadedFiles: any = [];

    constructor(
        private imageUploadService: ImageUploadService,
        private patientService: PatientControllerControllerService,
        private caseSevice: CaseControllerService,
        private scanService: ScanControllerService,
        private http: HttpClient
    ) {}

    isCaseTypeValid(): boolean {
        return this.selectedCaseType !== null;
    }

    toggleFastDelivery() {
        this.case.urgent = !this.case.urgent;
    }

    onFileSelect(event: any) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.uploadedFiles.forEach((file) => {
            console.log('file: ', file);
            const formData = new FormData();
            formData.append("file", file);
            this.http.post('http://localhost:3000/upload', formData).subscribe({
                next: (res) => {
                    console.log('res: ', res);

                },
                error: (err) => {
                    console.log('err: ', err);

                }
            })
        });
    }

    onRemove(event: any) {
        this.uploadedFiles = this.uploadedFiles.filter(
            (file) => file.name != event.file.name
        );
    }

    uploadScans(patientId, caseId) {
        return new Promise((resolve, reject) => {
            const uploadPromises = this.uploadedFiles.map((file) => {
                file = new FileUpload(file[0]);
                if (file.file) {
                    return this.imageUploadService.uploadFile(file).then(
                        (url) => {
                            this.scans.push({
                                url: url,
                                uploadDate: new Date().toUTCString(),
                                userId: JSON.parse(localStorage.getItem('user'))?.id,
                                patientId: patientId,
                                caseId: caseId,
                            });
                        }
                    );
                } else {
                    return Promise.resolve(); // If no file, resolve immediately
                }
            });
    
            Promise.all(uploadPromises)
                .then(() => resolve(true))
                .catch((error) => reject(error));
        });
    }
    

    prev() {
        this.activeIndex--;
    }

    next() {
        if (this.activeIndex == 1) {
            this.uploadedFiles = this.uploadedFiles.filter(
                (file) => file.size > 2000
            );
        }

        if (this.activeIndex < 2) {
            this.activeIndex++;
        } else {
            this.submit();
        }
    }

    submit() {
        this.patient = {
            ...this.patient,
            userId: JSON.parse(localStorage.getItem('user'))?.id,
        };

        this.patientService
            .create({ body: this.patient })
            .subscribe((patient) => {
                this.case = {
                    ...this.case,
                    patientId: patient.id,
                    userId: JSON.parse(localStorage.getItem('user'))?.id,
                } as any;
                this.caseSevice
                    .create({ body: this.case })
                    .subscribe((acase) => {

                                this.scanService.create({
                                    body: {
                                        url: "https://imgs.search.brave.com/hZHEvqRyP7AWIbCTJyi24bNFQSIaCVP5m6Zpl3-Vwds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcy/MjU2Njg4L3Bob3Rv/L2xhaG9yZS1wYWtp/c3Rhbi1zdW5yaXNl/LWJhZHNoYWhpLW1v/c3F1ZS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9THNJaVZn/ZThUUU5qMWFkVHc1/TW1hRUttOWtZWE8t/eldXUjlsc0t3a0NY/Zz0",
                                        patientId: patient.id,
                                        caseId: acase.id,
                                        uploadDate: new Date().toISOString(),
                                        userId: JSON.parse(localStorage.getItem('user'))?.id,
                                        scanType: 'png'
                                    }
                                }as any).subscribe();
                            // })
                        // })
                    });
            });
    }
}
