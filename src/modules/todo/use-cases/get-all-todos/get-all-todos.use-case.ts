import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { AnyOrIgnore, InjectRepository } from '@wisemen/nestjs-typeorm'
import { typeormPagination } from '@wisemen/pagination'
import { Todo } from '../../entities/todo.entity.js'
import { AuthStorage } from '../../../auth/auth.storage.js'
import { GetAllTodosResponse } from './get-all-todos.response.js'
import { GetAllTodosQuery } from './get-all-todos.query.js'

@Injectable()
export class GetAllTodosUseCase {
  constructor (
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly authContext: AuthStorage
  ) {}

  async getAllTodos (query: GetAllTodosQuery): Promise<GetAllTodosResponse> {
    const userUuid = this.authContext.getUserUuid()
    const createdAts = query.filter?.CreatedAt
      ?.map(date => new Date(date)).map(date => new Date(date))
    const pagination = typeormPagination(query.pagination)

    const [todos, count] = await this.todoRepository.findAndCount({
      where: {
        userUuid: userUuid,
        createdAt: AnyOrIgnore(createdAts)
      },
      order: {
        uuid: 'ASC'
      },
      take: pagination.take,
      skip: pagination.skip
    })

    return new GetAllTodosResponse(
      todos,
      count,
      pagination.take,
      pagination.skip
    )
  }
}
