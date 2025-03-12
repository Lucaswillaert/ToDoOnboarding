import { after, before, describe, it } from 'node:test'
import request from 'supertest'
import { expect } from 'expect'
import { EndToEndTestSetup } from '../../../../../test/setup/end-to-end-test-setup.js'
import { TestBench } from '../../../../../test/setup/test-bench.js'
import { TestAuthContext } from '../../../../../test/utils/test-auth-context.js'
import type { TestUser } from '../../../../app/users/tests/setup-user.type.js'
import { CreateTodoCommandBuilder } from './create-todo.command.builder.js'

describe ('Create Todo', () => {
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

  it('return 401 when not authenticated', async () => {
    const response = await request(setup.httpServer)
      .post('/todos')

    expect(response).toHaveStatus(401)
  })

  it('return 403 when not authorized', async () => {
    const response = await request(setup.httpServer)
      .post('/todos')
      .set('Authorization', `Bearer ${defaultUser.token}`)

    expect(response).toHaveStatus(403)
  })

  it('return 201', async () => {
    const command = new CreateTodoCommandBuilder()
      .withTitle('Test Todo')
      .withDescription('Test Description')
      .withDeadline(null)
      .build()

    const response = await request(setup.httpServer)
      .post('/todos')
      .set('Authorization', `Bearer ${adminUser.token}`)
      .send(command)

    expect(response).toHaveStatus(201)
    expect(response.body).toStrictEqual(expect.objectContaining({
      uuid: expect.uuid()
    }))
  })

  it('does not create a todo with no title', async () => {
    const response = await request(setup.httpServer)
      .post('/todos')
      .set('Authorization', `Bearer ${adminUser.token}`)
      .send({})

    expect(response).toHaveStatus(400)
  })
})
