import { Component } from '@angular/core';
import { CaseInfo, CaseType } from 'src/app/models/case.model';

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


  constructor() {
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
  }

}
