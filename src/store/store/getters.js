import { date } from "quasar";

export function numberEnvs(state) {
  return Object.keys(state.envs).length;
}

export function envs(state) {
  return state.envs;
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
        time: date.formatDate(err.DataLog, "D MMM, HH:mm"),
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

export function loginsByDate(state) {
  let allLogins = [];
  Object.values(state.logins).forEach(env => {
    Object.values(env).forEach(log => {
      allLogins.push({
        date: date.formatDate(log.DataLog, "D/MM"),
        time: date.formatDate(log.DataLog, "YYYYMMDDHHmm")
      });
    });
  });
  const map = new Map();
  allLogins.sort(function(a, b) {
    return a.time.localeCompare(b.time);
  });
  allLogins.forEach(item => {
    const key = item.date;
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
