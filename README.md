# Aliens Among Us
**Aliens Among Us** is the product of converting the [UFO Sightings](https://github.com/rochiecuevas/UFO_Sightings/blob/master/data.js) dataset, which is presented as an array of objects, into a HTML table through the use of [d3.js](https://d3js.org/) and plotting the data into bar graphs using [plotly.js](https://plot.ly/javascript/). 

The table is filterable based on date, country, state, city, and alien ship shape (in that order). Hovering over the graphs show the number of sightings. These visualisations allow one to develop insights about the UFO sightings eyewitnesses have reported in the first half of January 2010.
    
There are three files containing the codes used in creating the page:
1. [index.html](https://github.com/rochiecuevas/UFO_Sightings/blob/master/index.html): the table containing UFO sightings. It has been made viewable for big screens, mobile phones, and tablets.
1. [app.js](https://github.com/rochiecuevas/UFO_Sightings/blob/master/app.js): the code used to put the data provided (as a list of dictionaries; in Javascript referred to as an array of objects) into tables and to create bar charts.
1. [main.css](https://github.com/rochiecuevas/UFO_Sightings/blob/master/main.css): the customised styles that were not included in Bootstrap CSS.

Head over to the repository's [wiki](https://github.com/rochiecuevas/UFO_Sightings/wiki) section to see the detailed description of the code used in generating the final output.

The final product (index.html) consists of three sections:

|Section|Screenshot|
|---|---|
|hero|![alt text](https://github.com/rochiecuevas/UFO_Sightings/blob/master/index-screenshot.png)|
|table|![alt text](https://github.com/rochiecuevas/UFO_Sightings/blob/master/filter-date-table.png)|
|graphs|![alt text](https://github.com/rochiecuevas/UFO_Sightings/blob/master/graph-screenshot.png)|

