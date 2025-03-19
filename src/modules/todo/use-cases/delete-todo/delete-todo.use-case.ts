import { InjectRepository } from '@wisemen/nestjs-typeorm'
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'

@Injectable()
export class DeleteTodoUseCase {
  constructor (
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly dataSource: DataSource
  ) {}

  async execute (uuid: string): Promise<void> {
    await this.todoRepository.delete({ uuid: uuid })
  }
}
