<template>
  <div class="RemWithVW">
    <div class="header">计算机科学</div>
    <ul class="math__list">
      <li v-for="(item, index) of math" :key="index" class="math__item">{{ item }}</li>
    </ul>
    <div class="banner" />
    <div>
      <h3 class="fs-16 hairline--title">transform+伪类--单边：</h3>
      <div>
        <div class="hairline__item--side fs-20">1px</div>
        <div class="hairline__item--side--fix fs-20">0.5px</div>
      </div>
    </div>
    <div>
      <h3 class="fs-16 hairline--title">transform+伪类--四边：</h3>
      <div>
        <div class="hairline__item--around fs-20">1px</div>
        <div class="hairline__item--around--fix fs-20">0.5px</div>
      </div>
    </div>
    <div>
      <h3 class="fs-16 hairline--title">box-shadow--单边：</h3>
      <div>
        <div class="hairline__item--side fs-20">1px</div>
        <div class="hairline__item--shadow--fix fs-20">0.5px</div>
      </div>
    </div>
    <div class="fs-16">
      <h3>border-image介绍--原图（背景图方式显示81*81）：</h3>
      <div class="brimg brimg--origin" />
      <h3>border-image介绍--0个参数(默认的stretch拉伸)</h3>
      <div class="brimg brimg--stretch" />
      <h3>border-image介绍--1个参数(round平铺)</h3>
      <div class="brimg brimg--round" />
      <h3>border-image介绍--1个参数(repeat平铺)</h3>
      <div class="brimg brimg--repeat" />
      <section class="brimg__desc fs-14">
        <h3>平铺VS重复：</h3>
        <p>打个比方，您从万科地产买了个99.5m*99.5m的毛坯房，地面要贴瓷砖，都是1m*1m的正方形瓷砖。</p>
        <p>
          如果是“平铺”，对不起，这1m边长的瓷砖不行，要处理！怎么处理法？很简单，每个瓷砖压成0.995m*0.995m的，这样就可以了，所以，平铺就是以完整的单元铺满整个区域。
        </p>
        <p>
          如果是“重复”，就直接把这1m*1m的瓷砖从一个角落一个一个的放置，放到头放不下了怎么办？直接把瓷砖从中间“咔”掉，于是最后会在房子的边角看到很多半截的瓷砖。
        </p>
      </section>
      <h3>border-image应用--圆角效果</h3>
      <div class="brimg--radius">圆角</div>
      <h3>border-image应用--多边框效果</h3>
      <div class="brimg--multi" />
      <h3>border-image处理1px问题</h3>
      <div>使用border-image，在元素的边框上设置一个一半透明一半显示的图片。</div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
export default {
  name: 'RemWithVW',
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
// html {
// 	font-size: 13.333333vw;
// }
// @media screen and (min-width: 660px) {
// 	html {
// 		font-size: 54px;
// 	}
// }
.RemWithVW {
  .fs-12 {
    font-size: 0.24rem;
  }
  .fs-14 {
    font-size: 0.28rem;
  }
  .fs-16 {
    font-size: 0.32rem;
  }
  .fs-18 {
    font-size: 0.36rem;
  }
  .fs-20 {
    font-size: 0.4rem;
  }
  .header {
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    color: #fff;
    font-size: 0.4rem;
    background-color: #2c3a47;
  }
  .math__list {
    display: flex;
    justify-content: space-around;
    padding: 0.1rem 0;
  }
  .math__item {
    width: 2rem;
    height: 2.4rem;
    line-height: 2.4rem;
    text-align: center;
    font-size: 0.36rem;
    background-color: #cad3c8;
  }
  .banner {
    height: 0.8rem;
    background-color: #fd7272;
    margin: 0.1rem 0.06rem;
    box-sizing: border-box;
  }
  .hairline--title {
    padding: 0.2rem 0;
  }
  .hairline__item--side {
    width: 4rem;
    height: 3rem;
    overflow: hidden;
    margin: 0.2rem auto;
    border-style: solid;
    border-color: #2c3a47;
    border-left-width: 1px;
    border-bottom-width: 1px;
  }
  .hairline__item--side--fix {
    position: relative;
    width: 4rem;
    height: 3rem;
    overflow: hidden;
    margin: 0.2rem auto;
    border: none !important;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      background-color: #2c3a47;
      transform-origin: 0 0;
      transform: scaleX(0.5);
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #2c3a47;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
  }
  .hairline__item--around {
    width: 4rem;
    height: 3rem;
    overflow: hidden;
    margin: 0.2rem auto;
    border: 1px solid #2c3a47;
  }
  .hairline__item--around--fix {
    position: relative;
    width: 4rem;
    height: 3rem;
    overflow: hidden;
    margin: 0.2rem auto;
    border: none !important;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 8rem;
      height: 6rem;
      border: 1px solid #2c3a47;
      // background-color: #2c3a47;
      transform-origin: 0 0;
      transform: scale(0.5);
      box-sizing: border-box;
    }
  }
  .hairline__item--shadow--fix {
    width: 4rem;
    height: 3rem;
    // overflow: hidden;
    margin: 0.2rem auto;
    box-shadow: inset 0 -1px 1px -1px #2c3a47;
  }
  .brimg {
    width: 300px;
    height: 100px;
    margin: 0 auto;
  }
  .brimg--origin {
    background: url('../assets/images/icon/border.png') center no-repeat;
    // background-size: contain;
  }
  .brimg--stretch {
    border: 1em solid orange;
    border-image: url('../assets/images/icon/border.png') 27;
  }
  .brimg--round {
    border: 1em solid orange;
    border-image: url('../assets/images/icon/border.png') 27 round;
  }
  .brimg--repeat {
    border: 16px solid orange;
    border-image: url('../assets/images/icon/border.png') 27 repeat;
  }
  p {
    text-indent: 28px;
  }
  .brimg--radius {
    width: 100px;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    border: 10px solid orange;
    border-image: url('../assets/images/icon/rounded_corner.png') 20 fill; // fill
  }
  .brimg--multi {
    width: 80px;
    height: 20px;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    border: 20px solid orange;
    border-image: url('../assets/images/icon/border_round.png') 20 round;
  }
}
</style>
