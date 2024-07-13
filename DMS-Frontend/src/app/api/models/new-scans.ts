/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Scan, 'id'>, schemaOptions: { title: 'NewScans', exclude: [ 'id' ] })
 */
export interface NewScans {
  patientId?: string;
  scanType: string;
  uploadDate: string;
  url: string;
  userId?: string;
}
