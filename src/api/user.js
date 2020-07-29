// If you have your own requirements for base_url
// You can change the way you like
// Global or Axios configuration or environment variable configuration
// 如果你对于 base_url 有自己的需求，你可以改成你喜欢的方式，全局/Axios 配置/环境变量

// But most companies have chaotic technology departments
// I recommend using my flexible approach
// 但大多数公司的技术部门比较混乱，我推荐使用我这种比较灵活的方式

import { get, post } from '../utils/http'

export const base_url_1 = 'http://rap2.taobao.org:38080/app/mock/262186'

export const login = params => post(`${base_url_1}/login`, params)