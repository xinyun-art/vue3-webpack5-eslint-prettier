// 淘宝web移动端适配方案（现作者本人已不推荐使用此方案，推荐使用用vw适配）
;(function flexible(window, document) {
  var docEl = document.documentElement // html节点
  var dpr = window.devicePixelRatio || 1 // 当前显示设备的物理像素分辨率与CSS像素分辨率之比,它告诉浏览器应使用多少屏幕实际像素来绘制单个CSS像素。

  /**
   * DOMContentLoaded：当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
   * window.onload：在文档装载完成后会触发 load 事件。此时，在文档中的所有对象都在DOM中，所有图片，脚本，链接以及子框都完成了装载。
   */
  // 在html文档加载和解析完成后设置body元素字体大小
  // 浏览器有最小字体限制，在pc上font-size是12px(移动端最小是8px), 也就是css像素是12，其DPR为1，在移动端dpr有可能为2和3，
  // 为了保证字体不变小，需要用12*dpr进行换算。--没懂这一块，给body设置font-size有啥用？
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  // 当一条会话历史记录被执行的时候将会触发页面显示(pageshow)事件。(这包括了后退/前进按钮操作，同时也会在onload 事件触发后初始化页面时触发)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
})(window, document)
