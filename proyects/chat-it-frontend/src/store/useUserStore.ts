import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userId: null | string;
  toId: null | string;
  isAuth: boolean;
}

interface UserStore {
  userState: UserState;
  setUserState: (newState: UserState) => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userState: { userId: null, toId: null, isAuth: false },
      setUserState: (newState: Partial<UserState>) =>
        set((state) => ({
          userState: { ...state.userState, ...newState },
        })),
    }),
    {
      name: 'user-store',
    }
  )
);
