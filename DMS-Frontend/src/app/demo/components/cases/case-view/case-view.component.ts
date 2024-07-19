import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Case, CaseWithRelations, Patient, Scan, User } from 'src/app/api/models';
import { CaseControllerService, ScanControllerService } from 'src/app/api/services';
import { PatientControllerControllerService } from 'src/app/api/services';
@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrl: './case-view.component.scss',
})
export class CaseViewComponent {
  patient: Patient | any = {};
  case: CaseWithRelations = {};
  user: User | any = {};
  scans: Scan[] = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  patientDialog = false;
  caseDialog = false;
  caseId: number;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private caseController: CaseControllerService,
    private patientController : PatientControllerControllerService,
    private scanController : ScanControllerService,
  ) { }

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

      this.case.deleted = false;
      delete this.case.patient;
      delete this.case.scan;
      delete this.case.user;
      let request: Observable<any> = this.caseController.updateById({ id: this.caseId, body: this.case });

      request.subscribe({
        next: () => {
          this.caseDialog = false;
        },
        error: (err) => {
          console.log('err: ', err);
        }
      });
      console.log('Case details saved:', this.case);
    } else {
      console.log('Please fill all required fields.');
    }
  }

  savePatient() {
    // Validate and save patient details
    if (this.case.patient.name && this.case.patient.age) {
      this.case.patient.deleted=false;
      let request: Observable<any> = this.patientController.updateById({ id: this.case.patient.id, body: this.case.patient });

      request.subscribe({
        next: () => {
          this.caseDialog = false;
        },
        error: (err) => {
          console.log('err: ', err);
        }
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
      console.log('Selected file:', file);

      const newScan: any = {
        id: this.case.scan.length + 1,
        uploadDate: new Date(),
        user: { username: 'CurrentUser' },
        url: 'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf' // Replace with the actual file URL after uploading
      };
      this.case.scan.push(newScan);

      // CREATE API for saving scan
      this.scanController.create({body:newScan}).subscribe({
        next:()=>{

        },error:(err)=>{

        }
      })

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

  deleteScan(scan){
    this.scanController.deleteById({id:scan.id}).subscribe({
      next:()=>{

      },
      error:()=>{
        
      }
    })
  }
}
