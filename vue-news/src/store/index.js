import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';

Vue.use(Vuex);

//Vuex: 상태 관리 도구
//이때, 상태라는 것은 여러 컴포넌트 간에 공유되는 데이터 속성이다.

//예를 들어, NewsView는 users라고 하는 데이터 속성을
//다른 컴포넌트와 공윻고 있지 않다.

//한 개의 컴포넌트에서 들고 있는 데이터를 다른 컴포넌트에서 조작해야 할 때
//Vuex를 사용한다.
export const store = new Vuex.Store({
    state: {
        news: [],
        ask: [],
        jobs: [],
    },
    getters: {
        fetchedNews(state) {
            return state.news;
        }
    },
    mutations,
    actions,
});