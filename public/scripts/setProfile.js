$(document).ready(function () {
    const baseUrl = localStorage.getItem('url');

    // Event handler for Update Public Status button click
    $('#updatePublicStatusBtn').on('click', function () {
        // Get the status of the checkbox
        const isPublic = $('#publicCheckbox').prop('checked');
        console.log(isPublic);
        // Prepare data for the PUT request
        const requestData = {
            public: isPublic
            // Add other properties if needed
        };

        // Make a PUT request
        $.ajax({
            url: baseUrl + 'profile', // Replace with your actual API endpoint
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            success: function (response) {
                console.log('PUT request successful:', response);
                // Handle success, if needed
            },
            error: function (error) {
                console.error('PUT request error:', error);
                // Handle error, if needed
            }
        });
    });

    // Rest of your existing code...

});
