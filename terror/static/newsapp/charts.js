nv.addGraph(function() {
    var chart = nv.models.lineChart()
        .margin({
            left: 100
        }) //Adjust chart margins to give the x-axis some breathing room.
        .useInteractiveGuideline(true) //We want nice looking tooltips and a guideline!
        .showLegend(true) //Show the legend, allowing users to turn on/off line series.
        .showYAxis(true) //Show the y-axis
        .showXAxis(true) //Show the x-axis
    ;
    chart.xAxis //Chart x-axis settings
        .axisLabel('Years')
        .tickFormat(d3.format('r'));
    chart.yAxis //Chart y-axis settings
        .axisLabel('Number of Attacks')
        .tickFormat(d3.format('r'));
    d3.select('#chart2 svg') //Select the <svg> element you want to render the chart in.
        .datum(CountryAttacks())
        .call(chart); //Finally, render the chart!
    //Update the chart when window resizes.
    nv.utils.windowResize(function() {
        chart.update()
    });
    return chart;
});

function CountryAttacks() {
    var attacksdata = []
    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < data_country.length; i++) {
        country = data_country[i].country_txt
        x = data_country[i].iyear
        y = data_country[i]["Number of attacks"]
        var countryGroups = country
        if (!attacksdata[countryGroups]) {
            attacksdata[countryGroups] = [];
        }
        attacksdata[countryGroups].push({
            x,
            y
        });
    }
    nvd3array = []
    for (var countryGroups in attacksdata) {
        nvd3array.push({
            values: attacksdata[countryGroups],
            key: countryGroups
        })
    }
    // console.log(nvd3array)
    // var jsonString = JSON.stringify(nvd3array)
    // console.log(jsonString)
    return nvd3array
}

// d3.json('/static/newsapp/stackedAreaData.json', function(data) {
        nv.addGraph(function() {
            var chart = nv.models.stackedAreaChart()
                .margin({
                    right: 100
                })
                .x(function(d) {
                    return d[0]
                }) //We can modify the data accessor functions...
                .y(function(d) {
                    return d[1]
                }) //...in case your data is formatted differently.
                .useInteractiveGuideline(true) //Tooltips which show all data points. Very nice!
                .rightAlignYAxis(true) //Let's move the y-axis to the right side.
                .showControls(true) //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                .clipEdge(true);

            //Format x-axis labels with custom function.
            chart.xAxis
                .tickFormat(function(d) {
                    return d3.time.format('%x')(new Date(d))
                });

            chart.yAxis
                .tickFormat(d3.format('r'));

            d3.select('#chart1 svg')
                .datum(AttacksAreaC())
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        });
// });
