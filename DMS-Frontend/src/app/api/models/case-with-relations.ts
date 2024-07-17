/* tslint:disable */
/* eslint-disable */
import { PatientWithRelations } from '../models/patient-with-relations';
import { UserWithRelations } from '../models/user-with-relations';

/**
 * (tsType: CaseWithRelations, schemaOptions: { includeRelations: true })
 */
export interface CaseWithRelations {
  case_type?: string;
  deleted?: boolean;
  delivery_date?: string;
  foreignKey?: any;
  id?: number;
  notes?: string;
  patient?: PatientWithRelations;
  patientId?: number;
  urgent?: boolean;
  user?: UserWithRelations;
  userId?: string;
}
