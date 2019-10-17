import Vue from 'vue';
import modalObj from './modal.vue';

const ModalConstructor = Vue.extend(modalObj);

let modalIns = null;

let getAnInstance = () => {
  if (modalIns) {
    return modalIns;
  }
  let divIns = document.createElement('div');
  modalIns = new ModalConstructor({
    el: divIns,
  });
  document.body.appendChild(modalIns.$el);
  return modalIns;
};

ModalConstructor.prototype.close = function() {
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
    Vue.prototype.$modal = func;
  },
};
