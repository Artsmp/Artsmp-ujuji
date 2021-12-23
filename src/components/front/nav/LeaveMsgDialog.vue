<template>
  <n-modal :show="props.showModal" :on-update:show="onUpdate">
    <n-card style="width: 500px" title="留言" size="huge" :bordered="false">
      <n-input
        v-model:value="leaveMsg"
        type="textarea"
        placeholder="留言内容，留言对所有人公开可见，请勿填写私密信息"
      />
      <div class="grid grid-cols-3 gap-2 mt-2">
        <n-input placeholder="昵称"></n-input>
        <n-input placeholder="验证码"></n-input>
        <div
          class="border border-gray-300 rounded flex justify-center cursor-pointer"
          @click="refresh"
        >
          <img :src="verifyData.img" class="h-8" />
        </div>
      </div>
      <div class="flex justify-end mt-2">
        <n-button type="primary">提交</n-button>
      </div>
      <n-spin size="small" :show="loading">
        <ul class="leave-msg overflow-auto p-3" style="height: 300px">
          <li
            v-for="item in leaveMsgsFixed"
            :key="item.id"
            class="border-t border-gray-300 pt-3 mt-3"
          >
            <div class="title flex items-center">
              <span
                :class="item.fixed ? 'bg-purple-400' : 'bg-green-400'"
                class="tag px-2 py-1 text-xs text-gray-200 rounded-full mr-2"
              >
                {{ item.fixed ? '置顶' : '留言' }}
              </span>
              <span class="text text-blue-600 font-semibold text-sm">{{ item.nickname }}</span>
            </div>
            <p class="text-xs py-3">
              <span
                class="pb-1 break-words break-all whitespace-pre-line border-b border-dashed border-gray-500 antialiased leading-6"
              >
                {{ item.content }}
              </span>
            </p>
            <div v-if="item.reply" class="text-xs">
              <div class="text-xs text-red-500 font-semibold">回复:</div>
              <span
                class="pb-1 break-words break-all whitespace-pre-line border-b border-dashed border-gray-500 antialiased leading-6"
              >
                {{ item.reply }}
              </span>
            </div>

            <div class="flex justify-end text-xs text-gray-400">
              <span>{{ getRelativeTime(item.created_at) }}</span>
            </div>
          </li>
          <li v-for="item in leaveMsgs" :key="item.id" class="border-t border-gray-300 pt-3 mt-3">
            <div class="title flex items-center">
              <span
                :class="item.fixed ? 'bg-purple-400' : 'bg-green-400'"
                class="tag px-2 py-1 text-xs text-gray-200 rounded-full mr-2"
              >
                {{ item.fixed ? '置顶' : '留言' }}
              </span>
              <span class="text text-blue-600 font-semibold text-sm">{{ item.nickname }}</span>
            </div>
            <p class="text-xs py-3">
              <span
                class="pb-1 break-words break-all whitespace-pre-line border-b border-dashed border-gray-500 antialiased leading-6"
              >
                {{ item.content }}
              </span>
            </p>
            <div v-if="item.reply" class="text-xs">
              <div class="text-xs text-red-500 font-semibold">回复:</div>
              <span
                class="pb-1 break-words break-all whitespace-pre-line border-b border-dashed border-gray-500 antialiased leading-6"
              >
                {{ item.reply }}
              </span>
            </div>

            <div class="flex justify-end text-xs text-gray-400">
              <span>{{ getRelativeTime(item.created_at) }}</span>
            </div>
          </li>
        </ul>
      </n-spin>
      <template #footer>
        <n-pagination v-model:page="page" v-model:page-size="size" :item-count="total" />
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
  import { MsgType, useLeaveMsgs, useVerify } from '@/api/front/leaveMessage';
  import { getRelativeTime } from '@/utils';
  import { ref } from 'vue';

  const props = defineProps<{
    showModal: boolean;
  }>();
  const emits = defineEmits(['update:showModal']);
  const onUpdate = (value: boolean) => {
    emits('update:showModal', value);
  };

  // 获取留言列表 以及验证码的 hook
  const { refresh, verifyData } = useVerify();
  const {
    refresh: refreshList,
    leaveMsgs,
    page,
    size,
    total,
    leaveMsgsFixed,
    loading,
  } = useLeaveMsgs(props);
  refreshList(MsgType.COMMON);

  const leaveMsg = ref('');
</script>

<style lang="scss" scoped>
  @import '../../../style/mixin';
  .leave-msg {
    @include scroll;
  }
</style>
