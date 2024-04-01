function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("posts");
    //firebase.auth().onAuthStateChanged(user => 

    db.collection(collection).get()
        .then(allclothes => {
            //var i = 1;  //Optional: if you want to have a unique ID for each item
            allclothes.forEach(doc => { //iterate thru each doc
                var details = doc.data().details;
                var dropoff = doc.data().dropoff;
                var itemname = doc.data().item_name;
                var location = doc.data().location;
                var meetup = doc.data().meetup;
                var pickup = doc.data().pickup;
                let newcard = cardTemplate.content.cloneNode(true);
                //newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = itemname;
                //newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-location').innerHTML = location;
                newcard.querySelector('.card-image').src = doc.data().image;;
                document.getElementById("originalDivId").setAttribute("id", "newDivId");


                //attach to gallery, Example: "items-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
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