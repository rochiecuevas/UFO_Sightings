// Print out the data
console.log(data);

// Rename the keys in data
var map = {
    datetime: "Date",
    city: "City",
    state: "State",
    country: "Country",
    comments: "Comments",
    shape: "Shape",
    durationMinutes: "Duration"
}

// Create a function that can be iterated through the objects in the data array
// Resource: https://stackoverflow.com/a/43839611
function editKey(obj){
    var replacedItems = Object.keys(obj).map((key) =>{
        var newKey = map[key] || key;
        return{[newKey]:obj[key]};
    });
    var newTab = replacedItems.reduce((a, b) => Object.assign({}, a, b));
    return newTab;
}

// Use editKey function to edit the key names in each object in the data array
var sightings = [];
data.forEach(function(dat){
    sightings.push(editKey(dat));
});
console.log(sightings);


// Define the header row of the table using the keys of the first object
var firstSighting = sightings[0];
console.log(firstSighting);

var headers = [];
Object.keys(firstSighting).forEach(key => 
    headers.push(key));
console.log(headers);



// Loop through data from sightings and puts them in each variable, remove duplicates
// This is for the options in the select fields
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

// Adding the list of options in the select input field (used for filtering)
var inputDate = d3.select("#date");
var optDate = inputDate
    .selectAll("option") // for each item in the list, an option HTML tag is created
    .data(dataArr[0]).enter() // dataArr[0] corresponds to the Date in the data array
    .append("option")
    .text(function(date){
        return date;
    });

// Create the complete table
var table = d3.select(".table").append("table");
    table.attr("class", "table table-hover");
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

// Filter the table by step
// Nested; i.e., choose the date first, then the state, then the city, then the alien ship shape
// This approach makes the list shorter each time but will not show an empty table

function changeDate(){  // will be activated once a choice is made in the select field for Date
    tbody.text("");  // clears the complete table first before the filtered table is loaded
    var selDate = inputDate.property("value");  // the selected date
    console.log(selDate);

    // filter the sightings array to get all objects containing the selected date
    var filterDate = sightings.filter(sighting => sighting.Date === selDate);
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

        var states = Array.from(new Set(filterDate.map(dict => dict.State)));
        states.unshift("All");
        console.log(states);  

        var inputState = d3.select("#state");
        var optState = inputState  // populate the options depending on the values in the filtered table
            .selectAll("option")
            .data(states).enter()
            .append("option")
            .text(function(state){
                return state;
            });

        function changeState(){  // nested function: after selecting the date, options available are states with sightings on that date
            tbody.text("");
            var selState = inputState.property("value");
            console.log(selState);
        
            var filterState = filterDate.filter(sighting => sighting.State === selState);
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

            var cities = Array.from(new Set(filterState.map(dict => dict.City)));
            cities.unshift("All");
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
        
                var filterCity = filterState.filter(sighting => sighting.City === selCity);
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

                var shapes = Array.from(new Set(filterCity.map(dict => dict.Shape)));
                shapes.unshift("All");
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
                    tbody.text("");
                    var selShape = inputShape.property("value");
                    console.log(selShape);

                    var filterShape = filterCity.filter(sighting => sighting.Shape === selShape);
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

                document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
                };
                inputShape.on("change", changeShape);

            document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
            };
            inputCity.on("change", changeCity);    

        document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen  
        };
        inputState.on("change", changeState);

document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
};
inputDate.on("change", changeDate);

// Refresh button
var button = d3.select(".btn");
function refreshPage(){
    window.location.reload(true);
}



