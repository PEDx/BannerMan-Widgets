import Vue from 'vue';
import component from './app';
import profile from './profile';

if (process.env.NODE_ENV !== 'production') {
  component._profile_ = profile;
}
// 一定要在此注册组件
export default Vue.component('widget-button', component);
