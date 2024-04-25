라우터 설치(버전 명시)
- npm i vue-router@3.5.3 --save

<br>

라우터 세팅

- router 폴더 생성

  - index.js

    ```javascript
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import NewsView from '../views/NewsView.vue'
    import AskView from '../views/AskView.vue';
    import JobsView from '../views/JobsView.vue';
    
    Vue.use(VueRouter);
    
    //라우터에 대한 정보들을 관리하는 VueRouter 객체
    export const router = new VueRouter({
        //라우터의 정보를 담는다.
        routes: [
            {
                //path: url 주소
                path: '/news',
                component: NewsView,
            },
            {
                //component: url 주소로 갔을 때 표시될 컴포넌트
                path: '/ask',
                component: AskView,
            },
            {
                path: '/jobs',
                component: JobsView,
            },
        ]
    });
    ```

- views 폴더 생성

  - NewsView.vue
  - AskView.vue
  - JobsView.vue

- main.js에 연결

  ```javascript
  import Vue from 'vue'
  import App from './App.vue'
  import { router } from './router/index.js';
  
  Vue.config.productionTip = false
  
  new Vue({
    render: h => h(App),
    router,
  }).$mount('#app')
  ```

- App.vue에 연결

  ```vue
  <template>
    <div id="app">
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    
  }
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  ```

  