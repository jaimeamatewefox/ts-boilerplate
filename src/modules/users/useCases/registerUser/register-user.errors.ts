export namespace RegisterUserErrors {
    export class UserAlreadyRegistered extends Error {
        constructor(email: string) {
            super(`User ${email} already exists`);
        }
    }
}
