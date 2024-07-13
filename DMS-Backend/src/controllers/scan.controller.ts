import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Scan} from '../models';
import {ScanRepository} from '../repositories';

export class ScanController {
  constructor(
    @repository(ScanRepository)
    public scanRepository : ScanRepository,
  ) {}

  @post('/scans')
  @response(200, {
    description: 'Scan model instance',
    content: {'application/json': {schema: getModelSchemaRef(Scan)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Scan, {
            title: 'NewScans',
            exclude: ['id'],
          }),
        },
      },
    })
    scans: Omit<Scan, 'id'>,
  ): Promise<Scan> {
    return this.scanRepository.create(scans);
  }

  @get('/scans/count')
  @response(200, {
    description: 'Scan model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Scan) where?: Where<Scan>,
  ): Promise<Count> {
    return this.scanRepository.count(where);
  }

  @get('/scans')
  @response(200, {
    description: 'Array of Scan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Scan, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Scan) filter?: Filter<Scan>,
  ): Promise<Scan[]> {
    return this.scanRepository.find(filter);
  }

  @patch('/scans')
  @response(200, {
    description: 'Scan PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Scan, {partial: true}),
        },
      },
    })
    scans: Scan,
    @param.where(Scan) where?: Where<Scan>,
  ): Promise<Count> {
    return this.scanRepository.updateAll(scans, where);
  }

  @get('/scans/{id}')
  @response(200, {
    description: 'Scan model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Scan, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Scan, {exclude: 'where'}) filter?: FilterExcludingWhere<Scan>
  ): Promise<Scan> {
    return this.scanRepository.findById(id, filter);
  }

  @patch('/scans/{id}')
  @response(204, {
    description: 'Scan PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Scan, {partial: true}),
        },
      },
    })
    scans: Scan,
  ): Promise<void> {
    await this.scanRepository.updateById(id, scans);
  }

  @put('/scans/{id}')
  @response(204, {
    description: 'Scan PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() scans: Scan,
  ): Promise<void> {
    await this.scanRepository.replaceById(id, scans);
  }

  @del('/scans/{id}')
  @response(204, {
    description: 'Scan DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.scanRepository.deleteById(id);
  }
}
