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

//-------------------------------------------------
// this function shows ALL the posts from the 
// array of cloth of users
//------------------------------------------------
function displayhistory() {
    let cardTemplate = document.getElementById("posts");
    const searchParams = new URLSearchParams(window.location.search);
    firebase.auth().onAuthStateChanged(user => {
        if (searchParams.has("myposts")) {
            var currentcol = db.collection("users").doc(user.uid);
            currentcol.get().then((doc) => {
                if (doc.data().myposts == null) {
                    Swal.fire("your posts is empty")
                    return
                }
                doc.data().myposts.forEach(data => {
                    db.collection("clothes").doc(data).get()
                        .then(clothid => {
                            var itemname = clothid.data().item_name;
                            var location = clothid.data().location;
                            var details = clothid.data().details;
                            let newcard = cardTemplate.content.cloneNode(true);
                            newcard.querySelector('.card-title').innerHTML = itemname;
                            newcard.querySelector('.card-text').innerHTML = details;
                            newcard.querySelector('.card-location').innerHTML = location;
                            newcard.querySelector('.card-image').src = clothid.data().image;;
                            document.getElementById("sendhere").appendChild(newcard);
                        })

                })
            })
        }
        if (searchParams.has("myclaimed")) {
            var currentcol = db.collection("users").doc(user.uid);
            currentcol.get().then((doc) => {
                if (doc.data().myclaimed == null) {
                    Swal.fire("your claimed is empty")
                    return
                }
                doc.data().myclaimed.forEach(data => {
                    db.collection("clothes").doc(data).get()
                        .then(clothid => {
                            var itemname = clothid.data().item_name;
                            var location = clothid.data().location;
                            var details = clothid.data().details;
                            let newcard = cardTemplate.content.cloneNode(true);
                            newcard.querySelector('.card-title').innerHTML = itemname;
                            newcard.querySelector('.card-text').innerHTML = details;
                            newcard.querySelector('.card-location').innerHTML = location;
                            newcard.querySelector('.card-image').src = clothid.data().image;;
                            document.getElementById("sendhere").appendChild(newcard);

                        })

                })
            })
        }
    });

}
displayhistory();