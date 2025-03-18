import { Body, Controller, Param, Patch } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Permission } from '../../../permission/permission.enum.js'
import { Permissions } from '../../../permission/permission.decorator.js'
import { UpdateTodoUseCase } from './update-todo.use-case.js'
import { UpdateTodoCommand } from './update-todo.command.js'
import { UpdateTodoResponse } from './update-todo.response.js'

@ApiTags('Todo')
@Controller('todos')
export class UpdateTodoController {
  constructor (
    private readonly updateTodoUseCase: UpdateTodoUseCase
  ) {}

  @Patch('/:uuid')
  @ApiOkResponse({ type: UpdateTodoResponse })
  @Permissions(Permission.TODO_UPDATE)
  async updateTodo (
    @Param('uuid') uuid: string, @Body() updateTodoCommand: UpdateTodoCommand
  ): Promise<UpdateTodoResponse> {
    return await this.updateTodoUseCase.update(uuid, updateTodoCommand)
  }
}
