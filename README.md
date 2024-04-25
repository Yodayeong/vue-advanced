vue 프로젝트 생성
- vue create vue-news
- Vue2 사용

<br>

vue 프로젝트 실행

- npm run serve

<br>

App.vue

```vue
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
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

- "id=app"인 컴포넌트
  - Vue logo 이미지
  - HelloWorld 컴포넌트

<br>
ESLint란
- 오류가 없는 코딩을 하도록 유도하는 장치

- ESLint를 끄기 위해서는 script 태그 아래에 /* eslint-disable */

- 또는, view.config.js라는 파일 생성 후, 

  ```javascript
  module.exports = {
    lintOnSave: false
  }
  ```