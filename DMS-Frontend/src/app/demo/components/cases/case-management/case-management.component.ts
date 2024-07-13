import { Component } from '@angular/core';
import { Case, Patient, Scan } from 'src/app/api/models';
import { CaseControllerService, PatientControllerControllerService } from 'src/app/api/services';
import { FileUpload, ImageUploadService } from 'src/app/demo/service/file-upload.service';

@Component({
  selector: 'app-case-management',
  templateUrl: './case-management.component.html',
  styleUrl: './case-management.component.scss'
})
export class CaseManagementComponent {
  items = [
    { label: 'Case Type' },
    { label: 'Case Info' },
    { label: 'Case Review' }
  ];
  case: Case = {};
  patient: Patient = {name:'', age:null};
  scan: Scan = {
    uploadDate: '',
    userId: null,
    url: '',
    scanType: ''
  };

  caseTypes: any[] = [
    { name: 'Surgical Guide', code: 'surgicalguide' },
    { name: 'Crowns', code: 'crowns' },
    { name: 'Implant Crowns', code: 'implantcrowns' }
  ];

  activeIndex: number = 0;
  selectedCaseType = null;

  uploadedFiles: any = [];

  constructor(private imageUploadService: ImageUploadService,private patientService: PatientControllerControllerService, private caseSevice: CaseControllerService) {
  }

  isCaseTypeValid(): boolean {
    return this.selectedCaseType !== null;
  }

  toggleFastDelivery() {
    this.case.urgent = !this.case.urgent;
  }

  onFileSelect(event: any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file)
    }
    console.log('this.uploadedFiles: ', this.uploadedFiles);
  }

  onRemove(event:any) {
    this.uploadedFiles = this.uploadedFiles.filter(file => file.name != event.file.name)
  }

  uploadScans() {
      // const file = new FileUpload(event.target.files[0]);
      // if (file.file) {
      //   this.imageUploadService.uploadFile(file).then(
      //     (url) => {
      //       console.log('url: ', url);
      //     },
      //     (error) => {
      //     }
      //   );
      // }
  }

  prev() {
    this.activeIndex--;
  }

  next() {
    if (this.activeIndex == 1) {
      this.uploadedFiles = this.uploadedFiles.filter(file => file.size > 2000)
    }

    if (this.activeIndex < 2) {
      this.activeIndex++;
    } else {
      this.submit();
    }
  }

  submit() {
    console.log(this.case);
    console.log(this.patient)
    console.log(this.scan)

    this.patientService.create({body: this.patient}).subscribe(patient => {
      this.caseSevice.create({body: this.case}).subscribe((acase) => {
        console.log('acase: ', acase);
        console.log('patient: ', patient);
      })
    })
  }
}
