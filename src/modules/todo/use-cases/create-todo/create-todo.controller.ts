import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Permission } from '../../../permission/permission.enum.js'
import { Permissions } from '../../../permission/permission.decorator.js'
import { CreateTodoUseCase } from './create-todo.use-case.js'
import { CreateTodoResponse } from './create-todo.response.js'
import { CreateTodoCommand } from './create-todo.command.js'

@ApiTags('Todo')
@Controller('todos')
export class CreateTodoController {
  constructor (
    private readonly createTodoUseCase: CreateTodoUseCase
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateTodoResponse })
  @Permissions(Permission.TODO_CREATE)
  async createTodo (
    @Body() createTodoCommand: CreateTodoCommand
  ): Promise<CreateTodoResponse> {
    return this.createTodoUseCase.execute(createTodoCommand)
  }
}
