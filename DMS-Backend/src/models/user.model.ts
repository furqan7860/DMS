import { User as BaseUser } from '@loopback/authentication-jwt';
import { model, property, hasMany } from '@loopback/repository';
import { PatientHistory } from './patient-history.model';
import { Scan } from './scans.models';

@model()
export class User extends BaseUser {
  @property({
    type: 'string',
  })
  role?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @hasMany(() => PatientHistory)
  updatedHistories: PatientHistory[];

  @hasMany(() => Scan)
  uploadedDocuments: Scan[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  updatedHistories: PatientHistory[];
  uploadedScans: Scan[];
}

export type UserWithRelations = User & UserRelations;
