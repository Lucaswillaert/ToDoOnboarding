import { ApiProperty } from '@nestjs/swagger'
import { Todo } from '../../entities/todo.entity.js'

export class UpdateTodoResponse {
  uuid: string

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: string

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt: string

  @ApiProperty({ type: String })
  title: string

  @ApiProperty({ type: String, nullable: true })
  description: string | null

  @ApiProperty({ type: String, nullable: true })
  deadline: string | null

  @ApiProperty({ type: String, nullable: true })
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
