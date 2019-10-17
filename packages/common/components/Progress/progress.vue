<template>
  <div class="progress">
    <div class="total-box">
      <div class="content-box">
        <div class="value-box" :style="{
      width: `${width}%`
    }"></div>
      </div>
    </div>
    <div class="label">
      <span
        @touchstart.stop="handleTap"
        @touchend.stop="handleUntap"
        class="wrap"
        style="padding: 0 4px;"
      >
        <span class="value">{{ value }}</span>/
        <span>{{ total }}</span>
        <span>{{ label }}</span>
        <span class="icon" id="luck-mark"></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: "进度"
    }
  },
  data() {
    return {};
  },
  computed: {
    width() {
      let value = this.value;
      const min = this.total * 0.01;
      if (value <= min) value = min;
      if (value >= this.total) value = this.total;
      return ((value / this.total) * 100).toFixed(2);
    }
  },
  methods: {
    handleTap() {
      this.$emit("have-tap");
    },
    handleUntap() {
      this.$emit("have-untap");
    }
  }
};
</script>
<style lang="scss" scoped>
.progress {
  width: 100%;
  display: inline-block;
  position: relative;
  text-align: center;
  .label {
    color: rgba(255, 255, 255, 0.5);
    .wrap {
      display: inline-block;
      height: 0.986667rem;
      line-height: 0.986667rem;
    }
    .value {
      color: #fff;
    }
    .icon {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url("../../assets/mark.png");
      background-size: 100% 100%;
      position: relative;
      top: 1px;
    }
  }

  .total-box {
    margin: 0 auto;
    height: 10px;
    width: 6.72rem;
    border-radius: 5px;
    position: relative;
    background-image: linear-gradient(
      to left,
      #ffb13d,
      #ff53af 34%,
      #9a73ea 68%,
      #5557f5
    );
    overflow: hidden;
    padding: 2px;
    box-sizing: border-box;
  }
  .content-box {
    border-radius: 3px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    background-origin: content-box;
    background-color: #292b8e;
  }
  .value-box {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to left, #ff60cc, #ffae41);
    text-align: center;
    border-radius: 3px;
    transition: width 1s ease-in;
  }
}
</style>
