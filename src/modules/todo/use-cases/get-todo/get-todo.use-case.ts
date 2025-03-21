import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { GetTodoResponse } from './get-todo.response.js'

@Injectable()
export class GetTodoUseCase {
  constructor (
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
  ) {}

  async getTodo (uuid: string): Promise<GetTodoResponse> {
    const todo = await this.todoRepository.findOneByOrFail({ uuid })

    return new GetTodoResponse(todo)
  }
}
