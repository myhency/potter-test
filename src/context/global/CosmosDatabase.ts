import 'reflect-metadata';
import { Service } from 'typedi';
import { CosmosClient, Database } from '@azure/cosmos'
import { Container } from '@azure/cosmos';

@Service()
export default class CosmosDatabase {
  public database: Database;

  constructor() {
    const client = new CosmosClient({
      endpoint: process.env.OT_COSMOS_ENDPOINT,
      key: process.env.OT_COSMOS_KEY,
    })
    this.database = client.database(process.env.OT_COSMOS_DATABASEID)
  }

  public getDatabase(): Database {
    return this.database;
  }

  public getContainer(containerName: string): Container {
    return this.database.container(containerName);
  }
}

