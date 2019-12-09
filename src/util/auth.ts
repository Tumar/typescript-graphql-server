import User from "src/models/User";

export const guardUser = (user: User | undefined | null) => {
    if (!user) {
        throw new Error('User is not authenticated');
    }

    return user;
}