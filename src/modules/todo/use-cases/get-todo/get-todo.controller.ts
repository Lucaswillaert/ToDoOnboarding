import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { UuidParam } from '@wisemen/decorators'
import { Permission } from '../../../permission/permission.enum.js'
import { Permissions } from '../../../permission/permission.decorator.js'
import { GetTodoUseCase } from './get-todo.use-case.js'
import { GetTodoResponse } from './get-todo.response.js'

@ApiTags('Todo')
@Controller('todos')
export class GetTodoController {
  constructor (
    private readonly useCase: GetTodoUseCase
  ) {}

  @Get('/:uuid')
  @Permissions(Permission.TODO_READ)
  @ApiOkResponse({
    description: 'Todo details retrieved',
    type: GetTodoResponse
  })
  async GetTodo (
    @UuidParam('uuid') uuid: string
  ): Promise<GetTodoResponse> {
    return await this.useCase.getTodo(uuid)
  }
}
