// function displayPage() {
//     let params = new URL(window.location.href);
//     let ID = params.searchParams.get("docID");
//     console.log(ID);

//     db.collection("category")
//         .doc(ID)
//         .get()
//         .then(doc => {
//             if (doc.exists) {
//                 let categoryID = doc.data();

//                 // Display the category information based on the field you want
//                 document.getElementById("categoryID").innerHTML = thisCategory.type; // Assuming "type" is the field you want to display

//                 // After fetching category document, call another function to fetch related items
//                 fetchItemsByCategory(ID);
//             } else {
//                 console.log("Error: Document does not exist!");
//             }
//         })
//         .catch(error => {
//             console.log("Error getting category document:", error);
//         });
// }

// function fetchItemsByCategory(categoryID) {
//     db.collection("items").where("Category", "==", categoryID)
//         .get()
//         .then(querySnapshot => {
//             querySnapshot.forEach(doc => {
//                 console.log(doc.id, " => ", doc.data());
//                 const category = doc.data().Category;
//                 const gender = doc.data().Gender;
//                 const top = doc.data().Top;
//                 const type = doc.data().Type;

//                 console.log("Category:", category);
//                 console.log("Gender:", gender);
//                 console.log("Top:", top);
//                 console.log("Type:", type);
//             });
//         })
//         .catch(error => {
//             console.log("Error getting items:", error);
//         });
// }

// displayPage();
