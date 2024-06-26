function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                //document.getElementById("name-goes-here").innerText = userName;
                // Get profile pic
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
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();