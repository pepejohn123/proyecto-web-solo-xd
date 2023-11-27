$(document).ready(function () {
    const id = localStorage.getItem('id');
    const email = localStorage.getItem('email');


    if (id) {
        console.log('id:', id);
    } else {
        console.error('User ID not found in localStorage');
    }

    if (email) {
        console.log('email:', email);
        var userNameSpan = document.getElementById('userName');
        userNameSpan.innerHTML += email;
    } else {

        console.error('email not found in localStorage');
    }

    // Replace '/login' in the URL with '/'
    const baseUrl = window.location.href.replace('/home', '/');
    const relativeImageUrl = `uploads/${id}.jpg`;
    const imageUrl = baseUrl + relativeImageUrl;

    // Make a GET request to fetch the image
    $.get(imageUrl, function (data) {
        // 'data' contains the response, in this case, it might be the image content
        // Use 'data' to process the image, set it as the source of an <img> element, etc.
        console.log('Image data retrieved succesfully');
        $('.profile-img').attr('src', imageUrl);
    })
        .fail(function (error) {
            // Handle errors
            console.error('Error fetching image:', error);
        });

    var fileInput = document.getElementById('fileInput');
    var triggerButton = document.getElementById('triggerButton');
    triggerButton.addEventListener('click', function () {
        // Trigger the input element
        fileInput.click();
    });
    fileInput.addEventListener('change', function () {
        // Submit the form when a file is selected
        console.log(baseUrl + "uploads");
        var formData = new FormData();
        formData.append('archivo', fileInput.files[0]);
        $.post({
            type: 'POST',
            url: baseUrl + 'upload', // Replace with the actual endpoint for handling file uploads
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log('File uploaded successfully:', response);
                location.reload();
            },
            error: function (error) {
                console.error('Error uploading file:', error);
            }
        });
    });
    var newDocumentButton = document.getElementById('newDocument');
    var seeDocumentButton = document.getElementById('seeDocument');
    var managePermissionButton = document.getElementById('managePermission');
    var historialButton = document.getElementById('historial');

    // Add click event listeners
    newDocumentButton.addEventListener('click', function () {
        // Call a function or perform an action when the button is clicked
        console.log('New Document button clicked');
        // Add your logic here
    });

    seeDocumentButton.addEventListener('click', function () {
        console.log('See Document button clicked');
        // Add your logic here
    });

    managePermissionButton.addEventListener('click', function () {
        console.log('Manage Permissions button clicked');
        // Add your logic here
    });

    historialButton.addEventListener('click', function () {
        console.log('Historial button clicked');
        // Add your logic here
    });


});
