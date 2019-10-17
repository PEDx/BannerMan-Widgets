<template>
  <div class="modal" v-show="modalShow">
    <div class="mask" v-show="visible"></div>
    <transition name="fadeInDown" v-on:after-leave="afterLeave">
      <div class="box" v-show="visible" @touchstart.stop="() => {}">
        <span class="lzIcon-action-x icon" @click="handleClose"></span>
        <div class="title">{{ title }}</div>
        <div class="content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalShow: false
    };
  },
  watch: {
    visible: function() {
      if (this.visible) this.modalShow = true;
    }
  },
  created() {
    if (this.visible) this.modalShow = true;
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
      this.$emit("model-close");
    },
    handleConfirm() {
      this.options.onConfirm && this.options.onConfirm();
    },
    handleCancel() {
      this.options.onCancel && this.options.onCancel();
    },
    afterLeave() {
      this.modalShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.modal {
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
    width: 8.613333rem;
    border-radius: 0.213333rem;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
    top: 50%;
    transform: translate(0, -50%);
    .icon {
      position: absolute;
      right: 0.32rem;
      top: 0.533333rem;
      height: 0.533333rem;
      width: 0.533333rem;
      text-align: center;
      font-size: 20px;
      line-height: 0.533333rem;
      color: #fff;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      text-align: center;
      height: 1.386667rem;
      line-height: 1.653333rem;
      background: url("../../assets/head.png") no-repeat;
      background-size: 100% 100%;
    }
    .content {
      background-color: #fff;
      padding: 0.64rem;
      font-size: 14px;
    }
    .btn {
      display: flex;
      font-size: 14px;
      padding-bottom: 4px;
      .item {
        flex: 1;
        height: 30px;
        line-height: 30px;
        text-align: center;
        &:first-child {
          border-right: 2px solid rgb(219, 219, 219);
        }
        &:active {
          color: #666;
        }
      }
    }
  }
}
</style>
