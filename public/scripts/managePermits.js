$(document).ready(function () {
    const baseUrl = localStorage.getItem('url');

    // Function to handle search input change
    $('#searchInput').on('keyup', function (event) {
        // Check if the pressed key is Enter (key code 13)
        if (event.keyCode === 13) {
            // Prevent the default form submission behavior
            event.preventDefault();

            // Get the value from the search input
            var searchTerm = $('#searchInput').val();
            console.log(searchTerm);
            var permitsUrl = `${baseUrl}/credentials/${searchTerm}`;

            // Make a GET request to the specified URL with the search term
            $.get(permitsUrl, function (data) {
                var tableBody = $('#documentTableBody');
                tableBody.empty();

                data.forEach(function (document) {
                    var checkbyDocument = `${baseUrl}/permits/${document._id}`;
                    var image_url = baseUrl + 'scans/' + document._id + '.' + document.ext;

                    // Add a new AJAX request to get more details based on the document ID
                    $.get(checkbyDocument, function (permits) {
                        console.log(permits);
                        var users;
                        if (permits.permitted_users.length === 0) {
                            users = [];
                            users.push("No one XD!");
                        } else {
                            users = permits.permitted_users;
                            console.log(users);
                        }

                        // Convert the array of users to an unordered list
                        var userList = '<ul>';
                        users.forEach(function (user) {
                            userList += `<li>${user}</li>`;
                        });
                        userList += '</ul>';

                        // Use the details to populate the corresponding table cell
                        var row = `<tr>
                            <td>${document.name}</td>
                            <td>
                                <img src="${image_url}" alt="PDF!" style="max-width: 200px;">
                            </td>
                            <td>${userList}</td>
                            <td>
                                <button class="btn btn-success open-form-button" data-document-name="${document.name}" data-document-id="${document._id}" data-toggle="modal" data-target="#permissionsModal">Manage Permissions</button>
                            </td>
                        </tr>`;

                        tableBody.append(row);
                    });
                });

                // Attach click event handler for the "Manage Permissions" buttons
                $('.open-form-button').on('click', function () {
                    // Retrieve the document data from the button's data attributes
                    var documentName = $(this).data('document-name');
                    var documentId = $(this).data('document-id');
                    console.log("se armó");

                    // Populate the form in the modal with the document data
                    $('#addPersonInput').val(documentName);
                    // Add more lines to populate other form fields as needed

                    // Store the document information in a variable or use it directly in your logic
                    var documentInfo = {
                        name: documentName,
                        id: documentId
                        // Add more properties if needed
                    };

                    // Open the modal
                    $('#permissionsModal').modal('show');
                });
            });
        }
    });

    // Attach click event handler for the "Update!" button
    $('#managePermissionsBtn').on('click', function () {
        // Trigger the form submission
        $('#permissionsForm').submit();
    });

    // Attach submit event handler for the form
    $('#permissionsForm').on('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        console.log("aaaa");

        // Access the document information directly from the button's data attributes
        var documentName = $('.open-form-button').data('document-name');
        var documentId = $('.open-form-button').data('document-id');

        if ($('#addPersonInput').val()) {
            var info = {}
            info.add = $('#addPersonInput').val();
            info.document = documentId;
            console.log(info);
            $.ajax({
                url: baseUrl + 'permits',
                method: "PUT",
                data: info,
                success: function (data) {
                    console.log("Added!:", data);
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
        if ($('#removePersonInput').val()) {
            console.log("entraste ermano");
            var info = {}
            info.remove = $('#removePersonInput').val();
            info.document = documentId;
            console.log(info);
            $.ajax({
                url: baseUrl + 'permits',
                method: "DELETE",
                data: info,
                success: function (data) {
                    console.log("Removed!:", data);
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
        var isChecked = $('#publicCheckbox').prop('checked');

        console.log('Checkbox is checked');
        var info = {}
        info.public = $('#publicCheckbox').prop('checked');
        info.document = documentId;
        console.log(info);
        $.ajax({
            url: baseUrl + 'permits',
            method: "PUT",
            data: info,
            success: function (data) {
                console.log("Added!:", data);
            },
            error: function (error) {
                console.error("Error:", error);
            }
        });
        // Perform actions when the checkbox is checked


    });
});
