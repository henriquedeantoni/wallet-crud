export interface User{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    tel: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}