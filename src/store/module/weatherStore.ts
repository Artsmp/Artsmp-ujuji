import http from '@/api/http';
import { WEATHER } from '@/app/keys';
import type { IWeather, IWeatherJson } from '@/types/weatherType';
import { defineStore } from 'pinia';

const useWeatherStore = defineStore(WEATHER, {
  state: (): Partial<IWeather> => {
    return {
      setting: {
        city: '福州',
      },
      content: undefined,
    };
  },
  actions: {
    async refreshWeather(city: string) {
      console.log(city);

      try {
        const res = await http.get<string>(
          `/weather/v1?city=${encodeURIComponent(city || this.setting?.city || '福州')}`
        );
        const tempData: IWeatherJson = JSON.parse(res.data);
        this.setting = tempData.data.weather.setting;
        this.content = tempData.data.weather.content;
        console.log(this);
      } catch (e) {
        console.log(e);
      }
    },
  },
});

const weather = useWeatherStore();

// 订阅器，state每一次变化都会执行回调函数，在此设置到本地缓存
weather.$subscribe(() => {
  localStorage.setItem(WEATHER, JSON.stringify(weather.setting));
});
// 初始化时，将本地缓存的内容赋值给store
const old = localStorage.getItem(WEATHER);
if (old) {
  weather.setting = JSON.parse(old);
}

export default useWeatherStore;
