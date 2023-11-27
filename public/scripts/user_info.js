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
    const baseUrl = localStorage.getItem('url');
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
});
