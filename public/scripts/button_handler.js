$(document).ready(function () {
    // Replace '/login' in the URL with '/'
    const baseUrl = window.location.href.replace('/home', '/');

    var newDocumentButton = document.getElementById('newDocument');
    var seeDocumentButton = document.getElementById('seeDocument');
    var managePermissionButton = document.getElementById('managePermission');
    var historialButton = document.getElementById('historial');
    var addSnapshotButton = document.getElementById('addSnapshot');
    var editDocumentButton = document.getElementById('editDocument');

    // Add click event listeners
    newDocumentButton.addEventListener('click', function () {
        // Call a function or perform an action when the button is clicked
        console.log('New Document button clicked');
        // Add your logic here
        window.location.href = "/newDocument";
        

    });

    seeDocumentButton.addEventListener('click', function () {
        console.log('See Document button clicked');
        // Add your logic here
        window.location.href = "/allDocuments";
    });

    managePermissionButton.addEventListener('click', function () {
        console.log('Manage Permissions button clicked');
        // Add your logic here
        window.location.href = "/managePermits";

    });

    editDocumentButton.addEventListener('click', function () {
        console.log('edit Document button clicked');
        // Add your logic here
    });



});
