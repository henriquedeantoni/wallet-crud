export interface User{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    tel: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}