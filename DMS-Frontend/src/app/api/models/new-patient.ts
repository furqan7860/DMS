/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Patient, 'id'>, schemaOptions: { title: 'NewPatient', exclude: [ 'id' ] })
 */
export interface NewPatient {
  age: number;
  deleted?: boolean;
  gender?: string;
  name: string;
  notes?: string;
  userId?: string;
}
