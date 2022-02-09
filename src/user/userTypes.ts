interface IUser {
    email: string;
    password: string;
    token?: string;
}

interface IAuthenticate {
    token: string;
}

export { IUser, IAuthenticate };
