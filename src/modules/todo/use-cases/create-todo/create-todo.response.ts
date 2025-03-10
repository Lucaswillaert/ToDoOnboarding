import { Todo } from '../../entities/todo.entity.js'

export class CreateTodoResponse {
  uuid: string
  createdAt: string
  updatedAt: string
  title: string
  description: string | null
  deadline: string | null
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
