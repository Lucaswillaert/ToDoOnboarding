import { ApiProperty } from '@nestjs/swagger'
import { Todo } from '../../entities/todo.entity.js'

export class CreateTodoResponse {
  uuid: string
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: string

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: string

  @ApiProperty()
  title: string

  @ApiProperty({ type: String, nullable: true })
  description: string | null

  @ApiProperty({ type: String, nullable: true, format: 'date-time' })
  deadline: string | null

  @ApiProperty()
  isCompleted: boolean | null

  constructor (todo: Todo) {
    this.uuid = todo.uuid
    this.createdAt = todo.createdAt.toString()
    this.updatedAt = todo.updatedAt.toString()
    this.title = todo.title
    this.description = todo.description
    this.deadline = todo.deadline?.toISOString() ?? null
    this.isCompleted = todo.isCompleted
  }
}
