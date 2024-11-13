interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  size: number;
  content: T[][];
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
