export interface CaseType {
    name: string;
    code: string;
  }

  export class CaseInfo {
    name: string;
    isFastDelivery: boolean = false;
    caseNotes: string;
    doctorNotes: string;
    scans: any[];
  }