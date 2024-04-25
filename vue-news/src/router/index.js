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
            path: '/',
            redirect: '/news',
        },
        {
            //path: url 주소
            path: '/news',
            //component: url 주소로 갔을 때 표시될 컴포넌트
            component: NewsView,
        },
        {
            path: '/ask',
            component: AskView,
        },
        {
            path: '/jobs',
            component: JobsView,
        },
    ]
});