import firebase from 'firebase';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: 'AIzaSyDCv9uTGVj-MRMUOMPnVXm2bm0vUGtJvco',
        authDomain: 'goofychat-b0b82.firebaseapp.com',
        databaseURL: 'https://goofychat-b0b82.firebaseio.com',
        projectId: 'goofychat-b0b82',
        storageBucket: 'goofychat-b0b82.appspot.com',
        messagingSenderId: '425156031819'
      });
    }
  }
  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failed_callback);
  };
  createAccount = async user => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        function() {
          console.log(
            'created user successfully. User email:' +
              user.email +
              ' name:' +
              user.name
          );
          var userf = firebase.auth().currentUser;
          userf.updateProfile({ displayName: user.name }).then(
            function() {
              console.log('Updated displayName successfully. name:' + user.name);
              alert(
                'User ' + user.name + ' was created successfully. Please login.'
              );
            },
            function(error) {
                console.warn('Error update displayName.');
              }
            );
          },
          function(error) {
            console.error('got error:' + typeof error + ' string:' + error.message);
            alert('Create account failed. Error: ' + error.message);
          }
        );
    };
}

const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;