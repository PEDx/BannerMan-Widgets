import Vue from 'vue';
import loadingObj from './loading.vue';

const LoadingConstructor = Vue.extend(loadingObj);

let loadingIns = null;

let getAnInstance = () => {
  if (loadingIns) {
    return loadingIns;
  }
  let divIns = document.createElement('div');
  loadingIns = new LoadingConstructor({
    el: divIns,
  });
  document.body.appendChild(loadingIns.$el);
  return loadingIns;
};

LoadingConstructor.prototype.close = function() {
  let instance = getAnInstance();
  instance.visible = false;
};

export default {
  install(Vue, options) {
    Vue.prototype.$showLoading = function(options = {}) {
      let duration = options.duration || 20000;
      let instance = getAnInstance();

      Vue.nextTick(function() {
        instance.visible = true;
        ~duration &&
          (instance.timer = setTimeout(function() {
            instance.close();
          }, duration));
      });
    };
    Vue.prototype.$hideLoading = function(options) {
      Vue.nextTick(function() {
        let instance = getAnInstance();
        instance.close();
      });
    };
  },
};
