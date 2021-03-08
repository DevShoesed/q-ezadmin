import Vue from "vue";

export function setUserDetails(state, payload) {
  state.userDetails = payload;
}

export function addEnvs(state, payload) {
  Vue.set(state.envs, payload.envId, payload.envDetails);
}
