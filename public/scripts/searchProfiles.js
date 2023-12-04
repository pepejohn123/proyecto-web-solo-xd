$(document).ready(function () {
    const baseUrl = localStorage.getItem('url');

    // Initialize DataTable outside the function
    var dataTable = $('#documentTableBody').DataTable({
        paging: true,
        columns: [
            { data: 'name' },
            { data: 'image', render: renderImage }, // Assuming 'image' is a property in the profile data
            { data: 'email' },
            { data: 'nationality' },
            { data: 'genre' }
        ]
    });

    function fetchDataAndInitializeTable(searchValue) {
        var profileUrl = baseUrl + "profile";
        console.log("aaa");

        // Clear existing data in the DataTable before adding new data
        dataTable.clear().draw();

        $.get(profileUrl, function (data) {
            // Assuming data is an array of profiles
            console.log(data);

            // Iterate through the array and add each profile to the DataTable
            data.forEach(function (profile) {
                $.get(baseUrl + "user/" + profile.owner, function (secondData) {
                    console.log(profile);
                    console.log(secondData);
                    var name = profile.first_name + ' ' + profile.fathers_last_name + ' ' + profile.mothers_last_name;
                    var image_url = baseUrl + 'uploads/' + profile.owner + '.jpg'
                    var combinedData = {
                        name: name,
                        image: image_url, // Assuming 'image' is a property in the profile data
                        email: secondData, // Assuming 'email' is a property in the secondData
                        nationality: profile.nationality, // Assuming 'nationality' is a property in the secondData
                        genre: profile.genre // Assuming 'genre' is a property in the secondData
                    };

                    // Add the combined data to the DataTable
                    dataTable.row.add(combinedData).draw();
                });
            });
        });
    }

    // Event handler for Enter key press in the input field
    $('#searchInput').keydown(function (event) {
        if (event.which === 13) { // 13 is the key code for Enter
            event.preventDefault();
            console.log("Enter key pressed");
            var searchValue = $(this).val();
            fetchDataAndInitializeTable(searchValue);
        }
    });

    function renderImage(data) {
        // Add a style attribute to the image tag to control its size
        return '<img src="' + data + '" alt="No Image :(" class="table-img" style="max-width: 100px; max-height: 100px;">';
    }
});
