axios를 이용한 api 호출
<br>

1. axios 설치
   - npm i axios --save
2. 원래 코드

   - views > NewsView.vue

     ```vue
     <template>
       <div>
         <div v-for="user in users">{{ user.title }}</div>
       </div>
     </template>
     
     <script>
     import axios from 'axios';
     
     export default {
       data() {
         return {
           users: []
         }
       },
       //created(): 컴포넌트가 생성되자마자 실행되는 로직이 들어감
       created() {
         var vm = this;
         axios.get('https://api.hnpwa.com/v0/news/1.json');
           .then(function(response) {
             vm.users = response.data;
           })
           //에러 핸들링에 대한 처리를 catch에서 다 받아줌
           .catch(function(error) {
             console.log(error);
           })
       },
     }
     </script>
     
     <style>
     
     </style>
     ```

     => (문제점) 공통되는 코드 반복의 문제점

3. 공통된 코드를 API로 따로 분류한 코드

   - api > index.js

     ```javascript
     import axios from 'axios';
     
     //1. HTTP Request & Resonse와 관련된 기본 설정
     const config = {
         baseUrl: 'https://api.hnpwa.com/v0/'
     }
     
     //2. API 함수들을 정리
     function fetchNewsList() {
         //return axios.get(config.baseUrl + 'news/1.json');
         return axios.get(`${config.baseUrl}news/1.json`);
     }
     
     export {
         fetchNewsList
     }
     ```

   - views > NewsView.vue

     ```vue
     <template>
       <div>
         <div v-for="user in users">{{ user.title }}</div>
       </div>
     </template>
     
     <script>
     import { fetchNewsList } from '../api/index.js';
     
     export default {
       data() {
         return {
           users: []
         }
       },
       created() {
         var vm = this;
         fetchNewsList()
           .then(function(response) {
             vm.users = response.data;
           })
           .catch(function(error) {
             console.log(error);
           })
       },
     }
     </script>
     
     <style>
     
     </style>
     ```


<br>

기존의 함수와 arrow function

- 기존의 함수

  ```vue
  <template>
    <div>
      <div v-for="n in news">{{ n.title }}</div>
    </div>
  </template>
  
  <script>
  import { fetchNewsList } from '../api/index.js';
  
  export default {
    data() {
      return {
        news: []
      }
    },
    created() {
      console.log('호출 전: ', this)
      //바인딩
      var vm = this;
      fetchNewsList()
        .then(function(response) {
          console.log('호출 후: ', this)
          vm.news = response.data;
        })
        .catch(function(error) {
          console.log(error);
        })
    },
  }
  </script>
  
  <style>
  
  </style>
  ```

  - 호출 전과 호출 후의 this를 찍어보면,
    - 호출 전은 component를
    - 호출 후는 undefined를 찍는다.
  - => 그래서 var vm = this; 구문을 통해, this를 바인딩 해줘야 한다.

- arrow function

  ```vue
  <template>
    <div>
      <div v-for="a in ask">{{ a.title }}</div>
    </div>
  </template>
  
  <script>
  import { fetchAskList } from '../api/index.js'
  
  export default {
    data() {
      return {
        ask: []
      }
    },
    //created(): 컴포넌트가 생성되자마자 실행되는 로직이 들어감
    created() {
      fetchAskList()
      //화살표 함수: 컴포넌트를 그대로 가져다 쓸 수 있음
        .then(response => {
          console.log(this)
          this.ask = response.data
        })
        //에러 핸들링에 대한 처리를 catch에서 다 받아줌
        .catch(error => console.log(error))
    }
  
  }
  </script>
  
  <style>
  
  </style>
  ```

  - arrow function은 호출 전과 호출 후의 this를 찍어보면,
    - 호출 전과 호출 후가 모두 동일하게 component를 찍는다.
  - => 그래서 따로, 바인딩해주는 구문이 필요 없다.

<br>

자바스크립트 비동기

- 프로그램 실행에서의 명령(실행) 순서 예측이 불가능한 것

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Callback</title>
  </head>
  <body>
      <div>jquery ajax</div>
  
      <script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
      <script>
          function fetchData() {
              //1.
              var result = [];
  
              //2. 
              //ajax는 데이터를 요청할 때 쓰는 jquery 내장 API
              $.ajax({
                  url: 'https://api.hnpwa.com/v0/news/1.json',
                  success: function(data) {
                      console.log('데이터 호출 결과', data);
                      result = data;
                  }
              });
  
              //3.
              console.log('함수 결과', result);
          }
          fetchData();
      </script>
  </body>
  </html>
  ```

  - 1, 3, 2 순서로 프로그램이 실행됨
  - => 비동기 처리는 특정 로직의 실행이 끝날 때까지 기다려주지 않고, 나머지 코드를 먼저 실행한다.

<br>

비동기 처리(1) - Call Back

- call back 함수는 데이터가 준비된 시점에만 원하는 동작을 수행하는 함수이다.

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Callback</title>
  </head>
  <body>
      <div>jquery ajax</div>
  
      <script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
      <script>
          function fetchData() {
              //1.
              var result = [];
  
              //2. 
              //ajax는 데이터를 요청할 때 쓰는 jquery 내장 API
              $.ajax({
                  url: 'https://api.hnpwa.com/v0/news/1.json',
                  //비동기 처리 callback 함수
                  success: function(data) {
                      console.log('데이터 호출 결과', data);
                      result = data;
                      console.log('함수 결과', result);
                  }
              });
          }
          fetchData();
      </script>
  </body>
  </html>
  ```

  - ajax가 success 했을 때의 function이 전형적인 callback 함수라 할 수 있다.
  - 해당 함수 안에 위의 3번 구문을 넣으면, success 했을 시에만 console이 찍혀 순서대로 출력할 수 있다.

<br>

 콜백 지옥(Callback Hell)

- 그러나, 콜백 안에 콜백을 계속 무는 형태로 코딩을 하면, 가독성도 떨어지고 로직을 변경하기도 어렵다.

<br>

비동기 처리(2) - Promise

- 자바스크립트 비동기 처리에 사용되는 객체

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Callback</title>
  </head>
  <body>
      <div>jquery ajax</div>
  
      <script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
      <script>
          function callAjax() {
              //프로미스 객체
              //resolve, reject(성공, 실패)를 인자로 가짐
              return new Promise(function(resolve, reject) {
                  $.ajax({
                      url: 'https://api.hnpwa.com/v0/news/1.json',
                      success: function(data) {
                          resolve(data);
                      }
                  });
              })
          }
  
          function fetchData() {
              //1.
              var result = [];
  
              //프로미스 객체를 return
              callAjax()
                  //프로미스 객체의 결과값은 내부객체이기 때문에,
                  //then과 catch로만 접근 가능
  
                  //프로미스가 fulfilled 되었을 때, resolve 값을 넘겨받음
                  .then(function(data) {
                      console.log('데이터 호출 결과', data);
                      result = data;
                      console.log('함수 결과', result);
                  })
                  //장점. 체이닝을 할 수 있다.
                  //.then
          }
  
          fetchData();
      </script>
  </body>
  </html>
  ```

  - Promise 객체는 resolve, reject를 인자로 받는다.

    - 함수 내부에서는 비동기 작업이 이루어지고,
    - 비동기 작업이 성공했을 시에는 그 성공 값을 인자로 resolve 함수를 호출하고
    - 비동기 작업이 실패했을 시에는 그 실패 값을 인자로 reject 함수를 호출한다.

  - Promise 객체의 3가지 상태

    - Pending(대기): 비동기 처리 로직이 아직 완료되지 않은 상태
    - Fulfilled(이행): 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
    - Rejected(실패): 비동기 처리가 실패하거나 오류가 발생한 상태

  - then 메서드는 프로미스가 fulfilled 되었을 때 실행되는 함수이고, 함수의 인자는 프로미스의 성공 결과 값을 받는다.

  - then 메서드는 프로미스가 rejected 된 경우에도 두 번째 인자로 넣어진 함수를 통해 핸들링이 가능하다.

  - catch 메서드는 프로미스가 rejected 되었을 때 실행되는 함수이고, 함수의 인자는 거부 결과 값을 받는다.

  - Promise Chaining

    - 여러 개의 프로미스를 연결하여 사용할 수 있다.

      ```javascript
      new Promise(function(resolve, reject){
        setTimeout(function() {
          resolve(1);
        }, 2000);
      })
      .then(function(result) {
        console.log(result); // 1
        return result + 10;
      })
      .then(function(result) {
        console.log(result); // 11
        return result + 20;
      })
      .then(function(result) {
        console.log(result); // 31
      });
      ```

      