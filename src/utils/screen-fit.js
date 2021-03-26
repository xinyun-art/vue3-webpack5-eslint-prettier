;(function () {
  const pageWidth = document.documentElement.clientWidth || document.body.clientWidth
  const remSize = pageWidth / 10
  document.documentElement.style.fontSize = remSize + 'px'
  document.body.style.fontSize = '16px'
})()
