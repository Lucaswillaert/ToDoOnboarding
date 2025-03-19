import { Body, Controller, HttpCode, Patch } from '@nestjs/common'
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger'
import { UuidParam } from '@wisemen/decorators'
import { Permission } from '../../../permission/permission.enum.js'
import { Permissions } from '../../../permission/permission.decorator.js'
import { UpdateTodoUseCase } from './update-todo.use-case.js'
import { UpdateTodoCommand } from './update-todo.command.js'

@ApiTags('Todo')
@Controller('todos')
export class UpdateTodoController {
  constructor (
    private readonly updateTodoUseCase: UpdateTodoUseCase
  ) {}

  @Patch('/:uuid')
  @HttpCode(204)
  @Permissions(Permission.TODO_UPDATE)
  @ApiNoContentResponse()
  async updateTodo (
    @UuidParam('uuid') uuid: string,
    @Body() updateTodoCommand: UpdateTodoCommand
  ): Promise<void> {
    await this.updateTodoUseCase.update(uuid, updateTodoCommand)
  }
}
