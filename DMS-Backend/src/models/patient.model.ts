import { Entity, model, property, hasMany } from '@loopback/repository';
import { Scan } from './scans.models';
import { PatientHistory } from './patient-history.model';

@model()
export class Patient extends Entity {
  @property({
    id: true,
    generated: true,
    type: 'number'
  })
  id?: any;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'string',
  })
  gender: string;


  @property({
    type: 'string',
  })
  notes: string;

  @property({
    type: 'boolean',
  })
  deleted?: boolean;

  @hasMany(() => PatientHistory)
  history: PatientHistory[];

  @hasMany(() => Scan)
  scan: Scan[];

  constructor(data?: Partial<Patient>) {
    super(data);
  }
}

export interface PatientRelations {
  history: PatientHistory[];
  scan: Scan[];
}

export type PatientWithRelations = Patient & PatientRelations;
