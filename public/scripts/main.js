$(document).ready(function () {
    eraseCookies();

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

    function eraseCookies() {
        // Get all cookies for the current domain
        var cookies = document.cookie.split(';');
    
        // Loop through each cookie and delete it
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf('=');
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    }
    
});


