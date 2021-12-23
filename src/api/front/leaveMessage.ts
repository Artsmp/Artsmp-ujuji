import { HTTP_OK } from '@/app/keys';
import useUserStore from '@/store/module/useUserStore';
import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import http from '../http';

interface verifyCode {
  id: string;
  img: string;
}

interface ListData<T> {
  list: T[];
  total: number;
}

export interface IMsgData {
  id: number;
  user_id: number;
  fixed: boolean;
  nickname: string;
  content: string;
  read: boolean;
  reply: string;
  created_at: string;
}

export const useVerify = () => {
  const verifyData = ref<verifyCode>({ id: '', img: '' });
  const refresh = () => {
    http.get<verifyCode>('/verify/v1').then((res) => {
      if (res.code === HTTP_OK) {
        verifyData.value = res.data;
      }
    });
  };
  refresh();
  return {
    verifyData,
    refresh,
  };
};

export enum MsgType {
  COMMON,
  FIXED,
}

export const useLeaveMsgs = (
  props: Readonly<{
    showModal: boolean;
  }>
) => {
  const userStore = useUserStore();
  const page = ref(1);
  const size = ref(10);
  const leaveMsgs = ref<IMsgData[]>([] as IMsgData[]);
  const leaveMsgsFixed = ref<IMsgData[]>([] as IMsgData[]);
  const total = ref(0);
  const loading = ref(true);
  const refresh = (msgType: MsgType) => {
    console.log(props);
    loading.value = true;
    if (props.showModal) {
      http
        .get<ListData<IMsgData>>(`leave_msg/v1/${msgType}/${userStore.$state.id}`, {
          page: page.value,
          size: size.value,
        })
        .then((res) => {
          if (res.code === HTTP_OK) {
            leaveMsgs.value = res.data.list;
            total.value = res.data.total;
            if (msgType === MsgType.FIXED) {
              leaveMsgsFixed.value = res.data.list;
            }
          }
          loading.value = false;
        });
    }
  };
  watch(
    [userStore.$state, page, size, () => props.showModal],
    () => {
      if (!userStore.$state.id) return;
      if (leaveMsgsFixed.value?.length === 0) {
        refresh(MsgType.FIXED);
      }
      refresh(MsgType.COMMON);
    },
    { immediate: true }
  );
  return {
    refresh,
    leaveMsgs,
    leaveMsgsFixed,
    page,
    size,
    total,
    loading,
  };
};
