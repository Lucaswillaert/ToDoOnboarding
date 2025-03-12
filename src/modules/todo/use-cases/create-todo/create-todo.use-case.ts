import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { AuthStorage } from '../../../auth/auth.storage.js'
import { CreateTodoCommand } from './create-todo.command.js'
import { CreateTodoResponse } from './create-todo.response.js'

@Injectable()
export class CreateTodoUseCase {
  constructor (
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly authContext: AuthStorage
  ) {}

  async execute (command: CreateTodoCommand): Promise <CreateTodoResponse> {
    const todo = this.todoRepository.create({
      title: command.title,
      description: command.description,
      deadline: (command.deadline != null) ? new Date(command.deadline) : null,
      userUuid: this.authContext.getUserUuid()
    })

    await this.todoRepository.insert(todo)

    return new CreateTodoResponse(todo)
  }
}
