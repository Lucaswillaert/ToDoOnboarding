import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param } from '@nestjs/common'
import { Permission } from '../../../permission/permission.enum.js'
import { Permissions } from '../../../permission/permission.decorator.js'
import { GetTodoUseCase } from './get-todo.use-case.js'
import { GetTodoResponse } from './get-todo.response.js'

@ApiTags('Todo')
@Controller('todos/:uuid')
export class GetTodoController {
  constructor (
    private readonly useCase: GetTodoUseCase
  ) {}

  @Get()
  @Permissions(Permission.TODO_READ)
  @ApiOkResponse({
    description: 'Todo details retrieved',
    type: GetTodoResponse
  })
  async GetTodo (
    @Param('uuid') uuid: string
  ): Promise<GetTodoResponse> {
    const todo = await this.useCase.GetTodo(uuid)

    return new GetTodoResponse(todo)
  }
}
