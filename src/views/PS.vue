<template>
  <div class="PS">
    <header class="ps__header">自适应图片</header>
    <div class="ps__item">
      <h3 class="ps--title">img标签新属性：srcset 和 sizes--针对不同分辨率屏幕下显示不同尺寸的图片</h3>
      <!--应该是webpack无法直接解析这种路径（会把图像的固有宽度-比如480w一起解析到路径中去），估计是要用第三方插件之类的  -->
      <img
        srcset="
          ../assets/images/picture/elva-fairy-320w.jpg 320w,
          ../assets/images/picture/elva-fairy-480w.jpg 480w,
          ../assets/images/picture/elva-fairy-640w.jpg 640w,
          ../assets/images/picture/elva-fairy-800w.jpg 800w
        "
        sizes="(max-width: 320px) 320px, (max-width: 480px) 440px, (max-width: 640px) 640px, 800px"
        src="../assets/images/picture/elva-fairy-800w.jpg"
        alt="Elva dressed as a fairy"
      />
    </div>
    <div class="ps__item">
      <h3 class="ps--title">img标签新属性：srcset--针对不同分辨率屏幕下显示相同尺寸的图片</h3>
      <!--和上边儿一样的问题（会把1x、1.5x、2x一起解析到路径中去），估计是要用第三方插件之类的  -->
      <img
        srcset="
          ../assets/images/picture/elva-fairy-320w.jpg 1x,
          ../assets/images/picture/elva-fairy-480w.jpg 1.5x,
          ../assets/images/picture/elva-fairy-640w.jpg 2x
        "
        src="elva-fairy-640w.jpg"
        alt="Elva dressed as a fairy"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PS',
}
</script>

<style lang="scss">
// html {
// 	font-size: 13.333333vw;
// }
// body {
// 	font-size: 16px;
// }
// @media screen and (min-width: 660px) {
// 	html {
// 		font-size: 54px;
// 	}
// }
.PS {
  .ps__header {
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background-color: #2c3a47;
    color: #fff;
    font-size: 0.4rem;
  }
  .ps--title {
    font-size: 0.36rem;
    display: inline-block;
    background-color: #fd7272;
    color: #fff;
  }
}
</style>
