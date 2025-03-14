import { after, before, describe, it } from 'node:test'
import { expect } from 'expect'
import request from 'supertest'
import { EndToEndTestSetup } from '../../../../../test/setup/end-to-end-test-setup.js'
import { TestUser } from '../../../../app/users/tests/setup-user.type.js'
import { TestAuthContext } from '../../../../../test/utils/test-auth-context.js'
import { TestBench } from '../../../../../test/setup/test-bench.js'
import { TodoEntityBuilder } from '../../builder/todo.entity.builder.js'
import { Todo } from '../../entities/todo.entity.js'

describe('Get All Todos', () => {
  let setup: EndToEndTestSetup
  let context: TestAuthContext
  // let defaultUser: TestUser
  let adminUser: TestUser

  before(async () => {
    setup = await TestBench.setupEndToEndTest()
    context = setup.authContext
    // defaultUser = await context.getDefaultUser()
    adminUser = await context.getAdminUser()
  })
  after(async () => {
    await setup.teardown()
  })

  it('returns 401 when not authenticated', async () => {
    const response = await request(setup.httpServer)
      .get('/todos')

    expect(response).toHaveStatus(401)
  })

  it('returns 200 when empty list when there are no todos', async () => {
    const response = await request(setup.httpServer)
      .get('/todos')
      .set('Authorization', `Bearer ${adminUser.token}`)

    expect(response).toHaveStatus(200)
  })

  it('returns 200, todos in a paginated format', async () => {
    const todo1 = new TodoEntityBuilder()
      .withTitle('Test todo')
      .withDescription('Test description')
      .withCreatedAt(new Date())
      .withUpdatedAt(new Date())
      .withDeadline(null)
      .withUserUuid(adminUser.user.uuid)
      .build()

    await setup.dataSource.manager.insert(Todo, todo1)

    const response = await request(setup.httpServer)
      .get('/todos')
      .set('Authorization', `Bearer ${adminUser.token}`)
      .query({
        pagination: {
          limit: 10,
          offset: 0
        }
      })

    expect(response).toHaveStatus(200)
    expect(response.body).toStrictEqual(expect.objectContaining({
      items: [expect.objectContaining({
        uuid: todo1.uuid,
        title: todo1.title,
        description: todo1.description,
        deadline: todo1.deadline,
        isCompleted: todo1.isCompleted,
        createdAt: todo1.createdAt.toISOString(),
        updatedAt: todo1.updatedAt.toISOString(),
        userUuid: todo1.userUuid
      })],
      meta: {
        total: 1,
        offset: 0,
        limit: 10
      }
    }))
  })
})
