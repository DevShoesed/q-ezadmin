import Vue from "vue";
import axios from "axios";

const api = axios.create({
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});

Vue.prototype.$axios = axios;

export { axios };
