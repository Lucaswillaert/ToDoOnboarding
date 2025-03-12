import { Module } from '@nestjs/common'
import { CreateTodoModule } from './use-cases/create-todo/create-todo.module.js'

@Module({
  imports: [
    CreateTodoModule
  ]
})
export class TodoModule {}
