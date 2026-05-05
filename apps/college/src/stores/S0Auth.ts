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
        "",
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
