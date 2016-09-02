var obj = {
  name: "Vasya",
  number: "12",
  color: 'green'
}

var arr = [];

function checkArray(arr) {
  if(arr.length === 3){
    console.log(arr);
    arr = [];
  }
}
function getName(func){
  let time = getRandomTime();
  setTimeout (() => {
    func('Name: ' + obj.name);
  }, time);
}

function getNumber(func) {
  let time = getRandomTime();
  setTimeout (() => {
    func('Number: ' + obj.number);
  }, time);
}

function getColor(func) {
  let time = getRandomTime();
  setTimeout (() => {
    func('Color: ' + obj.color);
  }, time);
}

function getRandomTime() {
  var second = 1000;
  return (Math.round(Math.random() * 4) + 1) * second;
}

let callback = console.log;

let callback1 = function(param){
  arr.push(param);
  checkArray(arr);
};

function firstTask(){
  getName(callback);
  getNumber(callback);
  getColor(callback);
}

function secondTask() {
  getName(callback1);
  getNumber(callback1);
  getColor(callback1);
}

function thirdTask() {
  getName(function(objName) {
    getNumber(function(objNumber) {
      getColor(function(objColor){
        console.log(objName, objNumber, objColor);
      })
    })
  });
}

function fourthTask() {

}

function fifthTask() {
  
}

var tasks = document.querySelectorAll('button');
tasks[0].addEventListener('click', firstTask);
tasks[1].addEventListener('click' , secondTask);
tasks[2].addEventListener('click' , thirdTask);
tasks[3].addEventListener('click' , firstTask);
tasks[4].addEventListener('click' , fourthTask);
tasks[5].addEventListener('click' , fifthTask);