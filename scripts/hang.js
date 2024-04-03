var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
    })
}
listenFileSelect();

function hangClick() {
    alert("SAVE POST is triggered");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            db.collection("users").doc(user.uid).update({
                donated: firebase.firestore.FieldValue.increment(1)
            })
            var name = document.getElementById('item-name').value;
            var details = document.getElementById('item-details').value;
            var pickup = document.getElementById('pick-up').checked;
            var dropoff = document.getElementById('drop-off').checked;
            var meetup = document.getElementById('meet-up').checked;
            var categories = document.querySelector('input[name="opt-categories"]:checked').value;
            var type = document.querySelector('input[name="opt-type"]:checked').value;
            var location = document.querySelector('input[name="opt-location"]:checked').value;
            db.collection("clothes").add({
                owner: user.uid,
                item_name: name,
                details: details,
                pickup: pickup,
                dropoff: dropoff,
                meetup: meetup,
                categories: categories,
                type: type,
                location: location,
                claimed: false,
                last_updated: firebase.firestore.FieldValue
                    .serverTimestamp() //current system time
            }).then(doc => {
                console.log("1. Post document added!");
                console.log(doc.id);
                uploadPic(doc.id);
            })
        } else {
            // No user is signed in.
            console.log("Error, no user signed in");
        }
    });
}

//------------------------------------------------
// So, a new post document has just been added
// and it contains a bunch of fields.
// We want to store the image associated with this post,
// such that the image name is the postid (guaranteed unique).
// 
// This function is called AFTER the post has been created, 
// and we know the post's document id.
//------------------------------------------------
function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            console.log('2. Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("3. Got the download URL.");

                    // Now that the image is on Storage, we can go back to the
                    // post document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    db.collection("clothes").doc(postDocID).update({
                        "image": url // Save the URL into users collection
                    })
                        // AFTER .update is done
                        .then(function () {
                            console.log('4. Added pic URL to Firestore.');
                            // One last thing to do:
                            // save this postID into an array for the OWNER
                            // so we can show "my posts" in the future
                            savePostIDforUser(postDocID);
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}

//--------------------------------------------
//saves the post ID for the user, in an array
//--------------------------------------------
function savePostIDforUser(postDocID) {
    firebase.auth().onAuthStateChanged(user => {
        console.log("user id is: " + user.uid);
        console.log("postdoc id is: " + postDocID);
        db.collection("users").doc(user.uid).update({
            myposts: firebase.firestore.FieldValue.arrayUnion(postDocID)
        })
            .then(() => {
                console.log("5. Saved to user's document!");
                alert("Post is complete!");
                window.location.href = "profile.html";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    })
}

// // Function to be called when the button is clicked
// function hangClick() {
//     console.log("Button clicked!");
//     //define a variable for the collection you want to create in Firestore to populate data
//     var clothesRef = db.collection("clothes");
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             console.log(user.uid); // Let's know who the logged-in user is by logging their UID
//             const currentUser = db.collection("users").doc(user.uid);
//             console.log(currentUser); // Go to the Firestore document of the user

//             // Get form values
//             var name = document.getElementById('item-name').value;
//             var details = document.getElementById('item-details').value;
//             var pickup = document.getElementById('pick-up').checked;
//             var dropoff = document.getElementById('drop-off').checked;
//             var meetup = document.getElementById('meet-up').checked;
//             var categories = document.querySelector('input[name="opt-categories"]:checked').value;
//             var type = document.querySelector('input[name="opt-type"]:checked').value;
//             var location = document.querySelector('input[name="opt-location"]:checked').value;

//             // Write data to the database
//             clothesRef.add({
//                 item_name: name,
//                 details: details,
//                 pickup: pickup,
//                 dropoff: dropoff,
//                 meetup: meetup,
//                 categories: categories,
//                 type: type,
//                 location: location,
//                 user_id: currentUser.id
//             });
//         } else {
//             console.log("No user is logged in."); // Log a message when no user is logged in
//         }
//     })


// }

// // Get a reference to the button element
// var button = document.getElementById('hangButton');

// // Add event listener to the button
// button.addEventListener('click', hangClick);

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