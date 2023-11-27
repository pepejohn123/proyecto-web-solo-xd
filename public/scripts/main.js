$(document).ready(function () {
    const baseUrl = window.location.href.replace('/login', '/');
    console.log("aaa");
    $('#login').submit(function (event) {
        event.preventDefault();
        console.log("aaa");
        var formData = {
            email: $('#email').val(), // Assuming you have an input field with the id 'name'
            password: $('#password').val(), // Assuming you have an input field with the id 'name'  
        };
        console.log(formData);
        $.post(baseUrl+"login", formData, res => {
            var id = res._id;
            var email = res.email;
            localStorage.setItem('id', id);
            localStorage.setItem('email', email);
            
            console.log(baseUrl );
            localStorage.setItem('url', baseUrl);
            window.location.href = "/home";
            
        });

    });
});


