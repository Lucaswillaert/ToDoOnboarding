import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module.js'
import { CreateTodoModule } from './use-cases/create-todo/create-todo.module.js'
import { GetTodoModule } from './use-cases/get-todo/get-todo.module.js'
import { GetAllTodosModule } from './use-cases/get-all-todos/get-all-todos.module.js'
import { UpdateTodoModule } from './use-cases/update-todo/update-todo.module.js'

@Module({
  imports: [
    CreateTodoModule,
    GetTodoModule,
    GetAllTodosModule,
    UpdateTodoModule,
    AuthModule
  ]
})
export class TodoModule {}
