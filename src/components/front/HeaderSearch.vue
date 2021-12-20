<template>
  <!-- 标题和搜索 -->
  <div class="header__search">
    <h1 class="header__title">
      {{ siteConfigInfo.site_name }}
    </h1>
    <p class="header__desc">{{ siteConfigInfo.site_desc }}</p>
    <div class="search__cates">
      <a class="cursor-pointer">常用</a>
      <a class="cursor-pointer">网盘</a>
    </div>
    <div class="search__sites">
      <a class="cursor-pointer">百度</a>
      <a class="cursor-pointer">开发</a>
      <a class="cursor-pointer">必应</a>
    </div>
    <div class="input__wrapper">
      <input type="text" class="input__inner" />
      <SearchCircleOutline class="input__icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ISite_config } from '@/api/front/types';
  import { toRefs } from 'vue';
  import { SearchCircleOutline } from '@vicons/ionicons5';

  const props = defineProps<{
    siteConfigInfo: Partial<ISite_config>;
  }>();
  const { siteConfigInfo } = toRefs(props);
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
