var monthText = Array(12).fill(0).map((e, i) => `${i + 1} 月`);
var dayText = Array(31).fill(0).map((e, i) => `${i + 1} 日`);
var weekText = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
var hourText = Array(24).fill(0).map((e, i) => `${i} 时`);
var minuteText = Array(60).fill(0).map((e, i) => `${i} 分`);
var secondsText = Array(60).fill(0).map((e, i) => `${i} 秒`);

var clock = document.getElementById("clock");
var lastValue = [];
var monthList = [];
var dayList = [];
var weekList = [];
var hourList = [];
var minuteList = [];
var secondsList = [];
var isCircle = false;
var textSet = [
  [monthText, monthList],
  [dayText, dayList],
  [weekText, weekList],
  [hourText, hourList],
  [minuteText, minuteList],
  [secondsText, secondsList],
];

function init () {
  // 添加 label
  for (let i = 0; i < textSet.length; i++) {
    var txtList = textSet[i][0];
    var valList = textSet[i][1];
    for (let j = 0; j < txtList.length; j++) {
      let label = createLabel(txtList[j]);
      clock.appendChild(label);
      valList.push(label);
    }
  }
  // 设置旋转角度
  clock.style.transform = "rotate(90deg)";
  // 设置旋转样式
  for (let i = 0; i < textSet.length; i++) {
    var valList = textSet[i][1];
    for (let j = 0; j < valList.length; j++) {
      let tempX = `${valList[j].offsetLeft}px`;
      let tempY = `${valList[j].offsetTop}px`;
      valList[j].style.position = "absolute";
      valList[j].style.left = tempX;
      valList[j].style.top = tempY;
    }
  }
}

function createLabel (text) {
  var div = document.createElement("div");
  div.classList.add("label");
  div.innerText = text;
  return div;
}

function initStyle () {
  let labels = document.getElementsByClassName("label");
  for (let label of labels) {
    label.style.color = "#FFA07A";
    label.style.fontWeight = "lighter";
  }
}

function runTime () {
  // 获取数据
  var now = new Date();
  var month = now.getMonth();
  var day = now.getDate();
  var week = now.getDay();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var seconds = now.getSeconds();
  // 设置基本样式
  initStyle();
  var nowValue = [month, day - 1, week, hour, minute, seconds];
  // 设置高亮样式
  for (var i = 0; i < nowValue.length; i++) {
    var num = nowValue[i];
    textSet[i][1][num].style.color = "#4CE64C";
    textSet[i][1][num].style.fontWeight = "bold";
  }
  // 计算旋转角度
  var widthMid = document.body.clientWidth / 2;
  var heightMid = document.body.clientHeight / 2;
  for (var i = 0; i < textSet.length; i++) {
    // 智能跳过不需要重新计算的环
    if (lastValue.length > 0 && lastValue[i] == nowValue[i]) continue;
    // 旋转角度计算
    var txtList = textSet[i][0];
    var valList = textSet[i][1];
    for (var j = 0; j < txtList.length; j++) {
      var r = i * 80 + 40;
      var deg = (360 / valList.length) * (j - nowValue[i]);
      var rad = (deg * Math.PI) / 180;
      var x = r * Math.sin(rad) + widthMid;
      var y = heightMid - r * Math.cos(rad);
      var temp = valList[j];
      temp.style.transform = `rotate(${deg - 90}deg)`;
      temp.style.left = `${x}px`;
      temp.style.top = `${y}px`;
    }
  }
  lastValue = nowValue;
}

window.onload = function () {
  init();
  setInterval(runTime, 1000);
};
