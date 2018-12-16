// Print out the data
console.log(data);

// Define an arrays of dates, countries, states, cities, shapes
var dates = Array.from(new Set(data.map(dict => dict.datetime)));
console.log(dates);

var countries = Array.from(new Set(data.map(dict => dict.country)));
console.log(countries);

var cities = Array.from(new Set(data.map(dict => dict.city)));
console.log(cities);  

var states = Array.from(new Set(data.map(dict => dict.state)));
console.log(states);  

var shapes = Array.from(new Set(data.map(dict => dict.shape)));
shapes.unshift(""); // add a blank option
console.log(shapes);

// Input date
var inputDate = d3.select("#date");

var options = inputDate
    .selectAll("option")
    .data(dates).enter()
    .append("option")
    .text(function(date){
        return date;
    });

function handleChange(){
    var selectDate = inputDate.property("value");
    console.log(selectDate);

    // Filter data based on the date input
    var filteredDate = data.filter(obj => obj.datetime === selectDate);
    console.log(filteredDate);
    
    // Select shape
    var selectShape = d3.select("#shape");

    // Put the different shapes in the options
    var options = selectShape
        .selectAll("option")
        .data(shapes).enter()
        .append("option")
        .text(function(shape){
            return shape;
        });
    
    function onchange(){
        var inputShape = selectShape.property("value");
        console.log(inputShape);
        var filteredShape = filteredDate.filter(dict => dict.shape === inputShape);
        console.log(filteredShape);

        // Create a variable for a table and its components
        var table = d3.select(".table").append("table");
        table.attr("class", "table");

        var thead = table.append("thead"); // add the thead HTML element
        var row_head = thead.append("tr") // Add a row in thead
        var tbody = table.append("tbody"); // add the tbody HTML element

        // Populate the thead
        var col_headers = Object.keys(filteredShape[0]); // output: array of column headers

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
        filteredShape.forEach(function(dict){ 

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
    }

    selectShape.on("change", onchange);    
}
inputDate.on("change", handleChange);


