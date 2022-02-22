import { MongoUserRepo } from '../../../../repos';
import GetUsersUseCase from '../../get-users.use-case';

describe('#modules#users#getUsersUseCase', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('#execute', () => {
        it('should retrieve the list of users', async () => {
            const repo = new MongoUserRepo();
            const useCase = new GetUsersUseCase(repo);
            const getAllUsersMock = jest.spyOn(repo, 'getAllUsers').mockResolvedValue([
                {
                    email: '__EMAIL__',
                    password: '__PASSWORD__',
                    token: '__TOKEN__',
                },
            ] as never);

            const ret = await useCase.execute();

            expect(ret).toEqual([
                {
                    email: '__EMAIL__',
                    password: '__PASSWORD__',
                    token: '__TOKEN__',
                },
            ]);
            expect(getAllUsersMock.mock.calls).toEqual([[]]);
        });
    });
});
