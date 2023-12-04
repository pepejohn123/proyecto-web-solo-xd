$(document).ready(function () {
    const baseUrl = localStorage.getItem('url');
    const apiUrl = baseUrl + "credentials";
    console.log(apiUrl);

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        var textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Image URL copied to clipboard!');
    }

    // Function to perform the second POST request
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

    function deleteImage(baseUrl, data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'DELETE',
                data:data,
                url: baseUrl + 'newDocument', // Modify the URL
                success: function (response) {

                    resolve(response);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }

    // Function to handle form submission
    function handleFormSubmission(documentData) {
        var updateData = {
            id: documentData._id
        };

        if ($('#documentName').val()) {
            updateData.name = $('#documentName').val();
            console.log('Document Name is being used.');
        }

        if ($('#expeditionDate').val()) {
            updateData.expedition_date = $('#expeditionDate').val();
            console.log('Expedition Date is being used.');
        }

        if ($('#expirationDate').val()) {
            updateData.expiration_date = $('#expirationDate').val();
            console.log('Expiration Date is being used.');
        }

        var fileInput = $('#documentImage')[0];
        var image;

        if (fileInput.files.length > 0) {
            updateData.ext =fileInput.files[0].name.split('.').pop();
            image = new FormData();
            image.append('name', documentData._id);
            image.append('scan', fileInput.files[0]);
        } else {
            console.log('No file selected.');
        }
        $.ajax({
            url: baseUrl + 'credentials',
            method: "PUT",
            data: updateData,
            success: function (data) {
                console.log("Data posted successfully:", data);
                console.log(image);

                if (typeof image === 'undefined') {
                    alert("Document edited successfully:\n" + JSON.stringify(updateData, null, 2));
                    location.reload();

                } else {
                    performSecondPost(baseUrl, image)
                        .then(function () {
                            alert("Document edited successfully:\n" + JSON.stringify(updateData, null, 2));

                            location.reload();

                        })
                        .catch(function (error) {
                            console.error("Error in second post:", error);
                        });
                }
            },
            error: function (error) {
                console.error("Error:", error);
                alert("Error occurred:\n" + JSON.stringify(updateData, null, 2));
            }
        });
    }

    // Make an AJAX request to fetch JSON data
    $.get(apiUrl, function (data) {
        var tableBody = $('#documentTableBody');
        tableBody.empty();

        data.forEach(function (document) {
            var expedition = new Date(document.expedition_date);
            var formattedExpedDate = expedition.toLocaleDateString();
            var expiration = new Date(document.expiration_date);
            var formattedExpirDate = expiration.toLocaleDateString();
            var image_url = baseUrl + 'scans/' + document._id + '.' + document.ext;

            var row = `<tr>
            <td>${document.name}</td>
            <td>${formattedExpedDate}</td>
            <td>${formattedExpirDate}</td>
            <td>
                <img src="${image_url}" alt="PDF!" style="max-width: 200px;">
            </td>
            <td><button class="btn btn-primary copy-button" data-url="${image_url}">Copy Image URL</button></td>
            <td><button class="btn btn-success open-form-button" data-document="${encodeURIComponent(JSON.stringify(document))}">Edit Document</button></td>
            <td><button class="btn btn-danger delete-button" data-document-id="${document._id}">Delete</button></td>
        

            </tr>`;

            tableBody.append(row);
        });
        
        $('.open-form-button').on('click', function () {
            $('#formModal').modal('show');
            var documentData = JSON.parse(decodeURIComponent($(this).data('document')));
            $('#editForm').off('submit').on('submit', function (event) {
                console.log(documentData._id);
                handleFormSubmission(documentData);
                event.preventDefault();
            });

            $('#saveChangesBtn').off('click').on('click', function () {
                $('#editForm').submit();
            });
        });

        $('.copy-button').on('click', function () {
            var imageUrl = $(this).data('url');
            copyToClipboard(imageUrl);
        });
        $('.delete-button').on('click', function () {
            var documentId = $(this).data('document-id');
            var ext = $(this).data('ext');
            if (confirm("Are you sure you want to delete this document?")) {
                // Perform the deletion
                $.ajax({
                    url: baseUrl + 'credentials',
                    method: 'DELETE',
                    data: { documentId: documentId },
                    success: function (data) {
                        
                        var fileData = {
                            name: documentId,
                            ext: ext
                        };
                        console.log(fileData);
                        deleteImage(baseUrl, fileData) // Uncomment this line
                            .then(function () {
                                console.log("Document and image deleted successfully:", data);
                                location.reload();

                                // Reload the table or update the UI as needed
                            })
                            .catch(function (error) {
                                console.error("Error deleting image:", error);
                                // Handle error
                            });
                    },
                    error: function (error) {
                        console.error("Error deleting document:", error);
                        // Handle error
                    }
                });
            }
        });

    });

});
