export namespace LoginUserErrors {
    export class UserNotFound extends Error {
        constructor(email: string) {
            super(`User ${email} not found`);
        }
    }

    export class UserInvalidPassword extends Error {
        constructor() {
            super('Invalid credentials');
        }
    }
}
