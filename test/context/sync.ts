import * as seeds from './seeds';
export { }

describe.sync = function (name, fn) {
  const options: SyncOptions = {
    seed: 'default',
    seedOn: 'beforeEach',
  }
  let cleanup = null
  // beforeAll(async () => {
  //   await sequelize.sync({ logging: false })
  //   await cosmos.client.databases.createIfNotExists({
  //     id: process.env.OT_COSMOS_DATABASEID,
  //   })
  //   if (options.seedOn === 'beforeAll' && options.seed) {
  //     await seeds.execute(options.seed)
  //   }
  // })
  beforeEach(async () => {
    if (options.seedOn === 'beforeEach' && options.seed) {
      await cosmos.client.databases.createIfNotExists({
        id: process.env.OT_COSMOS_DATABASEID,
      })
      cleanup = await seeds.execute(options.seed)
    }
  })
  // afterEach(async () => {
  //   if (options.seedOn === 'beforeEach' && options.seed) {
  //     await sequelize.truncate({ logging: false })
  //     cleanup && (await cleanup())
  //   }
  // })
  // afterAll(async () => {
  //   await sequelize.drop({ logging: false })
  //   await cosmos.delete()
  //   jest.resetAllMocks()
  //   jest.restoreAllMocks()
  // })
  return this(name, () => fn(options))
}
describe.only.sync = describe.sync
describe.skip.sync = describe.sync
interface SyncOptions {
  /** Seed ID. default value is "default"
   * @type {seeds.SeedID}
   */
  seed: seeds.SeedID
  seedOn: 'beforeAll' | 'beforeEach'
}
declare global {
  namespace jest {
    type JestTestName = number | string | Function | FunctionLike
    interface Describe {
      sync: (name: JestTestName, fn: (options: SyncOptions) => void) => void
    }
  }
}
