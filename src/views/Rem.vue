<template>
  <div class="home">
    <div class="header">计算机科学</div>
    <ul class="cs__list">
      <li v-for="(item, index) of cs" :key="index" class="cs__item">
        {{ item }}
      </li>
    </ul>
    <div ref="testLine" class="test" />
    <div class="cs__intro">
      <h1 class="title">{{ csIntro.name }}简介：</h1>
      <p class="intro">{{ csIntro.intro }}</p>
    </div>
    <div class="intro__list">
      <div
        v-for="book of csBookList"
        :key="book.id"
        :ref="
          el => {
            if (el) csBookRefs[book.id] = el
          }
        "
        class="intro__item"
      >
        <div class="item--cover" />
        <div class="item--desc">
          <h3 class="title">{{ book.name }}</h3>
          <p class="intro">{{ book.intro }}</p>
          <p class="author">作者：{{ book.author }}</p>
        </div>
      </div>
    </div>
    <div style="height: 30px; line-height: 30px; text-align: center; background-color: #f8a5c2; color: #fff">{{ count }}</div>
  </div>
</template>

<script>
import { onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, ref, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Home',
  setup() {
    const count = ref(1)
    const cs = reactive(['离散数学', '线性代数', '概率论', '数据结构', '算法导论', '操作系统', '计算机网络', '设计模式'])
    const testLine = ref(null)
    const store = useStore()
    let csIntro = ref({})
    let csBookList = ref([])
    const csBookRefs = ref([])

    onMounted(() => {
      console.log('Home-onMounted')
      initData()
      store.commit('setUser', { name: 'Art', age: 33 })
      window.addEventListener('orientationchange', ottChange, false)

      // setInterval(() => {
      // 	count.value++
      // }, 4000)
    })

    watchEffect(() => {
      // console.log('watchEffect')
      console.log('watchEffect:', count.value)
    })

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
      // console.log('onBeforeUpdate-csBookRefs:', csBookRefs.value)
      // 确保在每次更新之前重置ref  --咱也不知道为什么(・∀・(・∀・(・∀・*)，文档上写的，照做呗。。。
      csBookRefs.value = []
    })

    onUpdated(() => {
      console.log('onUpdated')
      // console.log('onUpdated-csBookRefs:', csBookRefs.value)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('orientationchange', ottChange, false)
    })

    // 此函数是用于在组合式 API 模板引用 v-for 内部使用时做的特殊处理。经实验，发现一旦有任何响应式依赖变化引起**页面更新**，都会触发这个函数。
    // 执行时机在onBeforeUpdate之后，onUpdated之前。
    const collectBookRefs = el => {
      console.log('book-ref-el：', el)
    }
    const initData = () => {
      setTimeout(() => {
        csIntro.value = {
          name: '计算机科学',
          intro:
            '计算机科学（英语：computerscience，有时缩写为CS）是系统性研究信息与计算的理论基础以及它们在计算机系统中如何实现与应用的实用技术的学科。。。',
        }
        csBookList.value = [
          {
            id: 0,
            name: '离散数学',
            intro: '离散数学（英语：Discrete mathematics）是数学的几个分支的总称，研究基于离散空间而不是连续的数学结构。。。',
            author: '平凡||伟大',
          },
          {
            id: 1,
            name: '线性代数',
            intro:
              '线性代数（英语：linear algebra）是关于向量空间和线性映射的一个数学分支。它包括对线、面和子空间的研究，同时也涉及到所有的向量空间的一般性质。。。',
            author: '平凡||伟大',
          },
          {
            id: 2,
            name: '概率论',
            intro: '概率论（英语：Probability theory）是集中研究概率及随机现象的数学分支，是研究随机性或不确定性等现象的数学。。。',
            author: '平凡||伟大',
          },
        ]
      }, 200)
    }

    const ottChange = () => {
      console.log('the orientation of the device is now ' + screen.orientation.angle)
    }

    return { count, cs, testLine, csIntro, csBookList, collectBookRefs, csBookRefs }
  },
}
</script>

<style lang="scss">
.home {
  .header {
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background-color: #2c3a47;
  }
  .cs__list {
    display: flex;
    flex-wrap: wrap;
    padding: 12px 0;
  }
  .cs__item {
    width: 110px;
    height: 130px;
    line-height: 120px;
    text-align: center;
    font-size: 18px;
    margin-bottom: 15px;
    margin-left: 11px;
    background-color: #cad3c8;
  }
  .test {
    border-top: 0.5px solid red;
  }
  .cs__intro {
    margin: 10px;
    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }
    .intro {
      line-height: 22px;
      text-indent: 32px;
      font-size: 14px;
      color: #84817a;
    }
  }
  .intro__list {
    padding: 10px;
    background-color: #d1ccc0;
  }
  .intro__item {
    display: flex;
    background-color: #fff;
    padding: 6px;
    &:not(:first-of-type) {
      margin-top: 10px;
    }
    .item--cover {
      width: 110px;
      height: 130px;
      background-color: #cad3c8;
    }
    .item--desc {
      flex: 1;
      margin-left: 10px;
      .title {
        font-size: 15px;
      }
      .intro {
        line-height: 16px;
        text-indent: 28px;
        font-size: 12px;
        color: #84817a;
        margin-top: 6px;
      }
      .author {
        font-size: 12px;
        color: #84817a;
        margin-top: 8px;
      }
    }
  }
}
</style>
