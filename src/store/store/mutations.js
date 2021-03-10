import Vue from "vue";

export function setUserDetails(state, payload) {
  state.userDetails = payload;
}

export function addEnvs(state, payload) {
  Vue.set(state.envs, payload.envId, payload.envDetails);
}

export function addErrors(state, payload) {
  Vue.set(state.errors, payload.envName, payload.errDetails);
}

export function setDateRange(state, payload) {
  state.dateRange = payload;
}
