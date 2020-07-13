import axios from 'axios'
import Vue from 'vue'
import Axios from "axios";

Vue.prototype.$axios = axios.create({
  baseURL: process.env.BASE_URL
})

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}
