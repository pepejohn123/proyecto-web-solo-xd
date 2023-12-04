$(document).ready(function () {
    console.log("aaa");
    $('#registration').submit(function (event) {
        event.preventDefault();
        console.log("aaa");
        var formData = {
            first_name: $('#first_name').val(),
            fathers_last_name: $('#fathers_last_name').val(),
            mothers_last_name: $('#mothers_last_name').val(),
            birthdate: $('#birthdate').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            nationality: $('#nationality').val(),
            civil_state: $('#civil_state').val(),
            birth_entity: $('#birth_entity').val(),
            birth_municipality: $('#birth_municipality').val(),
            entity_of_birth: $('#entity_of_birth').val(),
            genre: $('#genre').val(),
        };

        console.log(formData);

        $.post('http://localhost:3000/register', formData, function (res) {
            // Assuming the server redirects to a success page
            window.location.href = "/login";
        })
        .fail(function (error) {
            // Handle registration failure, show error messages, etc.
            console.error("Registration failed:", error.responseText);
            // You might want to display an error message to the user
            alert('Registration failed. Please check the provided information and try again. Probably the email was already used');
            
        });
    });
});