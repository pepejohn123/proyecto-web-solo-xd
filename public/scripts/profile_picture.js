$(document).ready(function () {
    const baseUrl = localStorage.getItem('url');
    var fileInput = document.getElementById('fileInput');
    var triggerButton = document.getElementById('triggerButton');
    triggerButton.addEventListener('click', function () {
        // Trigger the input element
        fileInput.click();
    });
    fileInput.addEventListener('change', function () {
        // Submit the form when a file is selected
        console.log(baseUrl + "uploads");
        var formData = new FormData();
        formData.append('archivo', fileInput.files[0]);
        $.post({
            type: 'POST',
            url: baseUrl + 'upload', // Replace with the actual endpoint for handling file uploads
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log('File uploaded successfully:', response);
                location.reload();
            },
            error: function (error) {
                console.error('Error uploading file:', error);
            }
        });
    });
});