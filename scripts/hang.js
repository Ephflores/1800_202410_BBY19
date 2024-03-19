// Function to be called when the button is clicked
function hangClick() {
    console.log("Button clicked!");
    //define a variable for the collection you want to create in Firestore to populate data
    var clothesRef = db.collection("clothes");

    // Get form values
    var name = document.getElementById('item-name').value;
    var details = document.getElementById('item-details').value;
    var pickup = document.getElementById('pick-up').checked;
    var dropoff = document.getElementById('drop-off').checked;
    var meetup = document.getElementById('meet-up').checked;
    var categories = document.querySelector('input[name="opt-categories"]:checked').value;
    var type = document.querySelector('input[name="opt-type"]:checked').value;
    var location = document.querySelector('input[name="opt-location"]:checked').value;

    // Write data to the database
    clothesRef.add({
        item_name: name,
        details: details,
        pickup: pickup,
        dropoff: dropoff,
        meetup: meetup,
        categories: categories,
        type: type,
        location: location
    });
  }
  
  // Get a reference to the button element
  var button = document.getElementById('hangButton');
  
  // Add event listener to the button
  button.addEventListener('click', hangClick);