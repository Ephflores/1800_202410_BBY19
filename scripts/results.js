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
// this function shows posts depending
// on the url param in the url bar
//------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("posts");

    db.collection(collection).get()
        .then(allclothes => {
            const searchParams = new URLSearchParams(window.location.search);
            allclothes.forEach(doc => { 
                if (!searchParams.has("categories") &&
                    (!('claimed' in doc.data()) || !(doc.data().claimed))) {
                    var itemname = doc.data().item_name;
                    var location = doc.data().location;
                    var details = doc.data().details;
                    let newcard = cardTemplate.content.cloneNode(true);
                    newcard.querySelector('.card-title').innerHTML = itemname;
                    newcard.querySelector('.card-location').innerHTML = location;
                    newcard.querySelector('.card-text').innerHTML = details;
                    newcard.querySelector('.card-image').src = doc.data().image;;
                    newcard.querySelector('.btn').setAttribute("id", doc.id);
                    newcard.querySelector('.card').setAttribute("id", "card" + doc.id);
                    document.getElementById(collection + "-go-here").appendChild(newcard);

                }
                if ((!('claimed' in doc.data()) || !(doc.data().claimed))
                    && doc.data().categories == searchParams.get("categories")) {
                    var itemname = doc.data().item_name;
                    var location = doc.data().location;
                    var details = doc.data().details;
                    let newcard = cardTemplate.content.cloneNode(true);
                    newcard.querySelector('.card-title').innerHTML = itemname;
                    newcard.querySelector('.card-text').innerHTML = details;
                    newcard.querySelector('.card-location').innerHTML = location;
                    newcard.querySelector('.card-image').src = doc.data().image;;
                    newcard.querySelector('.btn').setAttribute("id", doc.id);
                    newcard.querySelector('.card').setAttribute("id", "card" + doc.id);
                    document.getElementById(collection + "-go-here").appendChild(newcard);

                }
            })
        })
}

displayCardsDynamically("clothes");  //input param is the name of the collection


//-------------------------------------------------
// this function claims an item clothing 
// and updates all database information
//------------------------------------------------
function claimFunc(clothid) {
    firebase.auth().onAuthStateChanged(user => {
        const currentuser = db.collection("users").doc(user.uid);
        currentuser.update({
            myclaimed: firebase.firestore.FieldValue.arrayUnion(clothid)
        });
        currentuser.update({
            claimed: firebase.firestore.FieldValue.increment(1)
        });
        const currentcloth = db.collection("clothes").doc(clothid);
        const turnoff = currentcloth.update({
            claimed: true
        });
        document.querySelector('#card' + clothid).setAttribute("class", "vanish")
        Swal.fire("your item has been claimed")
    });
};