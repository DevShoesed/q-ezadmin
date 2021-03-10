import { date } from "quasar";
export default function() {
  return {
    userDetails: {},
    errors: {},
    envs: {},
    dateRange: {
      from: date.subtractFromDate(new Date(), { days: 6 }),
      to: new Date()
    }
  };
}
