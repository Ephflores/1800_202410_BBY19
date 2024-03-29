function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("posts"); 

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


                //attach to gallery, Example: "items-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("clothes");  //input param is the name of the collection