console.log('ファイル読み込み');
var element = document.getElementById('innerTest');
element.innerHTML = '<strong>JavaScript</strong>で書きました'

var buttonElm = document.getElementById('testButton');
console.log('buttonElm', buttonElm);
buttonElm.addEventListener('click', () => {
  // alert('ボタンが押されました');
  var numberElm = document.getElementById('number');
  var val = numberElm.value;
  var num = parseInt(val);
  if (num % 2 == 0) {
    alert('偶数です');
  } else {
    alert('偶数ではありません');
  }
});