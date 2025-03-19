import { after, before, describe, it } from 'node:test'
import request from 'supertest'
import { expect } from 'expect'
import { EndToEndTestSetup } from '../../../../../test/setup/end-to-end-test-setup.js'
import { TestAuthContext } from '../../../../../test/utils/test-auth-context.js'
import { TestUser } from '../../../../app/users/tests/setup-user.type.js'
import { TestBench } from '../../../../../test/setup/test-bench.js'
import { Todo } from '../../entities/todo.entity.js'
import { TodoEntityBuilder } from '../../builder/todo.entity.builder.js'
import { UpdateTodoCommand } from './update-todo.command.js'

describe('Update Todo', () => {
  let setup: EndToEndTestSetup
  let context: TestAuthContext
  let defaultUser: TestUser
  let adminUser: TestUser

  before(async () => {
    setup = await TestBench.setupEndToEndTest()
    context = setup.authContext
    defaultUser = await context.getDefaultUser()
    adminUser = await context.getAdminUser()
  })

  after(async () => {
    await setup.teardown()
  })

  async function seed (): Promise<Todo> {
    const seedTodo = new TodoEntityBuilder()
      .withUserUuid(adminUser.user.uuid)
      .build()

    await setup.dataSource.manager.insert(Todo, seedTodo)

    return seedTodo
  }

  it('return 401 when not authenticated', async () => {
    const response = await request(setup.httpServer)
      .patch('/todos/1')

    expect(response).toHaveStatus(401)
  })

  it('return 403 when not authorized', async () => {
    const response = await request(setup.httpServer)
      .patch('/todos/1')
      .set('Authorization', `Bearer ${defaultUser.token}`)

    expect(response).toHaveStatus(403)
  })

  it('return 200 when updating a todo', async () => {
    const seededTodo = await seed()

    const updateTodoCommand: Partial<UpdateTodoCommand> = {
      title: 'Updated Todo titel',
      description: 'Updated description',
      deadline: null
    }

    const updateResponse = await request(setup.httpServer)
      .patch(`/todos/${seededTodo.uuid}`)
      .set('Authorization', `Bearer ${adminUser.token}`)
      .send(updateTodoCommand)

    expect(updateResponse).toHaveStatus(204)
  })
})
