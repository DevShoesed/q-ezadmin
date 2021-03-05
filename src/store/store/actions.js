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
