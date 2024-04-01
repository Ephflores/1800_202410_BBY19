// const f = document.getElementById('form');
// const q = document.getElementById('query');
// const google = 'https://www.google.com/search?q=site%3A+';
// const site = 'clothesline.com';

// function submitted(event) {
//   event.preventDefault();
//   const url = google + site + '+' + q.value;
//   const win = window.open(url, '_blank');
//   win.focus();
// }

// f.addEventListener('submit', submitted);

function populateNavbarPic() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // go and get the curret user info from firestore
            currentUser = db.collection("users").doc(user.uid);
  
            currentUser.get()
                .then(userDoc => {
                    let picUrl = userDoc.data().profilePic;
                    if (picUrl != null) {
                        console.log(picUrl);
                        const navProfilePicture = document.getElementById('navProfilePicture');
                        const imageUrl = picUrl;
                        navProfilePicture.style.backgroundImage = `url(${imageUrl})`;
                    }
                    else
                        console.log("picURL is null");
                })
  
        } else {
            console.log("no user is logged in")
        }
    }
  
    )
  
  }
  populateNavbarPic();