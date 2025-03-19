import { v4 } from 'uuid'
import { Todo } from '../entities/todo.entity.js'

export class TodoEntityBuilder {
  private readonly todo: Todo = new Todo()

  constructor () {
    this.todo.uuid = v4()
    this.todo.title = v4()
    this.todo.description = null
    this.todo.isCompleted = false
    this.todo.userUuid = v4()
  }

  withUuid (uuid: string): TodoEntityBuilder {
    this.todo.uuid = uuid

    return this
  }

  withCreatedAt (createdAt: Date): TodoEntityBuilder {
    this.todo.createdAt = createdAt

    return this
  }

  withUpdatedAt (updatedAt: Date): TodoEntityBuilder {
    this.todo.updatedAt = updatedAt

    return this
  }

  withDeletedAt (deletedAt: Date | null): TodoEntityBuilder {
    this.todo.deletedAt = deletedAt

    return this
  }

  withTitle (title: string): TodoEntityBuilder {
    this.todo.title = title

    return this
  }

  withDescription (description: string): TodoEntityBuilder {
    this.todo.description = description

    return this
  }

  withDeadline (deadline: Date | null): TodoEntityBuilder {
    this.todo.deadline = deadline

    return this
  }

  withIsCompleted (isCompleted: boolean): TodoEntityBuilder {
    this.todo.isCompleted = isCompleted

    return this
  }

  withUserUuid (uuid: string): TodoEntityBuilder {
    this.todo.userUuid = uuid

    return this
  }

  build (): Todo {
    return this.todo
  }
}
