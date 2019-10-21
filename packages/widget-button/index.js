import Vue from 'vue';
import component from './app';

if (process.env.NODE_ENV !== 'production') {
  import profile from './profile';
  component._profile_ = profile;
}
// 一定要在此注册组件
export default Vue.component('widget-button', component);
