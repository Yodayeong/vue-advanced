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

<br>

ToolBar의 라우터 링크

- components > ToolBar.vue

  ```vue
  <template>
    <div class="header">
      <router-link to="/news">News</router-link> |
      <router-link to="/ask">Ask</router-link> |
      <router-link to="/jobs">Jobs</router-link>
    </div>
  </template>
  
  <!-- scoped: 해당 컴포넌트에만 적용되는 스타일, 속성 -->
  <style scoped>
  .header {
      color: white;
      background-color: #42b883;
      display: flex;
      padding: 8px;
  }
  
  .header .router-link-exact-active {
      color: #35495e;
  }
  
  .header a {
      color: white;
  }
  </style>
  ```

- App.vue

  ```vue
  <template>
    <div id="app">
      <tool-bar></tool-bar>
  
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import ToolBar from './components/ToolBar.vue';
  
  export default {
    components: {
      ToolBar,
    },
  }
  </script>
  
  <style>
  body {
    padding: 0;
    margin:0;
  }
  </style>
  ```

  
