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

export function allErrors(state) {
  let allErrors = [];
  for (const [envName, env] of Object.entries(state.errors)) {
    Object.values(env).forEach(err => {
      allErrors.push({
        environment: envName,
        sev: err.DescSeverity,
        time: date.formatDate(err.DataLog, "HH:mm, MMM D"),
        contesto: err.Contesto,
        message: err.Testo,
        payload: err.Payload
      });
    });
  }
  return allErrors.sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });
}
