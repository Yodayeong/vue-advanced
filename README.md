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
       created() {
         var vm = this;
         axios.get('https://api.hnpwa.com/v0/news/1.json');
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

     