import { Notify, date } from "quasar";
import { firebaseAuth, firebaseDb } from "boot/firebase";
import { axios } from "src/boot/axios";

export function loginUser({}, payload) {
  firebaseAuth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      Notify.create({
        type: "positive",
        message: `Bentornato`
      });
    })
    .catch(error => {
      console.error(error.message);
      Notify.create({
        type: "negative",
        message: `Login Error: ${error.message}`
      });
    });
}

export function logoutUser() {
  firebaseAuth.signOut();
}

export function handleAuthStateChanged({ commit, dispatch, state }) {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      // User is logged in
      const userId = firebaseAuth.currentUser.uid;
      const dbRef = firebaseDb.ref("/users/" + userId);
      dbRef.once("value", snapshot => {
        const userDatails = snapshot.val();
        commit(
          "store/setUserDetails",
          {
            userId: userId,
            name: userDatails.name,
            email: userDatails.email
          },
          { root: true }
        );
        this.$router.push("/").catch(err => {});
      });
    } else {
      // User is logged out
      commit("store/setUserDetails", {}, { root: true });
      this.$router.replace("/auth");
    }
  });
}

export async function firebaseGetEnvs({ commit, state }) {
  return new Promise((resolve, reject) => {
    firebaseDb.ref("/envs/").on("child_added", snapshot => {
      const envDetails = snapshot.val();
      const envId = snapshot.key;
      commit("addEnvs", {
        envId,
        envDetails
      });
      resolve();
    });
  });
}

export async function apiGetErrors({ commit, state }) {
  Object.values(state.envs).forEach(element => {
    const endpoint = element.apiUrl + "/server.php?";
    const da_data = date.formatDate(state.dateRange.from, "YYYY-MM-DD");
    const a_data = date.formatDate(state.dateRange.to, "YYYY-MM-DD");
    axios
      .get(endpoint, {
        params: {
          action: "Admin_SysLog",
          SEV_Error: "1",
          da_data: da_data,
          a_data: a_data
        }
      })
      .then(response => {
        const responseData = response.data.data;
        commit("addErrors", {
          envName: element.name,
          errDetails: responseData
        });
      })
      .catch(err => {
        console.error(err);
      });
  });
}

export function setDateRange({ commit, dispatch }, payload) {
  commit("setDateRange", {
    from: payload.from,
    to: payload.to
  });
  dispatch("apiGetErrors");
}
