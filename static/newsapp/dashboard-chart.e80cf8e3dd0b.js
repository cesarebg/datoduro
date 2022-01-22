var button = document.getElementById("country")
button.addEventListener('change', function() {
  var country_name = button.value;
  var attacks = [];
  var years = [];
  var years2 = [];
  var years3 = [];
  var num_attacks = [];
  var injured = [];
  var num_injured = [];
  var killed = [];
  var num_killed = [];
  var nvd3arrayArea = []
  for (var prop in data_country) {
    if(data_country.hasOwnProperty(prop)) {
      country = data_country[prop].country_txt;
      if(country === country_name){
        x = data_country[prop].iyear;

        if (years.indexOf(data_country[prop].iyear) === -1) {
            years.push(data_country[prop].iyear);
        }
        y = data_country[prop]["Number of attacks"]
        num_attacks.push(y);
        var countryGroups = country
        if (!attacks[countryGroups]) {
            attacks[countryGroups] = [];
        }
        attacks[countryGroups].push([x, y]);
      }
    }
  }
  for (var countryGroups in attacks) {
      nvd3arrayArea.push({
          key: "Attacks",
          values: attacks[countryGroups],
      })
  }
  for (var prop in data_country) {
    if(data_country.hasOwnProperty(prop)) {
      country2 = data_country[prop].country_txt;

      if(country2 === country_name){
        x = data_country[prop].iyear;

        if (years2.indexOf(data_country[prop].iyear) === -1) {
            years2.push(data_country[prop].iyear);
        }
        y = data_country[prop]["Injured"]
        num_injured.push(y);
        var countryGroups2 = country2
        if (!injured[countryGroups2]) {
            injured[countryGroups2] = [];
        }
        injured[countryGroups2].push([x, y]);
      }
    }
  }
  for (var countryGroups2 in injured) {
      nvd3arrayArea.push({
          key: "Injured",
          values: injured[countryGroups2],
      });
    }
  for (var prop in data_country) {
    if(data_country.hasOwnProperty(prop)) {
      country3 = data_country[prop].country_txt;

      if(country3 === country_name){
        x = data_country[prop].iyear;

        if (years3.indexOf(data_country[prop].iyear) === -1) {
            years3.push(data_country[prop].iyear);
        }
        y = data_country[prop]["Killed"]
        num_killed.push(y);
        var countryGroups3 = country3
        if (!killed[countryGroups3]) {
            killed[countryGroups3] = [];
        }
        killed[countryGroups3].push([x, y]);
      }
    }
  }
  for (var countryGroups3 in killed) {
      nvd3arrayArea.push({
          key: "Killed",
          values: killed[countryGroups3],
      });
    }
  drawCountryGraph(nvd3arrayArea);
  // getting the sum of number of attacks
  var total_attacks = num_attacks.reduce((a, b) => a + b, 0);
  var total_injured = num_injured.reduce((a, b) => a + b, 0);
  var total_killed = num_killed.reduce((a, b) => a + b, 0);
  // getting the div for text
  var div = document.getElementById('text-chart5');
  var div_headline = document.getElementById('headline');
  // delete previous text
  div.innerHTML = " ";
  div_headline.innerHTML = " "
  // getting the tex
  text_headline = document.createTextNode(country_name + ", the attacks and their victims");
  text = document.createTextNode("From 1994 to 2015, " + country_name + " registered a total of " + total_attacks + " violent attacks related to terrorism. " + "In that same period, the attacks in " + country_name + " killed " + total_killed + " people and injured " + total_injured);
  // append to paragraph
  var paragraph = document.createElement('p');
  var headline = document.createElement('p')
  paragraph.appendChild(text);
  headline.appendChild(text_headline);
  // console.log(paragraph);
  // adding the paragraph to text
  div_headline.appendChild(headline);
  div.appendChild(paragraph);
});

function drawCountryGraph(country_data) {
  nv.addGraph(function() {
      var chart = nv.models.multiBarChart()
          .margin({
              right: 100
          })
          .x(function(d) {
              return d[0]
          }) //We can modify the data accessor functions...
          .y(function(d) {
              return d[1]
          }) //...in case your data is formatted differently.
          .useInteractiveGuideline(false) //Tooltips which show all data points. Very nice!
          .rightAlignYAxis(true) //Let's move the y-axis to the right side.
          .showControls(true) //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
          .clipEdge(true);

      //Format x-axis labels with custom function.
      chart.xAxis
          .axisLabel('Years')
          .tickFormat(d3.format('r'));

      chart.yAxis
          .axisLabel('Number of Attacks')
          .tickFormat(d3.format('r'));

      d3.select('#chart5 svg')
          .datum(country_data)
          .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
  });
}

var country_name = button.value;
var attacks = [];
var years = [];
var years2 = [];
var years3 = [];
var num_attacks = [];
var injured = [];
var num_injured = [];
var killed = [];
var num_killed = [];
var nvd3arrayArea2 = []

for (var prop in all_regions_map) {
  if(all_regions_map.hasOwnProperty(prop)) {
    country = all_regions_map[prop].Region;
    x = all_regions_map[prop].iyear;
    if (years.indexOf(all_regions_map[prop].iyear) === -1) {
      years.push(all_regions_map[prop].iyear);
    }
    y = all_regions_map[prop]["Number of attacks"]
    num_attacks.push(y);
    var countryGroups = country
    if (!attacks[countryGroups]) {
      attacks[countryGroups] = [];
    }
    attacks[countryGroups].push([x, y]);
  }
}
for (var countryGroups in attacks) {
    nvd3arrayArea2.push({
        key: "Attacks",
        values: attacks[countryGroups],
    })
}
for (var prop in all_regions_map) {
  if(all_regions_map.hasOwnProperty(prop)) {
    country2 = all_regions_map[prop].Region
    x = all_regions_map[prop].iyear;
    if (years2.indexOf(all_regions_map[prop].iyear) === -1) {
      years2.push(all_regions_map[prop].iyear);
    }
    y = all_regions_map[prop]["Injured"]
    num_injured.push(y);
    var countryGroups2 = country2
    if (!injured[countryGroups2]) {
      injured[countryGroups2] = [];
    }
    injured[countryGroups2].push([x, y]);
  }
}
for (var countryGroups2 in injured) {
    nvd3arrayArea2.push({
        key: "Injured",
        values: injured[countryGroups2],
    });
  }
for (var prop in all_regions_map) {
  if(all_regions_map.hasOwnProperty(prop)) {
    country3 = all_regions_map[prop].country_txt;
    x = all_regions_map[prop].iyear;

    if (years3.indexOf(all_regions_map[prop].iyear) === -1) {
      years3.push(all_regions_map[prop].iyear);
    }
    y = all_regions_map[prop]["Killed"]
    num_killed.push(y);
    var countryGroups3 = country3
    if (!killed[countryGroups3]) {
      killed[countryGroups3] = [];
    }
    killed[countryGroups3].push([x, y]);
  }
}
for (var countryGroups3 in killed) {
    nvd3arrayArea2.push({
        key: "Killed",
        values: killed[countryGroups3],
    });
  }
drawCountryGraph2(nvd3arrayArea2);

var total_attacks = num_attacks.reduce((a, b) => a + b, 0);
var total_injured = num_injured.reduce((a, b) => a + b, 0);
var total_killed = num_killed.reduce((a, b) => a + b, 0);
// getting the div for text
var div = document.getElementById('text-chart5');
var div_headline = document.getElementById('headline');
// delete previous text
div.innerHTML = " ";
div_headline.innerHTML = " "
// getting the tex
text_headline = document.createTextNode("The attacks and their victims");
text = document.createTextNode("From 1994 to 2015, all regions analyzed, that is, Western Europe, Middle East and South Asia registered a total of " + total_attacks + " violent attacks related to terrorism. " + "In that same period, the attacks in " + country_name + " killed " + total_killed + " people and injured " + total_injured);
// append to paragraph
var paragraph = document.createElement('p');
var headline = document.createElement('p')
paragraph.appendChild(text);
headline.appendChild(text_headline);
// console.log(paragraph);
// adding the paragraph to text
div_headline.appendChild(headline);
div.appendChild(paragraph);

function drawCountryGraph2(country_data2) {
  nv.addGraph(function() {
      var chart = nv.models.multiBarChart()
          .margin({
              right: 100
          })
          .x(function(d) {
              return d[0]
          }) //We can modify the data accessor functions...
          .y(function(d) {
              return d[1]
          }) //...in case your data is formatted differently.
          .useInteractiveGuideline(false) //Tooltips which show all data points. Very nice!
          .rightAlignYAxis(true) //Let's move the y-axis to the right side.
          .showControls(true) //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
          .clipEdge(true);

      //Format x-axis labels with custom function.
      chart.xAxis
          .axisLabel('Years')
          .tickFormat(d3.format('r'));

      chart.yAxis
          .axisLabel('Number of Attacks')
          .tickFormat(d3.format('r'));

      d3.select('#chart5 svg')
          .datum(country_data2)
          .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
  });
}
