import { fetchNewsList, fetchAskList, fetchJobsList } from '../api/index.js';

export default {
    FETCH_NEWS(context) {
        fetchNewsList()
            .then(response => {
                context.commit('SET_NEWS', response.data);
            })
            .catch(error => {
                console.log(error);
            })
    },
    FETCH_ASK({ commit }) {
        fetchAskList()
            .then(({ data }) => {
                commit('SET_ASK', data);
            })
            .catch(error => {
                console.log(error);
            })
    },
    FETCH_JOBS(context) {
        fetchJobsList()
            .then(response => {
                context.commit('SET_JOBS', response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
}