import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IS0Auth {
  token: string;
  setToken: (token: string) => void;

  numberOfLoginsRemaining: number;
  decreaseNumberOfLoginsRemaining: () => void;
  resetNumberOfLoginsRemaining: () => void;
}

export const useS0Auth = create<IS0Auth>()(
  persist(
    (set, get) => ({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0IiwiY19oYXNoIjoiNjgxNTMzZjI1OTU5NjIxOGY5ZWQ4YjRjZGU2Nzk5ODAyYWNlOTVmZjdiODQ3MWE3MjY4ZmM1NTc3ZDkxOTJjNiIsImp0aSI6ImYzNTAwNWU1LTliYWMtNDI0OS05MDUwLWMzY2YyOWZkMTA0YSIsImlhdCI6MTczMzIwMzc4NywibmJmIjoxNzMzMjAzNzg3LCJleHAiOjE3NDA5Nzk3ODcsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.lJDi8H9IY4Jf4qJoqRpC_Ww62oUsJCcvQiLlkXIGUEM",
      setToken: (token) => {
        set({ token: token });
      },
      numberOfLoginsRemaining: 5,
      decreaseNumberOfLoginsRemaining: () => {
        const currentNumberOfLoginsRemaining = get().numberOfLoginsRemaining;
        set({ numberOfLoginsRemaining: currentNumberOfLoginsRemaining - 1 });
      },
      resetNumberOfLoginsRemaining: () => {
        set({ numberOfLoginsRemaining: 5 });
      },
    }),
    { name: "S0Auth" }
  )
);
