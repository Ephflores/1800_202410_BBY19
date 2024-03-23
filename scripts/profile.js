// function getNameFromAuth() {
//     firebase.auth().onAuthStateChanged(user => {
//         // Check if a user is signed in:
//         if (user) {
//             // Do something for the currently logged-in user here: 
//             console.log(user.uid); //print the uid in the browser console
//             console.log(user.displayName);  //print the user name in the browser console
//             console.log(user.displayEmail);  //print the user email in the browser console
//             userName = user.displayName;
//             userEmail = user.displayEmail;

//             //method #1:  insert with JS
//             document.getElementById("name-goes-here").innerText = userName;
//             document.getElementById("email-goes-here").innerText = userEmail;

//         } else {
//             // No user is signed in.
//             console.log("No user is logged in");
//         }
//     });
// }

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

                let userEmail = userDoc.data().email;
                console.log(userEmail);

                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
                document.getElementById("email-goes-here").innerText = userEmail;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}

insertNameFromFirestore();

//-------------------------------------------------
// this function shows finds out who is logged in,
// reads the "myposts" field (an array) for that user, 
// reads the details for each item in the array
// and displays a card for each item. 
//------------------------------------------------
function showMyPosts() {
    firebase.auth().onAuthStateChanged(user => {
        console.log("user is: " + user.uid);
        db.collection("users").doc(user.uid)
            .get()
            .then(doc => {
                myposts = doc.data().myposts; //get array of my posts
                console.log(myposts);
                myposts.forEach(item => {
                    db.collection("clothes")
                        .doc(item)
                        .get()
                        .then(doc => {
                            displayMyPostCard(doc);
                        })
                })
            })
    })
}
showMyPosts();

//------------------------------------------------------------
// this function displays ONE card, with information
// from the post document extracted (name, description, image)
//------------------------------------------------------------
function displayMyPostCard(doc) {
    var title = doc.data().item_name; // get value of the "name" key
    var desc = doc.data().details; //gets the length field
    var image = doc.data().image; //the field that contains the URL 

    //clone the new card
    let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
    //populate with title, image
    newcard.querySelector('.card-title').innerHTML = title;
    newcard.querySelector('.card-image').src = image;
    newcard.querySelector('.card-description').innerHTML = desc;
    //append to the posts
    document.getElementById("myposts-go-here").append(newcard);
}

// modal for uploading profile pic
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('myModal');
const closeModalBtn = document.getElementsByClassName('close')[0];

openModalBtn.addEventListener('click', function () {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});




var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function (e) {

        //the change event returns a file "e.target.files[0]"
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();


function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL.");
                        //get values from the from
                        // userName = document.getElementById('nameInput').value;
                        // userSchool = document.getElementById('schoolInput').value;
                        // userCity = document.getElementById('cityInput').value;

                        //Asynch call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                            // name: userName,
                            // school: userSchool,
                            // city: userCity,
                            profilePic: url // Save the URL into users collection
                        })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');
                                modal.style.display = 'none';
                                // document.getElementById('personalInfoFields').disabled = true;
                            })
                    })
            })
    })
}

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // go and get the curret user info from firestore
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userDoc => {
                    // let userName = userDoc.data().name;
                    // let userSchool = userDoc.data().school;
                    // let userCity = userDoc.data().city;
                    let picUrl = userDoc.data().profilePic;

                    // if (userName != null) {
                    //     document.getElementById("nameInput").value = userName;
                    // }
                    // if (userSchool != null) {
                    //     document.getElementById("schoolInput").value = userSchool;
                    // }
                    // if (userCity != null) {
                    //     console.log(userCity)
                    //     document.getElementById("cityInput").value = userCity;
                    // }
                    if (picUrl != null) {
                        console.log(picUrl);
                        // use this line if "mypicdiv" is a "div"
                        //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                        $("#mypic-goes-here").attr("src", picUrl);
                        const profilePicture = document.getElementById('profilePicture');
                        const imageUrl = picUrl;
                        profilePicture.style.backgroundImage = `url(${imageUrl})`;
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
populateInfo();

