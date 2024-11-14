interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: Sort;
}

interface MyChatRoom {
  targetUserId: number;
  chatBotId: number;
  nickname: string;
  profileImageUrl: string;
  lastChatBotAnswer: string;
  answerStatus: string;
  isNew: boolean;
}

interface MyChatResponse {
  content: ChatRoom[];
  pageable: Pageable;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
