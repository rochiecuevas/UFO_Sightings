# Aliens Among Us
**Aliens Among Us** is the product of converting the [UFO Sightings](https://github.com/rochiecuevas/UFO_Sightings/blob/master/data.js) dataset, which is presented as an array of objects, into a HTML table through the use of [d3.js](https://d3js.org/) and plotting the data into bar graphs using [plotly.js](https://plot.ly/javascript/). 

The table is filterable based on date, country, state, city, and alien ship shape. Hovering over the graphs show the number of sightings. These visualisations allow one to develop insights about the UFO sightings eyewitnesses have reported in the first half of January 2010.
    
There are three files containing the codes used in creating the page:
1. [index.html](https://github.com/rochiecuevas/UFO_Sightings/blob/master/index.html): the table containing UFO sightings. It has been made viewable for big screens, mobile phones, and tablets.
1. [app.js](https://github.com/rochiecuevas/UFO_Sightings/blob/master/app.js): the code used to put the data provided (as a list of dictionaries; in Javascript referred to as an array of objects) into tables and to create bar charts.
1. [main.css](https://github.com/rochiecuevas/UFO_Sightings/blob/master/main.css): the customised styles that were not included in Bootstrap CSS.

Head over to the repository's [wiki](https://github.com/rochiecuevas/UFO_Sightings/wiki) section to see the detailed description of the code used in generating the final output.

The final product (index.html) consists of three sections:

|Section|Screenshot|
|---|---|
|hero|![hero landing page](https://github.com/rochiecuevas/UFO_Sightings/blob/master/Screenshots/index-screenshot.png)|
|table|![table](https://github.com/rochiecuevas/UFO_Sightings/blob/master/Screenshots/filter-date-table.png)|
|graphs|![graph](https://github.com/rochiecuevas/UFO_Sightings/blob/master/Screenshots/graph-screenshot.png)|

## Insights:
The graphs revealed that the highest number of UFO sightings occurred on January 1st; that these sightings were mostly described as light; and they were mostly seen in California. These pieces of information suggest that many UFO spotters most likely mistook distant fireworks (as people ushered in the New Year) as alien space ships. 

Why were sightings mostly reported in California?

There are two factors that might have led to the high reporting in the state: population and clear nighttime skies. Among US states, California had the [highest population in 2010](https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States_by_population) and has the [second highest number of clear days in a year](https://www.currentresults.com/Weather/US/average-annual-state-sunshine.php). It's possible that there were just more people spending more time outdoors at night, looking up into the heavens.
