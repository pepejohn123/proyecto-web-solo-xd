$(document).ready(function () {
    $('#documentForm').submit(function (e) {
        e.preventDefault(); // Prevent the form from submitting traditionally

        // Get form data
        var formData = new FormData(this);

        // Make a POST request
        $.ajax({
            type: 'POST',
            url: baseUrl+"credentials", // Replace with the actual server endpoint
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log('Form submitted successfully:', response);
                // Handle success, if needed
            },
            error: function (error) {
                console.error('Error submitting form:', error);
                // Handle error, if needed
            }
        });
    });
});