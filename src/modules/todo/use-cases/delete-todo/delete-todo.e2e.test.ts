import { after, before, describe } from 'node:test'
import { EndToEndTestSetup } from '../../../../../test/setup/end-to-end-test-setup.js'
import { TestBench } from '../../../../../test/setup/test-bench.js'

describe('Delete a todo', () => {
  let setup: EndToEndTestSetup
  // let context: TestAuthContext
  // let defaultUser: TestUser
  // let adminUser: TestUser

  before(async () => {
    setup = await TestBench.setupEndToEndTest()
    // context = setup.authContext
    // defaultUser = await context.getDefaultUser()
    // adminUser = await context.getAdminUser()
  })

  after(async () => {
    await setup.teardown()
  })
})
