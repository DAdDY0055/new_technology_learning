console.log('ファイル読み込み');
var element = document.getElementById('innerTest');
element.innerHTML = '<strong>JavaScript</strong>で書きました'

var buttonElm = document.getElementById('testButton');
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

var fruits = ['りんご', 'もも', 'みかん'];
var fruitsStr = '';
for (var i = 0; i < fruits.length; i++) {
  fruitsStr += '<li class="fruit">' + fruits[i] + '</li>';
}

var arrayElm = document.getElementById('arrayTest');
arrayElm.innerHTML = fruitsStr;

// idと異なり、classは画面に複数配置することができるため、複数の要素が取れることがある
var fruitElms = document.getElementsByClassName('fruit');
console.log('fruitElms', fruitElms);
console.log('fruitElms.length', fruitElms.length);
for (var i = 0; i < fruitElms.length; i++) {
  console.log('i', i);
  var fruitElm = fruitElms[i];
  console.log('fruitElm.textContent', fruitElm.textContent);
}

var colorsObj = {
  red: 'あか',
  grean: 'みどり',
  blue: 'あお'
};

console.log('colorsObj', colorsObj);

console.log('colorsObj', colorsObj['red']);
console.log('colorsObj', colorsObj.red);
console.log('colorsObj', colorsObj.blue);

colorsObj['red'] = 'レッド';
console.log('colorsObj', colorsObj.red);

colorsObj.blue = 'ブルー';
console.log('colorsObj', colorsObj.blue);
