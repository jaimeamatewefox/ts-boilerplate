interface IUser {
    email: string;
    password: string;
    token?: string;
}

interface IAuthenticate {
    token: String;
}

export { IUser, IAuthenticate };
