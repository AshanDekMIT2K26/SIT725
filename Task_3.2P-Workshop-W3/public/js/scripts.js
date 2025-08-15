const cardList = [
    {
        title: "Kitten 1",
        image: "images/Lion1.jpeg",
        link: "About Kitten 1",
        description: "Demo description about kitten 1"
    },
    {
        title: "Kitten 2",
        image: "images/Elephant1.jpeg",
        link: "About Kitten 2",
        description: "Demo description about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/Tiger1.jpeg",
        link: "About Kitten 3",
        description: "Demo description about kitten 3"
    }
];

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
};

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();

    console.log("Form Data Submitted: ", formData);
    // Manually close the modal after form submission
    $('#modal1').modal('close');
};

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
};

$(document).ready(function () {
    $('.materialboxed').materialbox();
    
    // Initialize the modal
    $('.modal').modal();
    
    // Set up click handler for form submission button
    $('#formSubmit').click(() => {
        submitForm();
    });
    
    addCards(cardList);
});