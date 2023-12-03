$(document).ready(function () {
    $('#form').submit(function (event) {
        event.preventDefault();
        const baseUrl = localStorage.getItem('url');
        const id = localStorage.getItem('id');
        const inputFile = $('#fileInput')[0];
        const file = inputFile.files[0];
        const image = new FormData();

        const exte = inputFile.files[0].name.split('.').pop();
        console.log(exte);
        const name = $('#name').val();

        var permit ={}

        // Get form data
        var formData = {
            name: $('#name').val(),
            expedition_date: $('#expeditionDate').val(),
            expiration_date: $('#expirationDate').val(),
            ext: exte
            // Add other form fields as needed
        };
        console.log(formData);

        let document_id = 0;
        // Send data in a POST request
        $.ajax({
            type: 'POST',
            url: baseUrl + 'credentials',
            data: formData,
        })
            .then(function (response) {
                document_id = response._id;
                image.append('name', response._id);
                image.append('scan', file);
                console.log('First POST request successful:', response);
                permit = {
                    "owner": response.owner,
                    "document": response._id,
                    "permitted_users": []
                }
                return performSecondPost(baseUrl, image);
            })
            .then(function (secondResponse) {
                console.log(formData);
                console.log('Second POST request successful:', secondResponse);
                
                console.log(permit);
                return performThirdPost(baseUrl, permit);
            })
            .then(function (thirdResponse) {
                console.log('Third POST request successful:', thirdResponse);
                // Continue with any further actions
                alert('Added!');
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    });

    function performSecondPost(baseUrl, image) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: baseUrl + 'newDocument',
                data: image,
                contentType: false,
                processData: false,
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }

    function performThirdPost(baseUrl, formData) {
        console.log(formData);


        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: baseUrl + 'permits',
                data: formData,
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }


});
