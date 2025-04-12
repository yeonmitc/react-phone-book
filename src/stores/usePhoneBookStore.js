import { create } from "zustand";

const usePhoneBookStore = create((set, get) => ({
  phoneBook: [],
  filteredContacts: [], // 검색 결과에 따른 연락처 목록

  addContact: (name, phoneNumber) =>
    set((state) => {
      const newPhoneBook = [...state.phoneBook, { id: Date.now(), name, phoneNumber }];
      get().filterContacts(newPhoneBook); // 추가 후 필터링
      return { phoneBook: newPhoneBook };
    }),

  searchInput: "", // 입력 중인 텍스트
  searchKeyword: "", // 실제 검색 적용 대상

  setSearchInput: (input) => set({ searchInput: input }),
  applySearch: () => {
    set({ searchKeyword: get().searchInput });
    get().filterContacts(); // 검색 적용 후 연락처 필터링
  },

  filterContacts: (currentPhoneBook) => {
    const { searchKeyword } = get();
    const phoneBookToFilter = currentPhoneBook || get().phoneBook;
    const filtered = phoneBookToFilter.filter((contact) =>
      contact.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    // 이름 기준으로 오름차순 정렬
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR', { sensitivity: 'base' }));
    set({ filteredContacts: filtered });
  },

  initializeFilteredContacts: () => {
    set({ filteredContacts: get().phoneBook });
  },

  deleteContact: (id) =>
    set((state) => ({
      phoneBook: state.phoneBook.filter((contact) => contact.id !== id),
      // 삭제 후 검색어가 있다면 다시 필터링
      filteredContacts: state.filteredContacts.filter((contact) => contact.id !== id),
    })),
}));

export default usePhoneBookStore;