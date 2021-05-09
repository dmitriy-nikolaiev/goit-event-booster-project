import Handlebars from 'handlebars';
import paginatorTemplate from '../templates/paginator.hbs';

export default class Paginator {
  lastPage = 0;
  firstPage = 1;
  currentPage = 1;
  totalPages = 0;
  constructor(itemsPerPage, selector) {
    this.itemsPerPage = itemsPerPage;
    this.rootElement = document.querySelector(selector);
  }
  get page() {
    return this.currentPage;
  }
  get perPage() {
    return this.itemsPerPage;
  }

  setPage(page) {
    this.currentPage = page;
  }

  setToInitial() {
    this.currentPage = this.firstPage;
    return this.currentPage;
  }

  init(page, totalPages) {
    this.currentPage = page;
    this.totalPages = totalPages;
    this.lastPage = totalPages;
    this.renderPaginator();
  }

  renderPaginator() {
    let firstPageBlock = false;
    let lastPageBlock = false;
    let pagesToShow = [];
    if (this.totalPages > 5) {
      if (this.currentPage > 3) {
        firstPageBlock = true;
      }
      if (this.currentPage <= this.totalPages - 3) {
        lastPageBlock = true;
      }
    }

    if (this.currentPage < 4 || this.totalPages <= 5) {
      for (let i = 1; i <= 5; i += 1) {
        if (i <= this.totalPages) {
          pagesToShow.push(i);
        }
      }
    } else {
      pagesToShow = [
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1 <= this.totalPages && this.currentPage + 1,
        this.currentPage + 2 <= this.totalPages && this.currentPage + 2,
      ].filter(page => page != false);
    }

    this.rootElement.innerHTML = paginatorTemplate({
      pagesToShow: pagesToShow,
      currentPage: this.currentPage,
      lastPage: this.lastPage,
      lastPageBlock: lastPageBlock,
      firstPageBlock: firstPageBlock,
    });
    // console.log(pagesTemp);s
  }
}
