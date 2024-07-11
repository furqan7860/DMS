import { DefaultCrudRepository, BelongsToAccessor, repository } from '@loopback/repository';
import { PatientHistory, PatientHistoryRelations, Patient, User } from '../models';
import { DbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { PatientRepository } from './patient.repository';
import { UserRepository } from './user.repository';

export class PatientHistoryRepository extends DefaultCrudRepository<
  PatientHistory,
  typeof PatientHistory.prototype.id,
  PatientHistoryRelations
> {
  public readonly patient: BelongsToAccessor<Patient, typeof PatientHistory.prototype.id>;
  public readonly user: BelongsToAccessor<User, typeof PatientHistory.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PatientRepository')
    protected patientRepositoryGetter: Getter<PatientRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(PatientHistory, dataSource);

    this.patient = this.createBelongsToAccessorFor('patient', patientRepositoryGetter);
    this.registerInclusionResolver('patient', this.patient.inclusionResolver);

    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
