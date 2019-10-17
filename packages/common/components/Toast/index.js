import Toast from './toast.js';

export default {
  install(Vue, options) {
    Vue.prototype.$showToast = function(options) {
      return Toast(options);
    };
  },
};
