<template>
  <!-- 标题和搜索 -->
  <div class="header__search">
    <h1 class="header__title">
      {{ siteConfigInfo.site_name }}
    </h1>
    <p class="header__desc">{{ siteConfigInfo.site_desc }}</p>
    <div class="search__cates">
      <a
        v-for="item in searchConfig"
        :key="item.id"
        :class="[
          'cursor-pointer',
          item.id === currentShowCateId && 'text-yellow-500 font-semibold',
        ]"
        @click="onToggleCate(item.id)"
      >
        {{ item.name }}
      </a>
    </div>
    <div class="search__sites">
      <a
        v-for="item in siteList"
        :key="item.id"
        :class="['cursor-pointer', currentShowSiteId === item.id && 'underline font-semibold']"
        @click="onToggleSite(item.id)"
      >
        {{ item.name }}
      </a>
    </div>
    <div class="input__wrapper">
      <input
        ref="searchRef"
        v-model="query"
        type="text"
        class="input__inner"
        :placeholder="currentSelectSite.placeholder"
        @keydown.enter="onSearch"
        @focus="onFocus"
      />
      <SearchCircleOutline class="input__icon cursor-pointer" @click="onSearch" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ILink, ISearch_config, ISite_config } from '@/api/front/types';
  import { SearchCircleOutline } from '@vicons/ionicons5';
  import { jumpUrl } from '@/utils/url';
  import { ref, toRefs, watch } from 'vue';

  const props = defineProps<{
    siteConfigInfo: Partial<ISite_config>;
    searchConfig: ISearch_config[];
  }>();
  // 和搜索相关的逻辑
  const { siteConfigInfo, searchConfig } = toRefs(props);
  const siteList = ref<ILink[]>([]);
  const currentShowCateId = ref(-1);
  const currentShowSiteId = ref(-1);
  const currentSelectSite = ref<Partial<ILink>>({});
  watch(searchConfig, () => {
    siteList.value = searchConfig.value[0].links;
    currentShowCateId.value = searchConfig.value[0].id;
    currentSelectSite.value = siteList.value[0];
    currentShowSiteId.value = currentSelectSite.value.id as number;
  });
  const onToggleCate = (id: number) => {
    const temps = searchConfig.value.find((item) => item.id === id);
    if (temps) {
      siteList.value = temps.links;
      currentShowCateId.value = temps.id;
      currentSelectSite.value = siteList.value[0];
      currentShowSiteId.value = currentSelectSite.value.id as number;
    }
  };
  const onToggleSite = (id: number) => {
    const temps = siteList.value.find((item) => item.id === id);
    if (temps) {
      currentSelectSite.value = temps;
      currentShowSiteId.value = currentSelectSite.value.id as number;
    }
  };

  const query = ref('');
  const searchRef = ref<HTMLInputElement | null>(null);
  const onSearch = () => {
    if (!query.value) return;
    const url = currentSelectSite.value.link!.replace('[kw]', query.value);
    jumpUrl(url);
  };
  const onFocus = () => {
    searchRef.value!.select();
  };
</script>

<style lang="scss" scoped>
  .header__search {
    @apply flex justify-center flex-col;
    .header__title {
      @apply text-3xl font-semibold text-center tracking-wider;
    }
    .header__desc {
      @apply text-center text-xs tracking-wider mt-3 mb-5;
    }
    .search__cates,
    .search__sites {
      @apply text-center space-x-3 mb-3;
    }
    .input__wrapper {
      @apply w-4/5  md:w-96 lg:w-1/3 mx-auto relative;
      .input__inner {
        @apply w-full px-3 py-2 rounded-full pr-10;
        background-color: var(--box-background-color);
        &:focus {
          background-color: var(--box-back-hover-color);
        }
      }
      .input__icon {
        @apply absolute right-2 top-1.5 fill-current w-6;
      }
    }
  }
</style>
