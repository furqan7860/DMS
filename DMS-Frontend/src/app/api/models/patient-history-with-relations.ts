/* tslint:disable */
/* eslint-disable */
import { PatientWithRelations } from '../models/patient-with-relations';
import { UserWithRelations } from '../models/user-with-relations';

/**
 * (tsType: PatientHistoryWithRelations, schemaOptions: { includeRelations: true })
 */
export interface PatientHistoryWithRelations {
  actionDate: string;
  actionType: string;
  details?: string;
  foreignKey?: any;
  id?: number;
  patient?: PatientWithRelations;
  patientId?: string;
  user?: UserWithRelations;
  userId?: string;
}
