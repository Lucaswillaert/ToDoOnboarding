import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module.js'
import { CreateTodoModule } from './use-cases/create-todo/create-todo.module.js'
import { GetAllTodosModule } from './use-cases/get-all-todos/get-all-todos.module.js'

@Module({
  imports: [
    CreateTodoModule,
    GetAllTodosModule,
    AuthModule
  ]
})
export class TodoModule {}
