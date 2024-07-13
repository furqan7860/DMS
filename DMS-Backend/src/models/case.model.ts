

import { Entity, model, property, hasOne, belongsTo } from '@loopback/repository';
import { Patient, User } from '.';

@model()
export class Case extends Entity {
  @property({
    id: true,
    generated: true,
    type: 'number'
  })
  id?: any;

  @property({
    type: 'string',
  })
  case_type: string;

  @property({
    type: 'string',
  })
  delivery_date: string;

  @property({
    type: 'boolean',
  })
  urgent: boolean;
  @property({
    type: 'string',
  })
  notes: string;

  @property({
    type: 'boolean',
  })
  deleted?: boolean;

  @belongsTo(() => Patient)
  patient: string;

  @belongsTo(() => User)
  user: string;

  constructor(data?: Partial<Case>) {
    super(data);
  }
}

export interface CaseRelations {
  user: User;
  patient: Patient;
}

export type CaseWithRelations = Case & CaseRelations;
