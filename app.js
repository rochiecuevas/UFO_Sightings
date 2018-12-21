// Print out the data from data.js
console.log(data);

// Rename the keys in data
var map = {
    datetime: "Date",
    city: "City",
    state: "State",
    country: "Country",
    comments: "Witness' Account",
    shape: "Shape",
    durationMinutes: "Duration"
};

// Create a function that can be iterated through the objects in the data array
// Resource: https://stackoverflow.com/a/43839611
function editData(obj, dict){
    var replacedItems = Object.keys(obj).map((key) =>{
        var newKey = dict[key] || key;
        return{[newKey]:obj[key]};
    });
    var newTab = replacedItems.reduce((a, b) => Object.assign({}, a, b));
    return newTab;
};

// Use editData function to edit the key names in each object in the data array
var sightings = [];
data.forEach(function(dat){
    sightings.push(editData(dat, map));
});
console.log(sightings);


// Define the header row of the table using the keys of the first object
var firstSighting = sightings[0];
console.log(firstSighting);

var headers = [];
Object.keys(firstSighting).forEach(key => 
    headers.push(key));
console.log(headers);


// Create the table
var table = d3.select(".table").append("table");
    table.attr("class", "table");

// Populate the table with a table header and thead rows
var thead = table.append("thead");
var rowHead = thead.append("tr");

headers.forEach(function(header){
    var cells = rowHead.append("th");
    console.log(header);
    cells.text(header);
});

// Populate the table with the table body and tbody rows
var tbody = table.append("tbody");


sightings.forEach(function(sighting){
    console.log(sighting);
    var rowBody = tbody.append("tr");
    Object.entries(sighting).forEach(function([key,value]){
        var cell = rowBody.append("td");
        console.log(value);
        cell.text(value);
    });
});

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

// Identifying the select fields
var inputDate = d3.select("#date");
var inputCity = d3.select("#city");
var inputState = d3.select("#state");
var inputShape = d3.select("#shape");

// Identifying the option fields
var optDate, optCity, optState,  optShape;

// Create arrays 
var ids = ["date", "state", "city", "shape"]; // option classes
var inputNames = [inputDate, inputState, inputCity, inputShape]; // input fields
var optionValues = [dataArr[0], dataArr[2], dataArr[1], dataArr[4]]; // options lists
var optionEntries = [optDate, optCity, optState, optShape]; // option names


// Create a function that populates the option fields per select field
function optionList(inputArr, dataArr, id){
    var options = inputArr // name of the input/select field
        .selectAll("option") // choose the option tag
        .data(dataArr).enter() // populates the option tags using the elements in each array
        .append("option") 
        .text(function(id){
            return id; 
        })
        .attr("id", id) // gives each option field an id
        .sort(); // alphabetical sorting
    return options    
};

// Adding the list of options in the select input field (used for filtering)
var optionsLists = [];
for (var i = 0; i < optionEntries.length; i ++){
    optionsLists.push(optionEntries[i] = optionList(inputNames[i], optionValues[i], ids[i]));
};
console.log(optionsLists);

// For each class with names (state, city, shape), disable hide the 0th element of the array (of element of that class)
for (var i = 1; i < ids.length; i ++){
    document.getElementById(ids[i])[0].hidden = true;
};

// Special case: for the date class, hide "All", which is the last element in the array of options
document.getElementById(ids[0])[13].hidden = true;

// Refresh button that reloads page when clicked //
var button = d3.select(".btn");
function refreshPage(){
    window.location.reload();
};

// Filter table
var filters = {}; // will be populated by keys (date, state, city, shape) and values for each key

// Create a function that creates a table based on the filter used
function createTable(x){
    var x;
    x.forEach(function(dict){ 
        var row = tbody.append("tr");
    
        return Object.entries(dict).forEach(function([key,value]){
                console.log(value);
                var cell = row.append("td");
                cell.text(value);
        });
    });
};

// Filter the table based on the options made
function changeDate(){
    tbody.text("");
    filters["Date"] = inputDate.property("value");
    console.log(filters);
    
    var x = sightings.filter(sighting => sighting.Date == filters["Date"]);
    console.log(x); // outputs an array containing objects that match the selected date

    createTable(x); // filter table based on date

    function changeState(){
        tbody.text("");
        filters["State"] = inputState.property("value");
        console.log(filters);

        var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.State == filters["State"]);
        console.log(x);

        createTable(x);
        
        function changeCity(){
            tbody.text("");
            filters["City"] = inputCity.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.State == filters["State"] && sighting.City == filters["City"]);
            console.log(x);

            createTable(x);
            
            function changeShape(){
                tbody.text("");
                filters["Shape"] = inputShape.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.State == filters["State"] && sighting.City == filters["City"] && sighting.Shape == filters["Shape"]);
                console.log(x);

                createTable(x);

                document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
            };
            inputShape.on("change", changeShape);
            document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
        };
        inputCity.on("change", changeCity);
    
        function changeShape(){
            tbody.text("");
            filters["Shape"] = inputShape.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.State == filters["State"] && sighting.Shape == filters["Shape"]);
            console.log(x);

            createTable(x);
            
            function changeCity(){
                tbody.text("");
                filters["City"] = inputCity.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.State == filters["State"] && sighting.Shape == filters["Shape"] && sighting.City == filters["City"]);
                console.log(x);

                createTable(x);

                document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
            };
            inputCity.on("change", changeCity);   
            document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen 
        };
        inputShape.on("change", changeShape);
        document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
    };
    inputState.on("change", changeState);

    function changeCity(){
        tbody.text("");
        filters["City"] = inputCity.property("value");
        console.log(filters);

        var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.City == filters["City"]);
        console.log(x);

        createTable(x);
        
        function changeState(){
            tbody.text("");
            filters["State"] = inputState.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.City == filters["City"] && sighting.State == filters["State"]);
            console.log(x);

            createTable(x);

            function changeShape(){
                tbody.text("");
                filters["Shape"] = inputShape.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.City == filters["City"] && sighting.State == filters["State"] && sighting.Shape == filters["Shape"]);
                console.log(x);

                createTable(x);

                document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
            };
            inputShape.on("change", changeShape);
            document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
        };
        inputState.on("change", changeState); 
        
        function changeShape(){
            tbody.text("");
            filters["Shape"] = inputShape.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.City == filters["City"] && sighting.State == filters["State"]);
            console.log(x);

            createTable(x);

            function changeState(){
                tbody.text("");
                filters["State"] = inputState.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.City == filters["City"] && sighting.State == filters["State"] && sighting.Shape == filters["Shape"]);
                console.log(x);

                createTable(x);
            
                document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
            };
            inputState.on("change", changeState);    
            document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
        };
        inputShape.on("change", changeShape);
        document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
    };
    inputCity.on("change", changeCity);

    function changeShape(){
        tbody.text("");
        filters["Shape"] = inputShape.property("value");
        console.log(filters);

        var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"]);
        console.log(x);

        createTable(x);
        
        function changeCity(){
            tbody.text("");
            filters["City"] = inputCity.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"] && sighting.City == filters["City"]);
            console.log(x);

            createTable(x);

            function changeState(){
                tbody.text("");
                filters["State"] = inputState.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"] && sighting.City == filters["City"] && sighting.State == filters["State"]);
                console.log(x);

                createTable(x);
                
                document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
            };
            inputState.on("change", changeState);
            document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
        };
        inputCity.on("change", changeCity);

        function changeState(){
            tbody.text("");
            filters["State"] = inputState.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"] && sighting.State == filters["State"]);
            console.log(x);

            createTable(x);

            function changeCity(){
                tbody.text("");
                filters["City"] = inputCity.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"] && sighting.City == filters["City"] && sighting.State == filters["State"]);
                console.log(x);

                createTable(x);
            
                document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
            };
            inputCity.on("change", changeCity);
            document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
        };
        inputState.on("change", changeState);
        document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
    };
    inputShape.on("change", changeShape);
    document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
};
inputDate.on("change", changeDate);

function changeState(){
    tbody.text("");
    filters["State"] = inputState.property("value");
    console.log(filters);
    
    var x = sightings.filter(sighting => sighting.State == filters["State"]);
    console.log(x);

    createTable(x);

    function changeDate(){
        tbody.text("");
        filters["Date"] = inputDate.property("value");
        console.log(filters);

        var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Date == filters["Date"]);
        console.log(x);

        createTable(x);
        
        function changeCity(){
            tbody.text("");
            filters["City"] = inputCity.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Date == filters["Date"] && sighting.City == filters["City"]);
            console.log(x);

            createTable(x);
            
            function changeShape(){
                tbody.text("");
                filters["Shape"] = inputShape.property("value");
                console.log(filters);
                
                var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Date == filters["Date"] && sighting.City == filters["City"] && sighting.Shape == filters["Shape"]);
                console.log(x);

                createTable(x);

                document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
            };
            inputShape.on("change", changeShape);
            document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
        };
        inputCity.on("change", changeCity);
        
    
        function changeShape(){
            tbody.text("");
            filters["Shape"] = inputShape.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"]);
            console.log(x);

            createTable(x);
            
            function changeCity(){
                tbody.text("");
                filters["City"] = inputCity.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"] && sighting.City == filters["City"]);
                console.log(x);

                createTable(x);
            };
            inputCity.on("change", changeCity);    
        };
        inputShape.on("change", changeShape);
    };
    inputDate.on("change", changeDate);

    function changeCity(){
        tbody.text("");
        filters["City"] = inputCity.property("value");
        console.log(filters);

        var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.City == filters["City"]);
        console.log(x);

        createTable(x);
        
        function changeDate(){
            tbody.text("");
            filters["Date"] = inputDate.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.City == filters["City"] && sighting.Date == filters["Date"]);
            console.log(x);

            createTable(x);

            function changeShape(){
                tbody.text("");
                filters["Shape"] = inputShape.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.City == filters["City"] && sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"]);
                console.log(x);

                createTable(x);

                document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
            };
            inputShape.on("change", changeShape);
            document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
        };
        inputDate.on("change", changeDate);

        function changeShape(){
            tbody.text("");
            filters["Shape"] = inputShape.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.City == filters["City"] && sighting.Shape == filters["Shape"]);
            console.log(x);

            createTable(x);

            function changeDate(){
                tbody.text("");
                filters["Date"] = inputDate.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.City == filters["City"] && sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"]);
                console.log(x);

                createTable(x);
            };
            inputDate.on("change", changeDate);    
            document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
        };
        inputShape.on("change", changeShape);
        document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
    };
    inputCity.on("change", changeCity);

    function changeShape(){
        tbody.text("");
        filters["Shape"] = inputShape.property("value");
        console.log(filters);

        var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Shape == filters["Shape"]);
        console.log(x);

        createTable(x);
        
        function changeDate(){
            tbody.text("");
            filters["Date"] = inputDate.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"]);
            console.log(x);

            createTable(x);

            function changeCity(){
                tbody.text("");
                filters["City"] = inputCity.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"] && sighting.City == filters["City"]);
                console.log(x);

                createTable(x);

                document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
            };
            inputCity.on("change", changeCity);
            document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
        };
        inputDate.on("change", changeDate);  
        
        function changeCity(){
            tbody.text("");
            filters["City"] = inputCity.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Shape == filters["Shape"] && sighting.City == filters["City"]);
            console.log(x);

            createTable(x);

            function changeDate(){
                tbody.text("");
                filters["Date"] = inputDate.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.Shape == filters["Shape"] && sighting.City == filters["City"] && sighting.Date == filters["Date"]);
                console.log(x);

                createTable(x);

                document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
            };
            inputDate.on("change", changeDate);    
            document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen 
        };
        inputCity.on("change", changeCity);
        document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
    };
    inputShape.on("change", changeShape);
    document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
};
inputState.on("change", changeState);

function changeCity(){
    tbody.text("");
    filters["City"] = inputCity.property("value");
    console.log(filters);
    
    var x = sightings.filter(sighting => sighting.City == filters["City"]);
    console.log(x);

    createTable(x);

    function changeShape(){
        tbody.text("");
        filters["Shape"] = inputShape.property("value");
        console.log(filters);
        
        var x = sightings.filter(sighting => sighting.City == filters["City"] && sighting.Shape == filters["Shape"]);
        console.log(x);

        createTable(x);

        function changeDate(){
            tbody.text("");
            filters["Date"] = inputDate.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.City == filters["City"] && sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"]);
            console.log(x);

            createTable(x);

            function changeState(){
                tbody.text("");
                filters["State"] = inputState.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.City == filters["City"] && sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"] && sighting.State == filters["State"]);
                console.log(x);

                createTable(x);

                document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
                
            };
            inputState.on("change", changeState);
            document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
        };
        inputDate.on("change", changeDate);

        function changeState(){
            tbody.text("");
            filters["State"] = inputState.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.City == filters["City"] && sighting.Shape == filters["Shape"] && sighting.State == filters["State"]);
            console.log(x);

            createTable(x);
            
            function changeDate(){
                tbody.text("");
                filters["Date"] = inputDate.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.City == filters["City"] && sighting.Shape == filters["Shape"] && sighting.State == filters["State"] && sighting.Date == filters["Date"]);
                console.log(x);

                createTable(x);
            };
            inputDate.on("change", changeDate);    
            document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
        };
        inputState.on("change", changeState);
        document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
    };
    inputShape.on("change", changeShape);

    function changeDate(){
        tbody.text("");
        filters["Date"] = inputDate.property("value");
        console.log(filters);

        var x = sightings.filter(sighting => sighting.City == filters["City"] && sighting.Date == filters["Date"]);
        console.log(x);

        createTable(x);

        function changeShape(){
            tbody.text("");
            filters["Shape"] = inputShape.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.City == filters["City"] && sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"]);
            console.log(x);

            createTable(x);

            function changeState(){
                tbody.text("");
                filters["State"] = inputState.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.City == filters["City"] && sighting.Date == filters["Date"] && sighting.Shape == filters["Shape"] && sighting.State == filters["State"]);
                console.log(x);

                createTable(x);

                document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
            };
            inputState.on("change", changeState);
        };
        inputShape.on("change", changeShape);  
        document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen  
    };
    inputDate.on("change", changeDate);

    function changeState(){
        tbody.text("");
        filters["State"] = inputState.property("value");
        console.log(filters);

        var x = sightings.filter(sighting => sighting.State == filters["State"] && sighting.City == filters["City"]);
        console.log(x);

        createTable(x);
        
        function changeDate(){
            tbody.text("");
            filters["Date"] = inputState.property("value");
            console.log(filters);

            var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.State == filters["State"] && sighting.City == filters["City"]);
            console.log(x);

            createTable(x);

            function changeShape(){
                tbody.text("");
                filters["Shape"] = inputShape.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Date == filters["Date"] && sighting.State == filters["State"] && sighting.City == filters["City"]  && sighting.Shape == filters["Shape"]);
                console.log(x);

                createTable(x);
            };
            inputShape.on("change", changeShape);
            document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
        };
        inputDate.on("change", changeDate);
        document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
    };
    inputState.on("change", changeState);
    document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
};
inputCity.on("change", changeCity);

function changeShape(){
    tbody.text("");
    filters["Shape"] = inputShape.property("value");
    console.log(filters);
    
    var x = sightings.filter(sighting => sighting.Shape == filters["Shape"]);
    console.log(x);

    createTable(x);

    function changeDate(){
        tbody.text("");
        filters["Date"] = inputDate.property("value");
        console.log(filters);
        
        var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"]);
        console.log(x);

        createTable(x);

        function changeState(){
            tbody.text("");
            filters["State"] = inputState.property("value");
            console.log(filters);
            
            var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"] && sighting.State == filters["State"]);
            console.log(x);

            createTable(x);

            function changeCity(){
                tbody.text("");
                filters["City"] = inputCity.property("value");
                console.log(filters);
        
                var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"] && sighting.City == filters["City"] && sighting.State == filters["State"]);
                console.log(x);

                createTable(x);

                document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
            };
            inputCity.on("change", changeCity);
            document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
        };
        inputState.on("change", changeState);
    
        function changeCity(){
            tbody.text("");
            filters["City"] = inputCity.property("value");
            console.log(filters);
    
            var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"] && sighting.City == filters["City"]);
            console.log(x);

            createTable(x);

            function changeState(){
                tbody.text("");
                filters["State"] = inputState.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"] && sighting.City == filters["City"] && sighting.State == filters["State"]);
                console.log(x);

                createTable(x);

                document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
            };
            inputState.on("change", changeState);    
            document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
        };
        inputCity.on("change", changeCity);
        document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
    };
    inputDate.on("change", changeDate);

    function changeState(){
        tbody.text("");
        filters["State"] = inputState.property("value");
        console.log(filters);
        
        var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.State == filters["State"]);
        console.log(x);

        createTable(x);

        function changeCity(){
            tbody.text("");
            filters["City"] = inputCity.property("value");
            console.log(filters);
    
            var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.City == filters["City"] && sighting.State == filters["State"]);
            console.log(x);

            createTable(x);

            function changeDate(){
                tbody.text("");
                filters["Date"] = inputDate.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.City == filters["City"] && sighting.State == filters["State"] && sighting.Date == filters["Date"]);
                console.log(x);

                createTable(x);

                document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
            };
            inputDate.on("change", changeDate);
            document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
        };
        inputCity.on("change", changeCity);
        document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
    };
    inputState.on("change", changeState);

    function changeCity(){
        tbody.text("");
        filters["City"] = inputCity.property("value");
        console.log(filters);

        var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.City == filters["City"]);
        console.log(x);

        createTable(x);

        function changeDate(){
            tbody.text("");
            filters["Date"] = inputState.property("value");
            console.log(filters);
            
            var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.Date == filters["Date"] && sighting.City == filters["City"]);
            console.log(x);

            createTable(x);

            function changeState(){
                tbody.text("");
                filters["State"] = inputState.property("value");
                console.log(filters);
                
                var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.State == filters["State"] && sighting.City == filters["City"] && sighting.Date == filters["Date"]);
                console.log(x);

                createTable(x);

                document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
            };
            inputState.on("change", changeState); 
            document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
        };
        inputDate.on("change", changeDate); 
        
        function changeState(){
            tbody.text("");
            filters["State"] = inputState.property("value");
            console.log(filters);
            
            var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.State == filters["State"] && sighting.City == filters["City"]);
            console.log(x);

            createTable(x);

            function changeDate(){
                tbody.text("");
                filters["Date"] = inputDate.property("value");
                console.log(filters);

                var x = sightings.filter(sighting => sighting.Shape == filters["Shape"] && sighting.State == filters["State"] && sighting.City == filters["City"] && sighting.Date == filters["Date"]);
                console.log(x);

                createTable(x);

                document.getElementById("date").disabled = true;  // grey out the select field once an option is chosen
            };
            inputDate.on("change", changeDate); 
            document.getElementById("state").disabled = true;  // grey out the select field once an option is chosen
        };
        inputState.on("change", changeState); 
        document.getElementById("city").disabled = true;  // grey out the select field once an option is chosen
    };
    inputCity.on("change", changeCity);
    document.getElementById("shape").disabled = true;  // grey out the select field once an option is chosen
};
inputShape.on("change", changeShape);


// PLOTTING ATTEMPT
// Count the number of sightings per date, per state, per country, per shape, per city
var dataArr2 = []; // create an empty list
for (var k = 0; k < headers.length; k ++){ // for each header
    var variables2 = [];
    variables2[k] = []; // create an empty list
    sightings.map(function(sighting){ //for each sighting
    variables2[k].push(sighting[headers[k]]); // add the value of each header in the corresponding array (e.g., date values in the date array)
    })
    dataArr2.push(variables2[k]); // add the arrays in one array ready for word counter
}
console.log(dataArr2);

// Create a function that counts the number of each value per key (based on the sightings array)
function wordCount(array){
    word_count = {};
    for (var l = 0; l < array.length; l ++){
        if (word_count[array[l]]){
            word_count[array[l]] += 1;
        } else {
            word_count[array[l]] = 1;
        };
    };
    return word_count;
};

// Use the wordCount function to count the number of sightings based on location, date, and appearance of alien ship
// for each array in dataArr2
var counts = [];

dataArr2.forEach(function(array){
    counts.push(wordCount(array));
});

// Create separate arrays of keys and values per object for the following arrays:
// Date (counts[0]), State (counts[2]), Shape (counts[4])
var grpObj = [counts[0], counts[2], counts[4]];

// Create functions that could separate the key-value pairs in each object

function createArrays(obj){
    var keys = [];
    var values = [];
    Object.entries(obj).forEach(function([key,value]){
        keys.push(key);
        values.push(value);
    });
    return [keys, values];
}
// Use the createArrays function to separate the keys and values into arrays
var grpArrays = [];
grpObj.forEach(function(obj){
    grpArrays.push(createArrays(obj));
});

console.log(grpArrays);

// Create a barplot for sighting dates
var trace = {
    x: grpArrays[0][0],
    y: grpArrays[0][1],
    type: "bar"
};

var data = [trace];

var layout = {
    title: "Sightings on different dates",
    xaxis: {title: "Date"},
    yaxis: {title: "Number of sightings"}
}

Plotly.newPlot("bar-plot1", data, layout, {responsive: true});

// Create a barplot for states where sightings happened
var trace = {
    x: grpArrays[1][0],
    y: grpArrays[1][1],
    type: "bar"
};

var data = [trace];

var layout = {
    title: "Frequency of alien sightings in different states",
    xaxis: {title: "State"},
    yaxis: {title: "Number of sightings"}
}

Plotly.newPlot("bar-plot2", data, layout, {responsive: true});

// Create a barplot for sighting shapes
var trace = {
    x: grpArrays[2][0],
    y: grpArrays[2][1],
    type: "bar"
};

var data = [trace];

var layout = {
    title: "Frequency of different descriptions of alien ships sighted",
    xaxis: {title: "Appearance"},
    yaxis: {title: "Number of sightings"}
}

Plotly.newPlot("bar-plot3", data, layout, {responsive: true});