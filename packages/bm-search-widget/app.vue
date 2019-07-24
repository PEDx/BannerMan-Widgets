<template>
  <div class="widget-search" v-show="select === '0'">
    <input
      v-model="value"
      type="text"
      :style="{width: `${width}px`, height: `${height}px`}"
      @click="handleClick"
    />
    <img :src="image && image.url" alt />
    <p v-html="richText"></p>
    <p>{{ custom }}</p>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      default: 100,
      type: Number
    },
    height: {
      default: 40,
      type: Number
    },
    select: {
      default: "0",
      type: String
    },
    richText: {
      default: "",
      type: String
    },
    text: {
      default: "",
      type: String
    },
    custom: {
      default: 0,
      type: Number
    },
    image: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>
<style lang="scss" scoped>
.widget-search {
  box-sizing: border-box;
  padding: 0 10px;
}
input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>

