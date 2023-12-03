function fetchDataAndPopulateTable() {
    const baseUrl = localStorage.getItem('url');

    $.get(baseUrl + "credentials", function (data) {
        const tableBody = $("#dataTableBody");
        tableBody.empty();

        const currentDate = new Date();

        // Sort the data based on the difference between today's date and the expiration date
        data.sort((a, b) => {
            const dateA = new Date(a.expiration_date);
            const dateB = new Date(b.expiration_date);

            const diffA = !isNaN(dateA.getTime()) ? Math.floor((currentDate - dateA) / (1000 * 60 * 60 * 24)) : NaN;
            const diffB = !isNaN(dateB.getTime()) ? Math.floor((currentDate - dateB) / (1000 * 60 * 60 * 24)) : NaN;

            return diffB - diffA;
        });

        data.forEach(item => {
            const jsonDate = new Date(item.expiration_date);
            var image_url = baseUrl + 'scans/' + item._id + '.' + item.ext;


            const differenceInDays = !isNaN(jsonDate.getTime()) ? Math.floor((currentDate - jsonDate) / (1000 * 60 * 60 * 24)) : NaN;

            const text = isNaN(differenceInDays) ? 'Invalid date' :
                differenceInDays >= 0 ? `${differenceInDays} days ago` : `${-differenceInDays} days left`;
    
            const newRow = $("<tr>");

            //append this instead of the id
            newRow.append($(`<td>${item.name}</td>`));

            newRow.append($(`<td><img src="${image_url}" alt="Image" style="max-width: 100px; max-height: 100px;"></td>`));
            newRow.append($(`<td>${jsonDate.toLocaleDateString()}</td>`));
            newRow.append($(`<td>${text}</td>`));

            tableBody.append(newRow);
        });

        $("#dataTableHeader, #dataTable").show();
    });
}

$(document).ready(function() {
    fetchDataAndPopulateTable();
});
