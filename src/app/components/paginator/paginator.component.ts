export class Paginator<T> {
    docs: Array<T>;
    limit: number;
    page: number;
    pages: number;
    total: number;
}