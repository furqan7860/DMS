import { DefaultCrudRepository, BelongsToAccessor, repository } from '@loopback/repository';
import { Scan, ScanRelations, Patient, User } from '../models';
import { DbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { PatientRepository } from './patient.repository';
import { UserRepository } from './user.repository';

export class ScanRepository extends DefaultCrudRepository<
  Scan,
  typeof Scan.prototype.id,
  ScanRelations
> {
  public readonly patient: BelongsToAccessor<Patient, typeof Scan.prototype.id>;
  public readonly user: BelongsToAccessor<User, typeof Scan.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PatientRepository')
    protected patientRepositoryGetter: Getter<PatientRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Scan, dataSource);

    this.patient = this.createBelongsToAccessorFor('patient', patientRepositoryGetter);
    this.registerInclusionResolver('patient', this.patient.inclusionResolver);

    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
