$(document).ready(function () {
    const baseUrl = localStorage.getItem('url');
    var profileUrl = baseUrl + "profile/mine";

    console.log(profileUrl);

    // Example AJAX request (replace with your actual API endpoint)
    $.get(profileUrl, function (data) {
        $.get(baseUrl + "user/" + data.owner, function (secondData) {
            console.log(data);
            console.log(secondData);
            var name = data.first_name + ' ' + data.fathers_last_name + ' ' + data.mothers_last_name;
            console.log(name);
            // Assuming data is a JSON object with user information
            $("#userImage").attr("src", baseUrl + 'uploads/' + data.owner + '.jpg');
            $("#userEmail").text(secondData);
            $("#userFullName").text(name);
            $("#userNationality").text(data.nationality);
            $("#userGenre").text(data.genre);
        });
    });
});