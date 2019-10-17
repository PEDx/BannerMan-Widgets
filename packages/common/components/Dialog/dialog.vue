<template>
  <div class="dialog" v-show="dialogShow">
    <div class="mask" v-show="visible"></div>
    <transition name="scale" v-on:after-leave="afterLeave">
      <div class="box" v-show="visible" @touchstart.stop="() => {}">
        <div class="title">{{ options.title }}</div>
        <div class="content">{{ options.content }}</div>
        <div class="btn border-line-1px">
          <div class="item border-line-1px-r" @click="handleCancel">取消</div>
          <div class="item" @click="handleConfirm">充值</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      visible: false,
      dialogShow: false
    };
  },
  watch: {
    visible: function() {
      if (this.visible) this.dialogShow = true;
    }
  },
  created() {
    if (this.visible) this.dialogShow = true;
  },
  methods: {
    handleConfirm() {
      this.options.onConfirm && this.options.onConfirm();
    },
    handleCancel() {
      this.options.onConcel && this.options.onConcel();
    },
    afterLeave() {
      this.dialogShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .box {
    position: relative;
    z-index: 3;
    width: 280px;
    min-height: 60px;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 8px;
    box-sizing: border-box;
    overflow: hidden;
    top: 50%;
    transform: translate(0, -50%);
    .title {
      font-size: 16px;
      text-align: center;
      padding-top: 0.64rem;
      font-weight: 500;
    }
    .content {
      padding: 0.64rem;
      padding-top: 0.32rem;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #7d7e80;
    }
    .btn {
      display: flex;
      font-size: 14px;
      .item {
        flex: 1;
        height: 50px;
        line-height: 50px;
        text-align: center;
        &:active {
          color: #666;
          background-color: #e6e6e6;
        }
      }
    }
  }
}
</style>
