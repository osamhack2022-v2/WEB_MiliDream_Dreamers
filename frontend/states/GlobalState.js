import create from "zustand";

const globalState = create((set, get) => {
    const returnObj = {
        logon: false,
        getLogon: async () => {
            const response = await fetch("/api/accounts/sign");
            if (!response.ok) {
                set({ logon: false });
                return;
            }
            const data = await response.json();
            set({ logon: data });
            return data;
        },
        setLogon: (ele) => {
            set({ logon: ele });
        },
    };

    return returnObj;
});

export default globalState;
