import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'
import { UpdateTodoCommand } from './update-todo.command.js'

@Injectable()
export class UpdateTodoUseCase {
  constructor (
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}

  async update (
    uuid: string,
    command: Partial <UpdateTodoCommand>
  ): Promise<void> {
    await this.todoRepository.findOneOrFail({ where: { uuid } })

    await this.todoRepository.update({
      uuid
    }, {
      title: command.title,
      description: command.description,
      deadline: command.deadline
    })
  }
}
