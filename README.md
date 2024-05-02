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