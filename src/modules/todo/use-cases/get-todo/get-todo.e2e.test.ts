import { after, before, describe, it } from 'node:test'
import request from 'supertest'
import { expect } from 'expect'
import { EndToEndTestSetup } from '../../../../../test/setup/end-to-end-test-setup.js'
import { TestAuthContext } from '../../../../../test/utils/test-auth-context.js'
import { TestUser } from '../../../../app/users/tests/setup-user.type.js'
import { TestBench } from '../../../../../test/setup/test-bench.js'
import { CreateTodoCommandBuilder } from '../create-todo/create-todo.command.builder.js'

describe('Todos', () => {
  let setup: EndToEndTestSetup
  let context: TestAuthContext
  let adminUser: TestUser
  let defaultUser: TestUser

  before(async () => {
    setup = await TestBench.setupEndToEndTest()
    context = setup.authContext
    adminUser = await context.getAdminUser()
    defaultUser = await context.getDefaultUser()
  })
  after(async () => await setup.teardown())

  it('return 401 when not authenticated', async () => {
    const response = await request(setup.httpServer)
      .get('todos/')

    expect(response).toHaveStatus(401)
  })

  it('return 403 when not authorized', async () => {
    const response = await request(setup.httpServer)
      .get('todos/')
      .set('Authorization', `Bearer ${defaultUser.token}`)

    expect(response).toHaveStatus(403)
  })

  it('returns 200 when returning a todo ', async () => {
    const command = new CreateTodoCommandBuilder()
      .withTitle('Test Todo')
      .withDescription('Test Description')
      .withDeadline(null)
      .build()

    const response = await request(setup.httpServer)
      .get('todos/1')
      .set('Authorization', `Bearer ${adminUser.token}`)
      .send(command)

    expect(response).toHaveStatus(200)
    expect(response.body).toEqual(expect.objectContaining({
      uuid: expect.uuid
    }))
  })

  it('return 404 when no todo is found', async () => {
    const response = await request(setup.httpServer)
      .get('todos/1')
      .set('Authorization', `Bearer ${adminUser.token}`)

    expect(response).toHaveStatus(404)
  })
})
