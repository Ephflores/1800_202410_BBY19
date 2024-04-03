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

function displayhistory(history) {
    let cardTemplate = document.getElementById("posts");
    firebase.auth().onAuthStateChanged(user => {
        if (history == 'myposts') {
            var currentcol = db.collection("users").doc(user.uid);
            currentcol.get().then((doc) => {
                if (doc.data().myposts == null) {
                    alert("your posts is empty")
                    return
                }
                doc.data().myposts.forEach(data => {
                    db.collection("clothes").doc(data).get()
                        .then(clothid => {
                            var itemname = clothid.data().item_name;
                            var location = clothid.data().location;
                            let newcard = cardTemplate.content.cloneNode(true);
                            //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
                            //update title and text and image
                            newcard.querySelector('.card-title').innerHTML = itemname;
                            //newcard.querySelector('.card-text').innerHTML = details;
                            newcard.querySelector('.card-location').innerHTML = location;
                            newcard.querySelector('.card-image').src = clothid.data().image;;
                            newcard.querySelector('.btn').setAttribute("id", clothid.id);
                            //attach to gallery, Example: "items-go-here"
                            document.getElementById("myposts-go-here").appendChild(newcard);

                            //i++;   //Optional: iterate variable to serve as unique ID

                        })

                })
            })
        }
        if (history == 'myclaimed') {
            var currentcol = db.collection("users").doc(user.uid);
            currentcol.get().then((doc) => {
                if (doc.data().myclaimed == null) {
                    alert("your claimed is empty")
                    return
                }
                doc.data().myclaimed.forEach(data => {
                    db.collection("clothes").doc(data).get()
                        .then(clothid => {
                            var itemname = clothid.data().item_name;
                            var location = clothid.data().location;
                            let newcard = cardTemplate.content.cloneNode(true);
                            //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
                            //update title and text and image
                            newcard.querySelector('.card-title').innerHTML = itemname;
                            //newcard.querySelector('.card-text').innerHTML = details;
                            newcard.querySelector('.card-location').innerHTML = location;
                            newcard.querySelector('.card-image').src = clothid.data().image;;
                            newcard.querySelector('.btn').setAttribute("id", clothid.id);
                            //attach to gallery, Example: "items-go-here"
                            document.getElementById("myposts-go-here").appendChild(newcard);

                            //i++;   //Optional: iterate variable to serve as unique ID

                        })

                })
            })
        }
    });

}


// function openCity(evt, cityName) {
//     // Declare all variables
//     var i, tabcontent, tablinks;

//     // Get all elements with class="tabcontent" and hide them
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }

//     // Get all elements with class="tablinks" and remove the class "active"
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }

//     // Show the current tab, and add an "active" class to the button that opened the tab
//     document.getElementById(cityName).style.display = "block";
//     evt.currentTarget.className += " active";
// }