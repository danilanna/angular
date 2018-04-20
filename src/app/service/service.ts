import { Permission } from '../permission/permission';

export class Service {
    _id: string;
    api: string;
    method: string;
    permissions: Array<Permission>;
}
