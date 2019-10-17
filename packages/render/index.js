import Vue from 'vue';
import App from './app';
import componentsWrap from './components-wrap';
import '../common/style/cssrest.css';
import './widgets';
import VTap from '../common/js/v-tap';
Vue.directive('tap', VTap);
Vue.component('components-wrap', componentsWrap);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
