import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'

@Injectable()
export class GetTodoUseCase {
  constructor (
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
  ) {}

  async GetTodo (uuid: string): Promise<Todo> {
    return await this.todoRepository.findOneByOrFail({ uuid })
  }
}
