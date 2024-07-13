export interface CaseType {
    name: string;
    code: string;
  }

  export class CaseInfo {
    name: string;
    age: number;
    gender: string;
    caseNotes: string;
    isFastDelivery: boolean;
    scans: any[];
    doctorNotes: string;
    surgicalType: string;
  }