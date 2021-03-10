import { date } from "quasar";

export function numberEnvs(state) {
  return Object.keys(state.envs).length;
}

export function dateRange(state) {
  return {
    from: date.formatDate(state.dateRange.from, "YYYY-MM-DD"),
    to: date.formatDate(state.dateRange.to, "YYYY-MM-DD")
  };
}

export function numErrors(state) {
  return Object.values(state.errors).reduce((t, err) => t + err.length, 0);
}
