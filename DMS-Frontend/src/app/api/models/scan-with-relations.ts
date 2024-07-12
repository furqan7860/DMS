/* tslint:disable */
/* eslint-disable */
import { PatientWithRelations } from '../models/patient-with-relations';
import { UserWithRelations } from '../models/user-with-relations';

/**
 * (tsType: ScanWithRelations, schemaOptions: { includeRelations: true })
 */
export interface ScanWithRelations {
  foreignKey?: any;
  id?: number;
  patient?: PatientWithRelations;
  patientId?: string;
  scanType: string;
  uploadDate: string;
  url: string;
  user?: UserWithRelations;
  userId?: string;
}
