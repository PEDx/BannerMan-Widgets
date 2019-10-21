import Vue from 'vue';
import component from './app';
import profile from './profile';

if (process.env.NODE_ENV !== 'production') {
  component._profile_ = profile;
}
export default Vue.component('widget-container', component);
