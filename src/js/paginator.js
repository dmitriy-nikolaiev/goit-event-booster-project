import paginatorTemplate from '../templates/paginator.hbs';

class Paginator {
  lastPage = 0;
  firstPage = 1;
  currentPage = 1;
  totalPages = 0;
  constructor(itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
  }
  get page() {
    return this.currentPage;
  }
  get perPage() {
    return this.itemsPerPage;
  }

  setPage(page) {
    this.currentPage = page;
    return this.currentPage;
  }

  init(page, totalPages) {
    this.currentPage = page;
    this.totalPages = totalPages;
    this.lastPage = totalPages;
    this.renderPaginator();
  }

  renderPaginator() {
    if (this.totalPages > 5) {
      if(this.currentPage > 3)

      if(this.lastPage <= this.totalPages - 3)
    }
  }
}
