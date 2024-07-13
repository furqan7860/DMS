import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaseInfo, CaseType } from 'src/app/models/case.model';
import { PatientService } from 'src/app/demo/service/patient.service';

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
  caseInfo: CaseInfo = new CaseInfo();

  caseTypes: CaseType[] = [
    { name: 'Surgical Guide', code: 'surgicalguide' },
    { name: 'Crowns', code: 'crowns' },
    { name: 'Implant Crowns', code: 'implantcrowns' }
  ];

  activeIndex: number = 0;
  selectedCaseType: CaseType = null;

  constructor(private http: HttpClient,private patientService: PatientService) {
    this.caseInfo = new CaseInfo();
  }

  isCaseTypeValid(): boolean {
    return this.selectedCaseType !== null;
  }

  toggleFastDelivery() {
    this.caseInfo.isFastDelivery = !this.caseInfo.isFastDelivery;
  }

  onFileSelect(event: any) {
    const files = event.files;
    this.caseInfo.scans = [];

    this.caseInfo.scans.push(files);
    console.log(this.caseInfo.scans, "this.caseInfo.scans")
  }

  prev() {
    this.activeIndex--;
  }

  next() {
    if (this.activeIndex < 2) {
      this.activeIndex++;
    } else {
      this.submit();
    }
  }

  submit() {
    console.log(this.caseInfo);
    const payload ={
      name: this.caseInfo.name,
      age: this.caseInfo.age,
      gender: this.caseInfo.gender,
      notes: this.caseInfo.caseNotes,
      deleted: false
    }
    this.patientService.addPatient(payload).subscribe(response => {
      console.log('Patient created', response);
    });
  }
}
