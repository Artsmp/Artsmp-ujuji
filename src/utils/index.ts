import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn'); // 全局使用
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const getRelativeTime = (time: string) => {
  return dayjs().to(dayjs(time));
};
