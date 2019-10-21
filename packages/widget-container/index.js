import Vue from 'vue';
import component from './app';

if (process.env.NODE_ENV !== 'production') {
  import profile from './profile';
  component._profile_ = profile;
}
export default Vue.component('widget-container', component);
