import { InjectRepository, transaction } from '@wisemen/nestjs-typeorm'
import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Todo } from '../../entities/todo.entity.js'

@Injectable()
export class DeleteTodoUseCase {
  constructor (
    private readonly dataSource: DataSource,
   @InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>
  ) {}

  async execute (uuid: string): Promise<void> {
    await transaction(this.dataSource, async () => {
      await this.todoRepository.delete({
        uuid: uuid
      })
    })
  }
}
