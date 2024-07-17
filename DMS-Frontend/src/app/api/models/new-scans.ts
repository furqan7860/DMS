/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Scan, 'id'>, schemaOptions: { title: 'NewScans', exclude: [ 'id' ] })
 */
export interface NewScans {
  caseId?: number;
  patientId?: number;
  scanType: string;
  uploadDate: string;
  url: string;
  userId?: string;
}
