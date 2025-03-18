import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Query } from '@nestjs/common'
import { Permission } from '../../../permission/permission.enum.js'
import { Permissions } from '../../../permission/permission.decorator.js'
import { GetAllTodosUseCase } from './get-all-todos.use-case.js'
import { GetAllTodosResponse } from './get-all-todos.response.js'
import { GetAllTodosQuery } from './get-all-todos.query.js'

@ApiTags('Todo')
@Controller('todos')
export class GetAllTodosController {
  constructor (
    private readonly getAllTodosuseCase: GetAllTodosUseCase
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Todo items retrieved',
    type: GetAllTodosResponse })
  @Permissions(Permission.TODO_READ)
  async getAllTodos (
    @Query() query: GetAllTodosQuery
  ): Promise<GetAllTodosResponse> {
    return this.getAllTodosuseCase.getAllTodos(query)
  }
}
