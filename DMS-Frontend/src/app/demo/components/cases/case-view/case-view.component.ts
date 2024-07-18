import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Case, CaseWithRelations, Patient, Scan, User } from 'src/app/api/models';
import { CaseControllerService } from 'src/app/api/services';

@Component({
    selector: 'app-case-view',
    templateUrl: './case-view.component.html',
    styleUrl: './case-view.component.scss',
})
export class CaseViewComponent {
    patient: Patient | any = {};
    case:CaseWithRelations = {};
    user: User|any = {};
    scans: Scan[] = [];
    currentUser = JSON.parse(localStorage.getItem('user'));
    patientDialog = false;
    caseDialog = false

    constructor(
        private route: ActivatedRoute,
        private caseController: CaseControllerService
    ) {}

    ngOnInit() {
        const case_id = this.route.snapshot.params['id'];
        if (case_id) {
            this.getCaseInfo(case_id);
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
                                relation: 'user'
                            }
                        ]
                    }
                },
            ],
        };
        this.caseController
            .findById({ id: case_id, filter: JSON.stringify(filter) })
            .subscribe((data: any) => {
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
        // Validate and save case details
        if (this.case.case_type && this.case.delivery_date) {
          // Save logic here (e.g., API call)
          console.log('Case details saved:', this.case);
          this.caseDialog = false;
        } else {
          console.log('Please fill all required fields.');
        }
      }
    
      savePatient() {
        // Validate and save patient details
        if (this.case.patient.name && this.case.patient.age) {
          // Save logic here (e.g., API call)
          console.log('Patient details saved:', this.case.patient);
          this.patientDialog = false;
        } else {
          console.log('Please fill all required fields.');
        }
      }
    
      uploadNewScan() {
        // Logic for uploading new scan
        console.log('Upload new scan clicked');
      }
}
