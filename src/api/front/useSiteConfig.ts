import { HTTP_OK } from '@/app/keys';
import useUserStore from '@/store/module/useUserStore';
import type { Ref } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';
import http from '../http';
import type { IBoxList, ISearch_config, ISiteConfigData, ISite_config } from './types';

export const useSiteConfig = () => {
  const loading = ref(true);
  const siteConfigInfo = ref<Partial<ISite_config>>({});
  const searchConfig = ref<ISearch_config[]>([]);
  const userStore = useUserStore();
  http
    .get<ISiteConfigData>('/site_config/v1/ujuji')
    .then((res) => {
      if (res.code === HTTP_OK) {
        siteConfigInfo.value = res.data.site_config;
        searchConfig.value = res.data.search_config;
        userStore.changeUser(res.data.user_info);
      }
    })
    .finally(() => {
      loading.value = false;
    });
  return {
    loading,
    siteConfigInfo,
    searchConfig,
  };
};

export const useLinkList = (siteConfigInfo: Ref<Partial<ISite_config>>) => {
  const loading = ref(true);
  const boxList = ref<Partial<IBoxList>[]>();

  watch(siteConfigInfo, () => {
    if (siteConfigInfo.value.user_id && siteConfigInfo.value.user_id > 0) {
      refresh();
    }
  });

  const refresh = () => {
    http
      .get<IBoxList[]>(`/box/v1/all/links/${siteConfigInfo.value.user_id}`)
      .then((res) => {
        if (res.code === HTTP_OK) {
          boxList.value = res.data;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return {
    loading,
    boxList,
  };
};
