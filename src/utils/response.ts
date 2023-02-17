export class PagedResponse<T>{
    constructor(
        private readonly items: T[],
        private readonly itemsCount: number,
        private readonly pagesCount: number,
        private readonly currentPage: number,

    ) {
    }
}