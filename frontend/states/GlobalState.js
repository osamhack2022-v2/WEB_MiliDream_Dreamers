import create from "zustand";

export const globalState = create((set, get) => {
	const returnObj = {
		logon: false,
		logonLoading: true,
		test: 3,
		testUpdate: () => set({ test: 7 }),
		setTest: () => set({ test: get().test + 1 }),
		getLogon: () => {
			return get().logonLoading || get().logon;
		},
		updateLogon: async (force = false) => {
			if (!force && !get().logonLoading) return;
			set({ logonLoading: true });
			const response = await fetch("/api/accounts/sign");
			if (!response.ok) {
				console.log("logon:", false);
				set({ logon: false, logonLoading: false });
				return;
			}
			const data = await response.json();
			console.log("logon:", data);
			set({ logon: data, logonLoading: false });
			return data;
		},
		setLogon: (ele) => {
			set({ logon: ele });
		},
	};

	return returnObj;
});

export const useBoardStore = create((set) => ({
	articleId: 0,
	boardId: 0,
	type: 0,
	category: "",
	setArticleId: (ele) => set(() => ({ articleId: ele })),
	setBoardId: (ele) => set(() => ({ boardId: ele })),
	setType: (ele) => set(() => ({ type: ele })),
	setCategory: (ele) => set(() => ({ category: ele })),
}));
