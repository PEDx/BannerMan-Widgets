<template>
  <div class="render">
    <components-wrap :components="componentsModelTree"></components-wrap>
  </div>
</template>

<script>
import {
  parseQueryString,
  traversal,
  getProfileByInstance
} from "../common/js/utils";

const EVENT_CONTROLLER_TYPE = "CTRL_ON_EVENT";
const BANNER_MAN_PAGE_DATA = window.BANNER_MAN_PAGE_DATA;

export default {
  data() {
    this.onEventMap = {};
    this.componentProfileMap = {};
    return {
      componentsModelTree: []
    };
  },
  provide() {
    return {
      rootRender: this
    };
  },
  mounted() {
    const pageId = parseQueryString(location.href).id;
    this._renderPageFromLocal(pageId);
  },
  methods: {
    _handleWidgetEvent(event, id) {
      const emitEventName = `${id}|${event.type}`;
      const eventHandleList = this.onEventMap[emitEventName];
      eventHandleList && eventHandleList.forEach(handle => handle());
    },
    collectEvent(controllers, id, ins) {
      controllers.forEach(val => {
        if (val.controllerType === EVENT_CONTROLLER_TYPE) {
          const name = ins[val.propName].join("|");
          if (!this.onEventMap[name]) {
            this.onEventMap[name] = [];
          }
          this.onEventMap[name].push(ins[val.handleName]);
        }
      });
    },
    _renderPageFromLocal(pageId) {
      const widgets = this.$root.$options.components;
      console.time("renderPageFromRemote");
      document.title = BANNER_MAN_PAGE_DATA.name;
      const componentsModelTree = BANNER_MAN_PAGE_DATA.data;
      const _promiseArr = [];
      const _promiseMap = {};
      traversal(componentsModelTree, node => {
        if (!node.props) return;
        const name = node.name;
        // 初始化 prop
        Object.keys(node.props).forEach(key => {
          const _val = node.props[key];
          node.props[key] = _val;
        });
        if (this.componentProfileMap[name]) return;
        // profile map 需要在渲染前收集完毕
        this.componentProfileMap[name] = widgets[name].extendOptions._profile_;
      });
      // 开始启动渲染
      this.componentsModelTree = componentsModelTree;
      this.$nextTick(() => {
        console.timeEnd("renderPageFromRemote");
        // 收集事件
        traversal(this.componentsModelTree, node => {
          const element = document.getElementById(node.id);
          if (!element) return;
          const instance = element.__vue__;
          const _profile = getProfileByInstance(instance);
          this.collectEvent(_profile.controllers, node.id, instance);
        });
      });
    },
    getProfileByName(name) {
      if (!name) return;
      return this.componentProfileMap[name];
    }
  }
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
.render {
  background-color: #fff;
  height: 100%;
  width: 100%;
}
</style>
