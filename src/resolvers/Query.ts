import UsersService from 'src/services/users';
import { guardUser } from 'src/util/auth';

export const Query = {
    me: (_root: never, _args: never, {req}: GraphQLContext) => {
        const user = guardUser(req.user);

        return user;
    }
}