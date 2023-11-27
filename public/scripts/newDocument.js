$(document).ready(function () {
    $('#form').submit(function (event) {

        // Prevent the default form submission
        event.preventDefault();
        const baseUrl = localStorage.getItem('url');
        const id = localStorage.getItem('id');
        var inputFile = $('#fileInput')[0]; // Assuming your file input has an ID of 'file'
        file = inputFile.files[0];
        const image = new FormData();

        ext = inputFile.files[0].name;
        ext = ext.split('.').pop();
        const name = $('#name').val();
        const filename = `${id}-${name}.${ext}`;
        image.append('name', name);
        image.append('scan', fileInput.files[0]);

        // Get form data
        var formData = {
            name: $('#name').val(),
            expedition_date: $('#expeditionDate').val(),
            expiration_date: $('#expirationDate').val(),
            image_url: filename

            // Add other form fields as needed
        };

        // Send data in a POST request
        $.ajax({
            type: 'POST',
            url: baseUrl + "credentials", // Replace with your server endpoint
            data: formData,
            success: function (response) {
                // Handle success
                console.log('Success:', response);
                performSecondPost(baseUrl,image, formData);

            },
            error: function (error) {
                // Handle error
                console.error('Error:', error);
            }
        });
    });

    function performSecondPost(baseUrl,image,formData) {
        
        // You can customize this part based on your needs
        $.ajax({
            type: 'POST',
            url: baseUrl + 'newDocument', // Replace with your second endpoint
            data: image, // Replace with your second POST data
            contentType: false,
            processData: false,
            success: function (response) {
                console.log('Second POST request successful:', response);
                const permit = new FormData();
                console.log(response);
                permit.append('owner',response.owner);
                permit.append('document',response._id)
                // Continue with any further actions
                alert("Added!");
                //window.location.href = "/home";
                performThirdPost(baseUrl,permit);
            },
            error: function (error) {
                console.error('Error in second POST request:', error);
            }
        });
    }
    function performThirdPost(baseUrl,permit) {
        
        // You can customize this part based on your needs
        $.ajax({
            type: 'POST',
            url: baseUrl + 'permits', // Replace with your second endpoint
            data: permit, // Replace with your second POST data
            contentType: false,
            processData: false,
            success: function (response) {
                console.log('Third POST request successful:', response);
                // Continue with any further actions
                //window.location.href = "/home";
            },
            error: function (error) {
                console.error('Error in second POST request:', error);
            }
        });
    }
});



