import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
 import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
 import { getFirestore, addDoc, getDocs, collection ,deleteDoc  } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";
 import { getStorage, ref, uploadBytes, getDownloadURL } from"https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js"

//TODO MAKE FIREBASE APP ON WEBSITE
const firebaseConfig = {

    apiKey: "AIzaSyDFrJJhaUK1cC7uK9tVRYVwm4v-tp0b--k",

    authDomain: "chitchat-b8d26.firebaseapp.com",

    projectId: "chitchat-b8d26",

    storageBucket: "chitchat-b8d26.appspot.com",

    messagingSenderId: "832890676115",

    appId: "1:832890676115:web:7fce26c434d63f4bccfe66"

  };



const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);
  const storage = getStorage(app);





   window.isLoggedIn = function(){
     return auth.currentUser !== null;
  }

  window.login = function(email,password){
      return signInWithEmailAndPassword(auth, email, password);
  }

  window.signup = function(email,password){
      return createUserWithEmailAndPassword(auth, email, password);
  }

  window.logout = function(){
     auth.signOut();
  }

  window.onLogin = function( f ){
     onAuthStateChanged(auth, user => {
          f( user );
      });
  }


// // //////////////////////////////////////////////
// // // exposed functionality for db
  window.addComment = function(comment){
      return addDoc( collection(db, "discussions"), {comment} );
  }


  window.forEachComment = async function( f ){
      var docs = await getDocs( collection(db, "discussions") );
      console.log(docs);
      docs.forEach( doc => f(doc.data()) );
  }

  window.uploadFile = function(filename, file){
    return uploadBytes( ref(storage, filename) , file);
 }
 
 window.getURL = function(filename){
  return getDownloadURL( ref(storage, filename) );
}
window.deleteDoc = function(comment){
  return deleteDoc (collection(db,"discussions"), {comment});
}


//use Snapshot when something changes to update the screen
  