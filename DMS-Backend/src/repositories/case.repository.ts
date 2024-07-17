import { BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository } from '@loopback/repository';
import { Patient, Case, CaseRelations, User } from '../models';
import { DbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { PatientRepository } from './patient.repository';
import { UserRepository } from './user.repository';

export class CaseRepository extends DefaultCrudRepository<
  Case,
  typeof Case.prototype.id,
  CaseRelations
> {
  public readonly patientId: BelongsToAccessor<Patient, typeof Case.prototype.id>;
  public readonly userId: BelongsToAccessor<User, typeof Case.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PatientRepository')
    protected patientRepositoryGetter: Getter<PatientRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Case, dataSource);

    this.patientId = this.createBelongsToAccessorFor('patient', patientRepositoryGetter);
    this.registerInclusionResolver('patient', this.patientId.inclusionResolver);

    this.userId = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.userId.inclusionResolver);
  }
}
