import { Permission } from '../permission/permission';

export class User {
    _id: string;
    email: string;
    password: string;
    permissions: Array<Permission>;
}