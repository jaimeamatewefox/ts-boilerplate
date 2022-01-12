
interface IUser {
    id: string;
    username: string;
    email: string;
}

interface ICreateUser {
    username: string;
    email: string;
}

const users: IUser[] = [
    {
        id: '1',
        username: 'JaimeAmate',
        email: 'jaime@jaime.com',
    },
    {
        id: '2',
        username: 'RosaBerned',
        email: 'rosa@rosa.com',
    },
    {
        id: '3',
        username: 'Marene',
        email: 'matt@matt.com',
    },
    {
        id: '4',
        username: 'LucasMachado',
        email: 'lucas@lucas.com',
    },
];

export { IUser, users, ICreateUser };
