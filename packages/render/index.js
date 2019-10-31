import Vue from 'vue';
import App from './app';
import componentsWrap from './components-wrap';
import '../common/style/cssrest.css';
import VTap from '../common/js/v-tap';


Vue.component('components-wrap', componentsWrap);
Vue.directive('tap', VTap);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
