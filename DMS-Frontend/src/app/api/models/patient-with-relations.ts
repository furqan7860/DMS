/* tslint:disable */
/* eslint-disable */
import { PatientHistoryWithRelations } from '../models/patient-history-with-relations';
import { ScanWithRelations } from '../models/scan-with-relations';

/**
 * (tsType: PatientWithRelations, schemaOptions: { includeRelations: true })
 */
export interface PatientWithRelations {
  age: number;
  deleted?: boolean;
  gender?: string;
  history?: Array<PatientHistoryWithRelations>;
  id?: number;
  name: string;
  notes?: string;
  scan?: Array<ScanWithRelations>;
}
