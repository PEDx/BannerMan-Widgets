import Vue from 'vue';
import dialogObj from './dialog.vue';

const DialogConstructor = Vue.extend(dialogObj);

let dialogIns = null;

let getAnInstance = () => {
  if (dialogIns) {
    return dialogIns;
  }
  let divIns = document.createElement('div');
  dialogIns = new DialogConstructor({
    el: divIns,
  });
  document.body.appendChild(dialogIns.$el);
  return dialogIns;
};

DialogConstructor.prototype.close = function() {
  let instance = getAnInstance();
  instance.visible = false;
};
const func = function(options = {}) {
  let instance = getAnInstance();
  instance.options = options;

  Vue.nextTick(function() {
    instance.visible = true;
  });
};
func.close = function() {
  Vue.nextTick(function() {
    let instance = getAnInstance();
    instance.close();
  });
};
export default {
  install(Vue, options) {
    Vue.prototype.$dialog = func;
  },
};
