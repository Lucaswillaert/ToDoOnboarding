import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { CreateTodoCommand } from './create-todo.command.js'
import { CreateTodoResponse } from './create-todo.response.js'

@Injectable()
export class CreateTodoUseCase {
  constructor (
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}

  async execute (
    command: CreateTodoCommand
  ): Promise <CreateTodoResponse> {
    const todo = this.todoRepository.create(command)

    await this.todoRepository.insert(todo)

    return new CreateTodoResponse(todo)
  }
}
