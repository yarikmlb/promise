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

// functions for examples with custom promise

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function MyPromise(fn) {
  // store state which can be PENDING, FULFILLED or REJECTED
  var state = PENDING;

  // store value once FULFILLED or REJECTED
  var value = null;

  // store sucess & failure handlers
  var handlers = [];

  function fulfill(result) {
    state = FULFILLED;
    value = result;
    handlers.forEach(handle);
    handlers = null;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
    handlers.forEach(handle);
    handlers = null;
  }

  function resolve(result) {
    try {
      var then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject);
        return
    }
    fulfill(result);
    } catch (e) {
      reject(e);
    }
  }

  function handle(handler) {
    if (state === PENDING) {
      handlers.push(handler);
    } else {
      if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
        handler.onFulfilled(value);
      }
      if (state === REJECTED && typeof handler.onRejected === 'function') {
        handler.onRejected(value);
      }
    }
  }

  function getThen(value) {
    var t = typeof value;
    if (value && (t === 'object' || t === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        return then;
      }
    }
    return null;
  }

  function doResolve(fn, onFulfilled, onRejected) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
          done = true;
          onFulfilled(value)
      },
      function (reason) {
        if (done) return;
        done = true;
        onRejected(reason)
      })
    } catch (ex) {
      if (done) return;
      done = true;
      onRejected(ex)
    }
  }

  this.done = function (onFulfilled, onRejected) {
    setTimeout(function () {
      handle({
        onFulfilled: onFulfilled,
        onRejected: onRejected
      });
    }, 0);
  };

  this.then = function (onFulfilled, onRejected) {
    var self = this;
    return new MyPromise(function (resolve, reject) {
      return self.done(function (result) {
        if (typeof onFulfilled === 'function') {
          try {
            return resolve(onFulfilled(result));
          } catch (ex) {
            return reject(ex);
          }
        } else {
          return resolve(result);
        }
      },
      function (error) {
        if (typeof onRejected === 'function') {
          try {
            return resolve(onRejected(error));
          } catch (ex) {
            return reject(ex);
          }
        } else {
          return reject(error);
        }
      });
    });
  };

  doResolve(fn, resolve, reject);


  MyPromise.all = function (arrPromise) {
    var arr = [];
    var ready = new MyPromise((resolve) => { return resolve(null)});

    arrPromise.forEach(function (promise) {
      ready = ready.then(function () {
        return promise;
      }).then(function (value) {
        arr.push(value);
      });
    });

    return ready.then(function () { return arr; });
  }
}

function getCustomName() {
  let promise = new MyPromise((resolve) => {
      let name = "Alla";
  let time = getRandomTime();
  setTimeout (() => {
    resolve('Name: ' + name);
}, time);
});
  return promise;
}

function getCustomNumber() {
  let promise = new MyPromise((resolve) => {
      let number = "27";
  let time = getRandomTime();
  setTimeout(() => {
    resolve('Number: ' + number);
}, time);
});
  return promise;
}

function getCustomColor() {
  let promise = new MyPromise((resolve) => {
      let color = "yellow";
  let time = getRandomTime();
  setTimeout (() => {
    resolve('Color: ' + color);
}, time);
});
  return promise;
}

function getCustomServer() {
  let promise = new MyPromise((resolve) => {
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

let thirdExample = function(param){
  arr.push(param);
  if(arr.length === 4){
    checkCustomArray(arr);
    arr = [];
  }
};

function checkCustomArray(arr) {
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

function sixthTask() {
  Promise.all([getAnotherName(), getAnotherNumber(), getAnotherColor(), getAnotherServer()]).then(values => {
    let str = values.join('\n');
    firstExample(str);
  });
}

// call functions with custom promise

function seventhTask() {
  getCustomColor().then(firstExample);
  getCustomName().then(firstExample);
  getCustomNumber().then(firstExample);
  getCustomServer().then(firstExample);
}

function eighthTask() {
  getCustomColor().then(thirdExample);
  getCustomName().then(thirdExample);
  getCustomNumber().then(thirdExample);
  getCustomServer().then(thirdExample);
}

function ninthTask() {
  let arrPromise = [getCustomName(), getCustomNumber(), getCustomColor(), getCustomServer()];

  MyPromise.all(arrPromise).then((promiseArray) => {
    promiseArray.forEach((item) => {
      if (typeof item === 'object') {
        item.forEach((elem) => { console.log(elem)});
      } else {
        console.log(item);
      }
    });
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
tasks[5].addEventListener('click' , sixthTask);

// buttons with custom promise

tasks[6].addEventListener('click' , seventhTask);
tasks[7].addEventListener('click' , eighthTask);
tasks[8].addEventListener('click' , ninthTask);