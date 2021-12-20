export interface ISiteConfigData {
  music_list: any;
  search_config: ISearch_config[];
  site_config: ISite_config;
  user_info: IUser_info;
}

export interface ISearch_config {
  id: number;
  name: string;
  item_order: number;
  links: ILink[];
}

export interface ILink {
  id: number;
  name: string;
  link: string;
  item_order: number;
  placeholder: string;
  cate_id: number;
  created_at: string;
}

export interface ISite_config {
  user_id: number;
  suffix: string;
  theme: string;
  icon_url: string;
  site_name: string;
  other_background_image: string;
  site_desc: string;
  site_back_animation: string;
  background_image: string;
  background_color: string;
  pure_background: boolean;
  background_music: string;
  box_link_align: string;
  site_name_color: string;
  box_background_color: string;
  box_title_color: string;
  box_link_color: string;
  box_link_hover_color: string;
  box_back_hover_color: string;
  bg_mask_color: string;
  site_notice: string;
}

export interface IUser_info {
  id: number;
  username: string;
  avatar: string;
  vip_expiration: string;
}

// 首页盒子列表数据
export interface IBoxList {
  id: number;
  title: string;
  item_order: number;
  links: IBox[];
  icon: string;
  pwd_notice: string;
  pwd: string;
  introduction: string;
}

export interface IBox {
  id: number;
  icon: string;
  box_id: number;
  link: string;
  title: string;
  item_order: number;
  description: string;
  created_at: string;
}
