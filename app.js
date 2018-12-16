// Print out the data
console.log(data);


// Define the date input field variable
var inputDate = d3.select("#inputDate-field");
var output = d3.select(".output");

// Define the function "handleClick"
function handleChange(event){
    var text = d3.event.target.value;
    console.log(text);

    // Clear the previous value
    output.text("");

    // Set the output text
    output.text(text);
};




// Create a variable for table
var table = d3.select(".table").append("table");
table.attr("class", "table");

var thead = table.append("thead"); // add the thead HTML element
var row_head = thead.append("tr") // Add a row in thead
var tbody = table.append("tbody"); // add the tbody HTML element

// Populate the thead
var col_headers = Object.keys(data[0]); // output: array of column headers
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
data.forEach(function(dict){ 

    // Add a row where values of each dict can go into
    var row = tbody.append("tr");

    // For each key-value pair in each dict
    Object.entries(dict).forEach(function([key,value]){

        // Preview each value
        console.log(value);

        // Add a cell in each row for each value
        var cell = row.append("td");

        // Write each value into each cell
        cell.text(value);
    });
});


// Attach an event to detect changes in the input field
inputDate.on("change", handleChange);