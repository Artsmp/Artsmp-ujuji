<template>
  <div class="front-wrapper">
    <!-- 头部导航 -->
    <FrontNav />

    <!-- 搜索和标题 -->
    <HeaderSearch :site-config-info="siteConfigInfo" :search-config="searchConfig" />

    <!-- 盒子列表 -->
    <Boxes :box-list="boxList" :loading="loading" />

    <!-- 底部 -->
    <footer class="text-center py-8">
      <span>&copy;2021&nbsp;|&nbsp;Artsmp</span>
    </footer>

    <!-- 背景图片 -->
    <div class="bg-wrapper"></div>

    <!-- 回到顶部 -->
    <n-back-top :right="50" />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useLinkList, useSiteConfig } from '@/api/front/useSiteConfig';
  import HeaderSearch from '@/components/front/HeaderSearch.vue';
  import Boxes from '../components/front/Boxes.vue';
  import FrontNav from '@/components/front/FrontNav.vue';

  const { siteConfigInfo, searchConfig } = useSiteConfig();
  const { boxList, loading } = useLinkList(siteConfigInfo);
  const bgImg = ref('');
  watch(siteConfigInfo, (newVal) => {
    bgImg.value = `url(${newVal.background_image})`;
  });
</script>

<style lang="scss" scoped>
  @import '../style/mixin';
  :global(.front-wrapper) {
    --site-name-color: v-bind('siteConfigInfo.site_name_color');
    --site-bg-color: v-bind('siteConfigInfo.background_color');
    --site-bg-img: v-bind('bgImg');
    --site-text-color: v-bind('siteConfigInfo.site_name_color');
    --box-title-color: v-bind('siteConfigInfo.box_title_color');
    --box-link-color: v-bind('siteConfigInfo.box_link_color');
    --box-background-color: v-bind('siteConfigInfo.box_background_color');
    --box-link-hover-color: v-bind('siteConfigInfo.box_link_hover_color');
    --box-back-hover-color: v-bind('siteConfigInfo.box_back_hover_color');
  }
  .front-wrapper {
    @apply w-full h-full text-sm;
    @include hide-scroll;

    position: relative;
    color: var(--site-name-color);
    .bg-wrapper {
      position: fixed;
      z-index: -10;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-size: cover;
      background-position: center;
      background-image: var(--site-bg-img);
      background-color: var(--site-bg-color);
    }
  }
</style>
