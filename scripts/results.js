function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("posts");

    db.collection(collection).get()
        .then(allclothes => {
            //var i = 1;  //Optional: if you want to have a unique ID for each item
            const searchParams = new URLSearchParams(window.location.search);
            allclothes.forEach(doc => { //iterate thru each doc
                if (!searchParams.has("categories") &&
                    (!('claimed' in doc.data()) || !(doc.data().claimed))) {
                    var itemname = doc.data().item_name;
                    var location = doc.data().location;
                    let newcard = cardTemplate.content.cloneNode(true);
                    //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
                    //update title and text and image
                    newcard.querySelector('.card-title').innerHTML = itemname;
                    //newcard.querySelector('.card-text').innerHTML = details;
                    newcard.querySelector('.card-location').innerHTML = location;
                    newcard.querySelector('.card-image').src = doc.data().image;;
                    newcard.querySelector('.btn').setAttribute("id", doc.id);
                    //attach to gallery, Example: "items-go-here"
                    document.getElementById(collection + "-go-here").appendChild(newcard);

                    //i++;   //Optional: iterate variable to serve as unique ID

                }
                if ((!('claimed' in doc.data()) || !(doc.data().claimed)) //need to fix this
                    && doc.data().categories == searchParams.get("categories")) {
                    var itemname = doc.data().item_name;
                    var location = doc.data().location;
                    let newcard = cardTemplate.content.cloneNode(true);
                    //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
                    //update title and text and image
                    newcard.querySelector('.card-title').innerHTML = itemname;
                    //newcard.querySelector('.card-text').innerHTML = details;
                    newcard.querySelector('.card-location').innerHTML = location;
                    newcard.querySelector('.card-image').src = doc.data().image;;
                    newcard.querySelector('.btn').setAttribute("id", doc.id);


                    //attach to gallery, Example: "items-go-here"
                    document.getElementById(collection + "-go-here").appendChild(newcard);

                    //i++;   //Optional: iterate variable to serve as unique ID
                }
            })
        })
}

displayCardsDynamically("clothes");  //input param is the name of the collection

function claimFunc(clothid) {
    firebase.auth().onAuthStateChanged(user => {
        const currentuser = db.collection("users").doc(user.uid);
        const addclothes = currentuser.update({
            myclaimed: firebase.firestore.FieldValue.arrayUnion(clothid)
        });
        const currentcloth = db.collection("clothes").doc(clothid);
        const turnoff = currentcloth.update({
            claimed: true
        });
        displayCardsDynamically("clothes");
    });
};