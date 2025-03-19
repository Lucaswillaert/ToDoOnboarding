import { Controller, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UuidParam } from '@wisemen/decorators'
import { Permission } from '../../../permission/permission.enum.js'
import { Permissions } from '../../../permission/permission.decorator.js'
import { DeleteTodoUseCase } from './delete-todo.use-case.js'

@ApiTags('Todo')
@Controller('todos')
export class DeleteTodoController {
  constructor (
    private readonly deleteTodoUseCase: DeleteTodoUseCase
  ) {}

  @Delete('/:todoUuid')
  @Permissions(Permission.TODO_DELETE)
  deleteTodo (@UuidParam('todoUuid') uuid: string) {
    return this.deleteTodoUseCase.execute(uuid)
  }
}
