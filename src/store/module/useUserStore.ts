import type { IUser_info } from '@/api/front/types';
import { USER } from '@/app/keys';
import { defineStore } from 'pinia';

const useUserStore = defineStore(USER, {
  state: (): Partial<IUser_info> => ({}),
  actions: {
    changeUser(payload: IUser_info) {
      this.$state = payload;
    },
  },
});

export default useUserStore;
