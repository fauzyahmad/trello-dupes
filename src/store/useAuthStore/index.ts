
import { create } from 'zustand';
import { account } from "../../api/appwrite/client";
import { User } from "../../types/DragAndDrop";

interface AuthState {
  isLoggedIn: boolean;
  checkAuthentication: () => void;
  user: User | null;
  logoutUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: true,
  checkAuthentication: async () => {
    try {
      const user: User = await account.get();
      set({ isLoggedIn: true , user: user});
    } catch (error) {
      set({ isLoggedIn: false, user: null });
    }
  },
  logoutUser: async () => {
    await account.deleteSession('current');
    set({ isLoggedIn: false, user: null });
  }
}));

export default useAuthStore;
