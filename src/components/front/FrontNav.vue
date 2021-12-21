<template>
  <header class="header__nav flex items-center justify-between h-10 w-full px-4 relative">
    <div class="weather flex items-center space-x-2">
      <n-popover trigger="click">
        <template #trigger>
          <n-icon class="toggle__city cursor-pointer hover:text-yellow-500" size="20">
            <LocationOutline />
          </n-icon>
        </template>

        <n-cascader
          v-model:value="cityVal"
          placeholder="请选择"
          :expand-trigger="'click'"
          :options="city"
          class="w-32"
          check-strategy="child"
          :on-update:value="refreshWeather"
          filterable
        />
      </n-popover>
      <n-popover trigger="hover">
        <template #trigger>
          <span class="hover:text-yellow-500">{{ weatherInfo }}</span>
        </template>

        <div>
          <div>{{ weatherDetailInfo }}</div>
        </div>
      </n-popover>
    </div>
    <div class="options">
      <ul class="flex items-center space-x-3">
        <li class="items-center space-x-1 cursor-pointer hover:text-yellow-500 hidden sm:flex">
          <n-icon>
            <NewspaperOutline />
          </n-icon>
          <span>新闻</span>
        </li>
        <li class="items-center space-x-1 cursor-pointer hover:text-yellow-500 hidden sm:flex">
          <n-icon><ChatboxEllipsesOutline /></n-icon>
          <span>留言</span>
        </li>
        <li class="items-center space-x-1 cursor-pointer hover:text-yellow-500 hidden sm:flex">
          <n-icon><Aperture /></n-icon>
          <span>好站</span>
        </li>
        <li class="items-center space-x-1 cursor-pointer hover:text-yellow-500 hidden sm:flex">
          <n-icon><CalendarNumberOutline /></n-icon>
          <span>最新</span>
        </li>
        <li class="items-center space-x-1 cursor-pointer hover:text-yellow-500">
          <n-icon><SettingsOutline /></n-icon>
          <span>设置</span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import {
    NewspaperOutline,
    ChatboxEllipsesOutline,
    Aperture,
    CalendarNumberOutline,
    SettingsOutline,
    LocationOutline,
  } from '@vicons/ionicons5';
  import city from '@/assets/data/city.json';
  import useWeatherStore from '@/store/module/weatherStore';

  // 和天气相关的逻辑
  const store = useWeatherStore();
  store.refreshWeather('');
  const weatherInfo = computed(() => {
    if (!store.content) return '';
    return `[${store.content?.city}] ${store.content?.today.condition} ${store.content?.today.temp}`;
  });
  const weatherDetailInfo = computed(() => {
    if (!store.content) return '';
    return `${store.content.today.time} ${store.content.today.wind}`;
  });

  // 天气切换
  const cityVal = ref<null | string>(null);
  const refreshWeather = (value: string) => {
    cityVal.value = value;
    store.refreshWeather(value);
  };
</script>

<style lang="scss" scoped></style>
