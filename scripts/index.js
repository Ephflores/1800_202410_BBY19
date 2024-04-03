//-------------------------------------------------
// this function shows ALL the posts from the 
// stand alone posts collection
//------------------------------------------------
function showPosts() {
    db.collection("users").get()
        .then((querySnapshot) => {
            let count = querySnapshot.size;
            let tDonated = 0;
            let tClaimed = 0;
            console.log("Total user docs:", count);
            document.getElementById("activeUser-goes-here").innerText = count;
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                tDonated += data.donated;
                tClaimed += data.claimed;
            });
            document.getElementById("totalDonated-goes-here").innerText = tDonated;
            document.getElementById("totalClaimed-goes-here").innerText = tClaimed;
        })
    db.collection("clothes")
        .orderBy("last_updated", "desc")       //optional ordering
        .limit(15)           //optional limit
        .get()
        .then(snap => {
            snap.forEach(doc => {
                displayPostCard(doc);
            })
        })
}
showPosts();

//------------------------------------------------------------
// this function displays ONE card, with information
// from the post document extracted (name, description, image)
//------------------------------------------------------------
function displayPostCard(doc) {
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
    document.getElementById("posts-go-here").append(newcard);
}