<template>
  <n-spin description="努力加载中..." :show="loading">
    <div class="boxes">
      <div v-for="item in boxList" :key="item.id" class="box">
        <div class="box__title">{{ item.title }}</div>
        <div class="box__desc">{{ item.introduction || '暂无简介' }}</div>
        <ul class="box__links">
          <li v-for="link in item.links" :key="link.id" class="link__wrap">
            <a
              :href="link.link"
              target="_blank"
              class="link"
              @mouseenter="item.introduction = link.description"
            >
              {{ link.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </n-spin>
</template>

<script setup lang="ts">
  import type { IBoxList } from '@/api/front/types';
  import { toRefs } from 'vue';

  const props = withDefaults(
    defineProps<{
      boxList: Partial<IBoxList>[];
      loading: boolean;
    }>(),
    { boxList: () => [] }
  );
  const { boxList } = toRefs(props);
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .boxes {
    @apply min-h-96 mt-6 grid grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4;
    .box {
      @apply p-3 text-center rounded-md hover:bg-opacity-50 transition;
      background-color: var(--box-background-color);

      &:hover {
        background-color: var(--box-back-hover-color);
      }
      .box__title {
        @apply font-semibold text-lg;
        color: var(--box-title-color);
      }
      .box__desc {
        @apply text-xs my-3 truncate;
      }
      .box__links {
        @apply grid grid-cols-3;
        min-height: 10rem;
        height: 10rem;
        @include hide-scroll;
        .link__wrap {
          .link {
            transition: 0.28s;
            color: var(--box-link-color);
            &:hover {
              color: var(--box-link-hover-color);
            }
          }
          @apply h-10 whitespace-nowrap mx-2.5 truncate;
        }
      }
    }
  }
</style>
