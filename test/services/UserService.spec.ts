import '@/services';
import '@/context';
describe('🟡 User Service Spec', () => {

  describe('✅ getUsers()', () => {
    it('should return 100 users without limitNumber param', async () => {
      // Given
      // When
      const result = await services.userService.getUsers();
      // Then
      expect(result).toHaveProperty('items');
      expect(result).toHaveProperty('hasMoreResults');
      expect(result).toHaveProperty('nextPageToken');
      expect(result.items).toBeInstanceOf(Array);
      expect(result.items.length).toEqual(100);
    });

    it('should return limit number of users', async () => {
      // Given
      const limitNumber = 10;
      // When
      const result = await services.userService.getUsers(limitNumber);
      // Then
      expect(result).toHaveProperty('items');
      expect(result).toHaveProperty('hasMoreResults');
      expect(result).toHaveProperty('nextPageToken');
      expect(result.items).toBeInstanceOf(Array);
      expect(result.items.length).toEqual(limitNumber);
    });

    it('should return next items when it has more results', async () => {
      // Given
      const limitNumber = 1;
      const firstResult = services.userService.getUsers(limitNumber);
      // When
      firstResult.then((x) => {
        expect(x.hasMoreResults).toBeTruthy();
        expect(x).toHaveProperty('nextPageToken');
        const secondResult = services.userService.getUsers(limitNumber, x.nextPageToken);
        secondResult.then((y) => {
          expect(y).toHaveProperty('items');
          expect(y).toHaveProperty('hasMoreResults');
          expect(y).toHaveProperty('nextPageToken');
          expect(y.items).toBeInstanceOf(Array);
          expect(y.items.length).toEqual(limitNumber);
          expect(x.items[0].id).not.toEqual(y.items[0].id);
        });
      });
    });

    it('it should return error when the nextPageToken is invalid', async () => {
      // Given
      const limitNumber = 1;
      const invalidNextPageToken = '-RID:~4xNhAP1FRwIBAAAAAAAAAA==#RT:1#TRC:1#ISV:2#IEO:65567#QCF:5'
      const firstResult = services.userService.getUsers(limitNumber);
      // When
      firstResult.then(async (x) => {
        expect(x.hasMoreResults).toBeTruthy();
        expect(x).toHaveProperty('nextPageToken');
        try {
          await services.userService.getUsers(limitNumber, invalidNextPageToken);
        } catch (error) {
          expect(error).toBeInstanceOf(APIError);
          expect(error.message).toEqual('Bad Request');
        }
      });
    });

    describe('getUser()', () => {
      it.todo('should return a user');
      it.todo('should return a user');
      it.todo('should return a user');
      it.todo('should return a user');
      it.todo('should return a user');
    });
  });
});