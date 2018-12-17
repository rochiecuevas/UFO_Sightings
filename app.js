// Print out the data
console.log(data);

// Define data using a more meaningful variable
var sightings = data;


// Creating clickable options for filtering //

// Define the header row of the table using the keys of the first object
var firstSighting = sightings[0];
console.log(firstSighting);

var headers = [];
Object.keys(firstSighting).forEach(key => 
    headers.push(key));
console.log(headers);

// Loop through data from sightings and puts them in each variable, remove duplicates
var dataArr = [];
for (var i = 0; i < headers.length; i ++){
    var variables = [];
    variables[i] = [];
    sightings.map(function(sighting){
    variables[i].push(sighting[headers[i]]);
    })
    variables[i] = Array.from(new Set(variables[i]));
    variables[i].unshift("All") // put "All" as the first choice
    dataArr.push(variables[i]);
}
console.log(dataArr);

// Adding each list of options in select input field
var inputDate = d3.select("#date");
var optDate = inputDate
    .selectAll("option")
    .data(dataArr[0]).enter()
    .append("option")
    .text(function(date){
        return date;
    });

// Create the full table
var table = d3.select(".table").append("table");
    table.attr("class", "table");
    table.attr("id", "table1");

// Populate the thead using the headers array    
var thead = table.append("thead"); // add the thead HTML element
var row_head = thead.append("tr") // Add a row in thead
    row_head.attr("class", "header"); // differentiate header row from data row

// Create a for loop that iterates through the headers array
headers.forEach(function(header){

    // Preview each header
    console.log(header);

    // Define the variable cell for each header
    var cell = row_head.append("th");

    // Write each header into each cell
    cell.text(header);
});

// Populate the tbody using the date in the output variable
var tbody = table.append("tbody"); // add the tbody HTML element

// Create a for loop using forEach (i.e., for each dict in sightings)
sightings.forEach(function(dict){ 

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

// Filter the table
function changeDate(){
    tbody.text("");
    var selDate = inputDate.property("value");
    console.log(selDate);

    var filterDate = sightings.filter(sighting => sighting.datetime === selDate);
    console.log(filterDate);

    filterDate.forEach(function(dict){ 

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

        var states = Array.from(new Set(filterDate.map(dict => dict.state)));
        console.log(states);  

        var inputState = d3.select("#state");
        var optState = inputState
            .selectAll("option")
            .data(states).enter()
            .append("option")
            .text(function(state){
                return state;
            });

        function changeState(){
            tbody.text("");
            var selState = inputState.property("value");
            console.log(selState);
        
            var filterState = filterDate.filter(sighting => sighting.state === selState);
            console.log(filterState);

            filterState.forEach(function(dict){ 

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


        var cities = Array.from(new Set(filterState.map(dict => dict.city)));
        console.log(cities); 

        var inputCity = d3.select("#city");
        var optCity = inputCity
        .selectAll("option")
        .data(cities).enter()
        .append("option")
        .text(function(city){
            return city;
        });

        function changeCity(){
            tbody.text("");
            var selCity = inputCity.property("value");
            console.log(selCity);
    
            var filterCity = filterState.filter(sighting => sighting.city === selCity);
            console.log(filterCity);
    
            filterCity.forEach(function(dict){ 
    
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

            var shapes = Array.from(new Set(filterCity.map(dict => dict.shape)));
            console.log(shapes);

            var inputShape = d3.select("#shape");
            var optShape = inputShape
                .selectAll("option")
                .data(shapes).enter()
                .append("option")
                .text(function(shape){
                    return shape;
                });

            function changeShape(){
            var selShape = inputShape.property("value");
            console.log(selShape);

            var filterShape = filterCity.filter(sighting => sighting.shape === selShape);
            console.log(filterShape);

            filterShape.forEach(function(dict){ 

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

            };
            inputShape.on("change", changeShape);
        };
        inputCity.on("change", changeCity);    
    };
    inputState.on("change", changeState);
};
inputDate.on("change", changeDate);
