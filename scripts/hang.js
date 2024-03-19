// var hangFormDB = firebase.database().ref("clothes");

document.getElementById('hangForm').addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("item-name");
    var detail = getElementVal("item-details");

    console.log(name, detail);
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
};