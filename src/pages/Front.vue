<template>
  <div class="front-wrapper">
    <!-- 头部导航 -->
    <header class="header__nav flex items-center justify-between h-10 w-full px-4">
      <div class="weather">[成都] 晴转多云 14℃</div>
      <div class="options">
        <ul class="flex items-center space-x-4">
          <li class="flex items-center cursor-pointer">
            <span class="w-4 mr-1 mt-1"><NewspaperOutline /></span>
            <span>新闻</span>
          </li>
          <li class="flex items-center cursor-pointer">
            <span class="w-4 mr-1 mt-1"><ChatboxEllipsesOutline /></span>
            <span>留言</span>
          </li>
          <li class="flex items-center cursor-pointer">
            <span class="w-4 mr-1 mt-1"><Aperture /></span>
            <span>好站</span>
          </li>
          <li class="flex items-center cursor-pointer">
            <span class="w-4 mr-1 mt-1"><CalendarNumberOutline /></span>
            <span>最新</span>
          </li>
          <li class="flex items-center cursor-pointer">
            <span class="w-4 mr-1 mt-1"><SettingsOutline /></span>
            <span>设置</span>
          </li>
        </ul>
      </div>
    </header>

    <HeaderSearch :site-config-info="siteConfigInfo" />

    <!-- 盒子列表 -->
    <Boxes :box-list="boxList" :loading="loading" />

    <!-- 底部 -->
    <footer class="text-center py-8">
      <span>&copy;2021&nbsp;|&nbsp;Artsmp</span>
    </footer>

    <!-- 背景图片 -->
    <div class="bg-wrapper"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import {
    NewspaperOutline,
    ChatboxEllipsesOutline,
    Aperture,
    CalendarNumberOutline,
    SettingsOutline,
  } from '@vicons/ionicons5';
  import { useLinkList, useSiteConfig } from '@/api/front/useSiteConfig';
  import HeaderSearch from '@/components/front/HeaderSearch.vue';
  import Boxes from '../components/front/Boxes.vue';

  const { siteConfigInfo } = useSiteConfig();
  const { boxList, loading } = useLinkList(siteConfigInfo);
  const bgImg = ref('');
  watch(siteConfigInfo, (newVal) => {
    bgImg.value = `url(${newVal.background_image})`;
  });
</script>

<style lang="scss" scoped>
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
