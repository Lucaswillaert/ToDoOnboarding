import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { UpdateTodoCommand } from './update-todo.command.js'
import { UpdateTodoResponse } from './update-todo.response.js'

@Injectable()
export class UpdateTodoUseCase {
  constructor (
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}

  async update (uuid: string, attrs: Partial <UpdateTodoCommand>): Promise<UpdateTodoResponse> {
    const todo = await this.todoRepository.findOneOrFail({ where: { uuid } })

    Object.assign(todo, attrs)

    return new UpdateTodoResponse(todo)
  }
}
