import { CosmosClient } from '@azure/cosmos'

const client = new CosmosClient({
  endpoint: process.env.OT_COSMOS_ENDPOINT,
  key: process.env.OT_COSMOS_KEY,
})
const database = client.database(process.env.OT_COSMOS_DATABASEID)

declare global {
  var cosmos: typeof database
}
global.cosmos = database
