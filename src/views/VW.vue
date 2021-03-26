<template>
  <div class="vw">
    <div class="header">计算机科学</div>
    <ul class="math__list">
      <li v-for="(item, index) of math" :key="index" class="math__item">
        {{ item }}
      </li>
    </ul>
    <div class="banner" />
    <div class="nail--fixed" />
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
export default {
  name: 'VW',
  setup() {
    const math = reactive(['离散数学', '线性代数', '概率论'])

    onMounted(() => {
      console.log('VW-onMounted')
    })

    return { math }
  },
}
</script>

<style lang="scss">
// 这种单独引入就只会在引入了的文件中引入代码，但缺点就是要在每一个需要的地方都手动引入一次。
@import '../assets/styles/variables.scss'; // 文件路径不能带括号，结尾必须带分号。
.vw {
  .header {
    height: px2vw(88);
    line-height: px2vw(88);
    text-align: center;
    color: #fff;
    font-size: px2vw(40);
    background-color: #2c3a47;
  }
  .math__list {
    display: flex;
    justify-content: space-around;
    padding: px2vw(10) 0;
  }
  .math__item {
    width: px2vw(200);
    height: px2vw(240);
    line-height: px2vw(240);
    text-align: center;
    font-size: px2vw(36);
    background-color: #cad3c8;
  }
  .banner {
    height: px2vw(80);
    background-color: #fd7272;
    margin: px2vw(10) px2vw(6);
    box-sizing: border-box;
  }
  .nail--fixed {
    position: fixed;
    left: px2vw(340);
    top: px2vw(380);
    width: px2vw(40);
    height: px2vw(40);
    background-color: #58b19f;
  }
}
</style>
