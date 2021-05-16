import paginatorTemplate from '../templates/paginator.hbs';

export default class Paginator {
  lastPage = 0;
  firstPage = 1;
  currentPage = 1;
  totalPages = 0;
  pageScroller = 1;
  constructor(itemsPerPage, selector, callback = () => {}) {
    this.itemsPerPage = itemsPerPage;
    this.rootElement = document.querySelector(selector);
    this.callback = callback;
    this.eventListeners();
  }
  get page() {
    return this.currentPage - 1;
  }
  get perPage() {
    return this.itemsPerPage;
  }

  eventListeners() {
    this.rootElement.addEventListener('click', e => {
      if (e.target.nodeName == 'LI' && e.target.dataset.page) {
        this.currentPage = Number(e.target.dataset.page);
        this.callback();
        scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
      if (e.target.classList.contains('next-5')) {
        this.pageScroller += 5;
        this.pageScroller =
          this.pageScroller > this.totalPages
            ? this.totalPages
            : this.pageScroller;

        this.renderPaginator(this.pageScroller);
      }
      if (e.target.classList.contains('previous-5')) {
        this.pageScroller -= 5;
        this.pageScroller =
          this.pageScroller < this.firstPage
            ? this.firstPage
            : this.pageScroller;

        this.renderPaginator(this.pageScroller);
      }
    });
  }

  setPage(page) {
    this.currentPage = page + 1;
    this.pageScroller = this.currentPage;
    return this.currentPage;
  }

  setToInitial() {
    this.currentPage = this.firstPage;
    this.pageScroller = this.firstPage;
    return this.currentPage;
  }

  init(page, totalPages) {
    this.setPage(page);

    this.totalPages = totalPages;
    this.lastPage = totalPages;
    if (totalPages == 1) {
      this.rootElement.innerHTML = '';
      return;
    }
    this.renderPaginator();
  }

  renderPaginator(scrollPage = 0) {
    let page = scrollPage || this.currentPage;
    let firstPageBlock = false;
    let lastPageBlock = false;
    let pagesToShow = [];

    if (this.totalPages > 5) {
      firstPageBlock = page > 3 && true;
      lastPageBlock = page <= this.totalPages - 3 && true;
    }

    if (page < 4 || this.totalPages <= 5) {
      for (let i = 1; i <= 5; i += 1) {
        i <= this.totalPages && pagesToShow.push(i);
      }
    } else {
      for (let i = page - 2; i <= page + 2; i += 1) {
        i <= this.totalPages && pagesToShow.push(i);
      }
    }

    this.rootElement.innerHTML = paginatorTemplate({
      pagesToShow: pagesToShow,
      currentPage: page,
      lastPage: this.lastPage,
      lastPageBlock: lastPageBlock,
      firstPageBlock: firstPageBlock,
    });

    this.rootElement.querySelectorAll('li').forEach(element => {
      if (element.dataset.page == this.currentPage) {
        element.classList.add('current');
        element.removeAttribute('data-page');
      }
    });
  }
}
