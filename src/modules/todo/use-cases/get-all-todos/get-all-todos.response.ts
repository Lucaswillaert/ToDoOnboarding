import { ApiProperty } from '@nestjs/swagger'
import { PaginatedOffsetResponse } from '@wisemen/pagination'
import { Todo } from '../../entities/todo.entity.js'

export class TodoIndexResponse {
  @ApiProperty({ type: String, format: 'uuid' })
  uuid: string

  @ApiProperty({ type: String })
  title: string

  @ApiProperty({ type: String, nullable: true })
  description: string | null

  @ApiProperty({ type: String, nullable: true, format: 'date-time' })
  deadline: string | null

  @ApiProperty({ type: Boolean, nullable: true })
  isCompleted: boolean | null

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: string

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: string | null

  @ApiProperty({ type: String })
  userUuid: string

  constructor (todo: Todo) {
    this.uuid = todo.uuid
    this.userUuid = todo.userUuid
    this.title = todo.title
    this.description = todo.description
    this.deadline = todo.deadline?.toISOString() ?? null
    this.isCompleted = todo.isCompleted
    this.createdAt = todo.createdAt.toISOString()
    this.updatedAt = todo.updatedAt?.toISOString()
  }
}

export class GetAllTodosResponse extends PaginatedOffsetResponse<TodoIndexResponse> {
  @ApiProperty({ type: TodoIndexResponse, isArray: true })
  declare items: TodoIndexResponse[]

  constructor (Todos: Todo[], total: number, limit: number, offset: number) {
    const todos = Todos.map(todo => new TodoIndexResponse(todo))

    super(todos, total, limit, offset)
  }
}
