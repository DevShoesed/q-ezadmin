import { Notify } from "quasar";
import { firebaseAuth, firebaseDb } from "boot/firebase";

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
        this.$router.push("/");
      });
    } else {
      // User is logged out
      commit("store/setUserDetails", {}, { root: true });
      this.$router.replace("/auth");
    }
  });
}

export function firebaseGetEnvs({ commit, state }) {
  firebaseDb.ref("/envs/").on("child_added", snapshot => {
    const envDetails = snapshot.val();
    const envId = snapshot.key;
    commit("addEnvs", {
      envId,
      envDetails
    });
  });
}

export function apiGetErrorLast7Days({ commit, state }) {
  console.log(Object.values(state.envs));
  Object.values(state.envs).forEach(element => {
    console.log("element", element);
    // const endpoint = element.apiUrl + "/server.php?";
    // const requestaParm = {
    //   action: "Admin_SysLog",
    //   SEV_Error: "1",
    //   da_data: new Date().getDate() - 7
    // };
    // fetch(endpoint + new URLSearchParams(requestaParm))
    //   .then(res => res.json)
    //   .then(data => {
    //     console.log(data);
    //   });
  });
}
