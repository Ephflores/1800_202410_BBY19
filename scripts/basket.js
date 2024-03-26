//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("mybasket"); // Retrieve the HTML element with the ID "mybasket" and store it in the cardTemplate variable. 

    db.collection(collection).get() 
        .then(clothes => {
            //var i = 1;  //Optional: if you want to have a unique ID for each item
            clothes.forEach(doc => { //iterate thru each doc
                var details = doc.data().details;  
                var dropoff = doc.data().dropoff;    
                var itemname = doc.data().item_name;
                var location = doc.data().location;
                var meetup = doc.data().meetup;
                var pickup = doc.data().pickup;
                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('a').href = "eachHike.html?docID=" + docID;
                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; 


                //attach to gallery, Example: "items-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("pending");  //input param is the name of the collection