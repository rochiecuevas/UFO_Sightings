 #  ![alt text](https://github.com/rochiecuevas/UFO_Sightings/blob/master/index-screenshot.png)

 *Hero image from [New York Post](https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwid1ovmsajfAhUObawKHWynDIQQjRx6BAgBEAU&url=https%3A%2F%2Fnypost.com%2F2017%2F08%2F01%2Fnasa-job-opening-to-protect-earth-from-aliens-has-6-figure-salary%2F&psig=AOvVaw2HH0a8zzg-bB5in8NPUvyO&ust=1545188480247086)*
 ## Abstract

 ## Introduction
 ## Method
 
 ### Output Files
 1. __[index.html](https://github.com/rochiecuevas/UFO_Sightings/blob/master/index.html)__: the table containing UFO sightings. It has been made viewable for big screens, mobile phones, and tablets.

 2. __[main.css](https://github.com/rochiecuevas/UFO_Sightings/blob/master/main.css)__: the customised styles that were not included in Bootstrap CSS.

 3. __[app.js](https://github.com/rochiecuevas/UFO_Sightings/blob/master/app.js)__: the code used to put the data provided (as a list of dictionaries; in Javascript referred to as an array of objects) into tables and to create bar charts.

### Preliminaries
 In the __index.html__ file, the header section contains links to the CSS stylesheets and to the Javascript libraries for [d3.js](https://d3js.org/) and [plotly.js](https://plot.ly/javascript/). Just before the closing `</body>` tag, links to the [UFO Sightings data](https://github.com/rochiecuevas/UFO_Sightings/blob/master/data.js) and to the [app.js](https://github.com/rochiecuevas/UFO_Sightings/blob/master/app.js) were included. 

 #### Sections
 `index.html` is divided into three visually distinct sections referred to by their id's("hero", "data-table", and "data-graphs"). 

 __#hero__ serves as the landing page. The title was assigned to the h1 HTML tag while text directly below the title was assigned to the paragraph HTML tag.

 ```html
 <h1>Aliens Among Us</h1>
<br>
<p>They want to keep the truth hidden. But we <i>know</i> the truth: Aliens are here.</p>
<p><b>Aliens-R-Real</b> presents eyewitness testimonials.</p>
<p>Let the truth set you free.</p>
 ```

 Two links were stylised as buttons that leads to the two other sections. This is indicated by the `href` attribute of the anchor tag.

 ```html
<a href = "#data-table" class = "btn">👀 Testimonials</a>
<a href = "#data-graphs" class = "btn"><span class = "glyphicon glyphicon-stats"></span> Trends</a>
 ```

Formatting the hero section involved adding a hero image to the background in `main.css`. For viewing in screens bigger than 600px, a portrait of an alien obtained from a New York Post article was used. A linear gradient was added to darken the image and allow font written in white to be more readble.

```css
.hero {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("Aliens.jpg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}
```

For smaller screens, an image of a [galaxy](https://thewallpaper.co/wp-content/uploads/2016/09/stars-galaxy-free-download-earth-wallpapers-iphone-wallpapers-astro-amazing-1920x1080.jpg) was used as the hero image instead.

```css
@media screen and (max-width: 600px) {
    .hero {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("Galaxy.jpg"); 
        background-repeat: no-repeat; 
        background-position: center;
        background-size: cover;
    }
```

The __#data-table__ section was set up to contain a row divided into two columns 

Populating the #data-table section with a table that can be filtered required manipulating the data provided in the `app.js` file. First, the new key names were placed in an object.

```js
// Rename the keys in data
var map = {
    datetime: "Date",
    city: "City",
    state: "State",
    country: "Country",
    comments: "Witness' Account",
    shape: "Shape",
    durationMinutes: "Duration"
}
```

Second, a function, "editKey", was defined. This function replaced each original key with the key name in map in an object.

```js
function editKey(obj){
    var replacedItems = Object.keys(obj).map((key) =>{
        var newKey = map[key] || key;
        return{[newKey]:obj[key]};
    });
    var newTab = replacedItems.reduce((a, b) => Object.assign({}, a, b));
    return newTab;
}
```

Third, editKey was iterated through each object in the data array.

```js
var sightings = [];
data.forEach(function(dat){
    sightings.push(editKey(dat));
});
console.log(sightings);
```

Creating the headers for the table was done by getting the keys in the first object in the data array.

```js
var firstSighting = sightings[0];
console.log(firstSighting);

var headers = [];
Object.keys(firstSighting).forEach(key => 
    headers.push(key));
console.log(headers);
```

Lists of unique values per key were generated based on the objects in the sightings array. These lists were for the filter options in the select fields in the html file.

```js
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
```