Vue.filter('toUSD', function (jpy) {
  return jpy /100
})

Vue.filter('numberFormat', function (value) {
  return value.toLocaleString()
})

Vue.filter('readMore', function (text, length, suffix) {
  return text.substring(0, length) + suffix
})

var app = new Vue({
  el: '#app',
  data: {
    jpyPrice: 298000000,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
})
