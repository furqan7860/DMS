import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Patient } from './patient.model';
import { User } from './user.model';
import { Case } from './case.model';

@model()
export class Scan extends Entity {
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
  scanType: string;  // E.g., 'MRI', 'PDF', 'Image'

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'date',
    required: true,
  })
  uploadDate: string;

  @belongsTo(() => Patient)
  patientId: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Case)
  caseId: string;

  constructor(data?: Partial<Scan>) {
    super(data);
  }
}


export interface ScanRelations {
  patient: Patient;
  userId: User;
  caseId: Case;
}

export type ScanWithRelations = Scan & ScanRelations;
