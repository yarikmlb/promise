'use strict';
var name = "Vasya",
    number = "12",
    color = "green";

var arr = [];

// functions for examples without promise

function getServer(func) {
  let requestPromise = fetch('https://test-api.javascript.ru/v1/ssuvorov/tasks');
  requestPromise.then((response) => {
    let dataPromise = response.json();
    dataPromise.then((data) => {
      for (let i = 0; i < data.length; i++) {
        func('title : ' + data[i].title)
      }
    })
  })
}

function getName(func){
  let time = getRandomTime();
  setTimeout (() => {
    func('Name: ' + name);
  }, time);
}

function getNumber(func) {
  let time = getRandomTime();
  setTimeout (() => {
    func('Number: ' + number);
  }, time);
}

function getColor(func) {
  let time = getRandomTime();
  setTimeout (() => {
    func('Color: ' + color);
  }, time);
}

function getRandomTime() {
  var second = 1000;
  return (Math.round(Math.random() * 4) + 1) * second;
}

// functions for examples with promise

function getAnotherName() {
  let promise = new Promise((resolve) => {
    let name = "Alex";
    let time = getRandomTime();
    setTimeout (() => {
      resolve('Name: ' + name);
    }, time);
  });
  return promise;
}

function getAnotherNumber() {
  let promise = new Promise((resolve) => {
    let number = "25";
    let time = getRandomTime();
    setTimeout(() => {
      resolve('Number: ' + number);
    }, time);
  });
  return promise;
}

function getAnotherColor() {
  let promise = new Promise((resolve) => {
    let color = "red";
    let time = getRandomTime();
    setTimeout (() => {
      resolve('Color: ' + color);
    }, time);
  });
  return promise;
}

function getAnotherServer() {
  let promise = new Promise((resolve) => {
    let arr =[];
    let requestPromise = fetch('https://test-api.javascript.ru/v1/ssuvorov/tasks');
    requestPromise.then((response) => {
      let dataPromise = response.json();
      dataPromise.then((data) => {
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i].title);
        }
        resolve('title : ' + arr)
      })
    })
  });
  return promise;
}

// callbacks

let firstExample = console.log;

let secondExample = function(param){
  arr.push(param);
  if(arr.length === 6){
    checkArray(arr);
    arr = [];
  }
};

function checkArray(arr) {
  let str = arr.join('\n');
  console.log(str);
}

// call functions without promise

function firstTask(){
  getName(firstExample);
  getNumber(firstExample);
  getColor(firstExample);
  getServer(firstExample);
}

function secondTask() {
  getName(secondExample);
  getNumber(secondExample);
  getColor(secondExample);
  getServer(secondExample);

}

function thirdTask() {
  getName(function(name) {
    getNumber(function(number) {
      getColor(function(color) {
        getServer(function(title) {
          console.log(name, number, color, title);
        })
      })
    })
  });
}

// call functions with promise

function fourthTask() {
  getAnotherName().then(firstExample);
  getAnotherNumber().then(firstExample);
  getAnotherColor().then(firstExample);
  getAnotherServer().then(firstExample);
}

function fifthTask() {
  Promise.all([getAnotherNumber(), getAnotherColor(), getAnotherName(), getAnotherServer()]).then(values => {
    let str = values.join('\n');
    firstExample(str);
  });
}

function sixth() {
  Promise.all([getAnotherName(), getAnotherNumber(), getAnotherColor(), getAnotherServer()]).then(values => {
    let str = values.join('\n');
    firstExample(str);
  });
}

var tasks = document.querySelectorAll('button');

// buttons without promise

tasks[0].addEventListener('click', firstTask);
tasks[1].addEventListener('click' , secondTask);
tasks[2].addEventListener('click' , thirdTask);

// buttons with promise

tasks[3].addEventListener('click' , fourthTask);
tasks[4].addEventListener('click' , fifthTask);
tasks[5].addEventListener('click' , sixth);