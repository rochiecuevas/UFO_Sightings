// Print out the data
console.log(data);

// Define the submit variable (the Submit button)
var submit = d3.select("#submit");

submit.on("click", function(){
    // Prevent page refresh caused by clicking on Submit
    d3.event.preventDefault();
    
    // Select the input HTML element
    var inputDate = d3.select("#inputDate-field");

    // Get the value of the input element
    var inputValue = inputDate.property("value");
    
    // Preview the inputValue
    console.log(inputValue);

    // Filter the data based on the input date
    var filteredDate = data.filter(d => d.datetime === inputValue);

    // Preview the filteredDate
    console.log(filteredDate);

    // Create a variable for a table and its components
    var table = d3.select(".table").append("table");
    table.attr("class", "table");

    var thead = table.append("thead"); // add the thead HTML element
    var row_head = thead.append("tr") // Add a row in thead
    var tbody = table.append("tbody"); // add the tbody HTML element

    // Populate the thead
    var col_headers = Object.keys(filteredDate[0]); // output: array of column headers
    console.log(col_headers);

    // Create a for loop that iterates through the col_headers array
    col_headers.forEach(function(header){

        // Preview each header
        console.log(header);

        // Define the variable cell for each header
        var cell = row_head.append("th");

        // Write each header into each cell
        cell.text(header);
    });

    // Populate the tbody using the date in the output variable

    // Create a for loop using forEach (i.e., for each dict in data)
    filteredDate.forEach(function(dict){ 

        // Add a row where values of each dict can go into
        var row = tbody.append("tr");

        // For each key-value pair in each dict
        Object.entries(dict).forEach(function([,value]){

            // Preview each value
            console.log(value);

            // Add a cell in each row for each value
            var cell = row.append("td");

            // Write each value into each cell
            cell.text(value);
        });
    });


});

// Create the options for selecting shapes
var shapes = Array.from(new Set(data.map(dict => dict.shape)));
console.log(shapes);
shapes.unshift(""); // add a blank option





















