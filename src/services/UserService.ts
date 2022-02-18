import 'reflect-metadata';
import { Container as typeContainer, Service } from 'typedi';
import CosmosDatabase from '@/context/global/CosmosDatabase';
import { Container } from '@azure/cosmos';

@Service()
export class UserService { 
  
  container: Container = typeContainer.get(CosmosDatabase).getContainer('users');

  public async getUsers(limit: number = 100, continuationToken?: string) {
    let results;
    try {
      results = await this.container.items.readAll({maxItemCount: limit, continuationToken}).fetchNext();
    } catch (error) {
      throw new APIError(400, 'Bad Request', error);
    }
    
    return {
      items: results.resources,
      nextPageToken: results.continuationToken,
      hasMoreResults: results.hasMoreResults,
    };
  }

  public async getUserById() {
    
  }
}

class _UserService extends UserService { }

declare global {
    namespace services {
        class UserService extends _UserService { }
        let userService: _UserService
    }
}
global.services.UserService = UserService
global.services.userService = new UserService()
