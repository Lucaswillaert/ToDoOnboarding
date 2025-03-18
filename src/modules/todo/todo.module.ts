import { Module } from '@nestjs/common'
import { CreateTodoModule } from './use-cases/create-todo/create-todo.module.js'
import { GetTodoModule } from './use-cases/get-todo/get-todo.module.js'

@Module({
  imports: [
    CreateTodoModule,
    GetTodoModule
  ]
})
export class TodoModule {}
