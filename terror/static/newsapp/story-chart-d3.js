// CHART 1 FN
function region_data() {
    var attacks = []
    var years = [];
    // for (var prop in data_region) {
    //     if (data_region.hasOwnProperty(prop)) {
    //         if (years.indexOf(data_region[prop].iyear) === -1) {
    //             years.push(data_country[prop].iyear);
    //         }
    //     }
    // }
    // console.log(years);
    //Data is represented as an array of {x,y} pairs.
    for (var prop in data_region) {
        if (data_region.hasOwnProperty(prop)) {
            region = data_region[prop].region_txt
            x = data_region[prop].iyear
            if (years.indexOf(data_region[prop].iyear) === -1) {
                years.push(data_region[prop].iyear);
            }
            y = data_region[prop]["Number of attacks"]

            var regionGroups = region
            if (!attacks[regionGroups]) {
                attacks[regionGroups] = [];
            }
            attacks[regionGroups].push([x, y]);
        }
    }

    // for (var i = 0; i < data_region.length; i++) {
    //     region = data_region[prop].region_txt
    //     x = data_region[prop].iyear
    //     if(years.indexOf(data_region[prop].iyear) === -1) {
    //       years.push(data_region[prop].iyear);
    //     }
    //     y = data_region[prop]["Number of attacks"]
    //
    //     var regionGroups = region
    //     if (!attacks[regionGroups]) {
    //         attacks[regionGroups] = [];
    //     }
    //     attacks[regionGroups].push([x, y]);
    // }
    //X
    for (var regionGroups in attacks) {
        for (var j = 0; j < years.length; j++) {
            var found = false;
            for (var k = 0; k < attacks[regionGroups].length; k++) {
                if (attacks[regionGroups][k][0] === years[j]) {
                    found = true;
                }
            }
            if (found === false) {
                // console.log(years[j]);
                attacks[regionGroups].push([years[j], 0]);
            }
        }
    }

    nvd3arrayArea = []
    for (var regionGroups in attacks) {
        nvd3arrayArea.push({
            key: regionGroups,
            values: attacks[regionGroups]
        })
    }
    // console.log(nvd3arrayArea)
    // var jsonString = JSON.stringify(nvd3arrayArea)
    // console.log(jsonString)
    return nvd3arrayArea
}
region_data()

// CHART 1 GRAPH
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
        .axisLabel('Years')
        .tickFormat(d3.format('r'));


    chart.yAxis
        .axisLabel('Number of Attacks')
        .tickFormat(d3.format('r'));

    d3.select('#chart1 svg')
        .datum(region_data())
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});
//CHART 2 FN
function GroupAttacks() {
    var attacks = []
    var years = [];
    for (var prop in data_int) {
        if (data_int.hasOwnProperty(prop)) {
            region = data_int[prop].region_txt
            x = data_int[prop].iyear
            if (years.indexOf(data_int[prop].iyear) === -1) {
                years.push(data_int[prop].iyear);
            }
            y = data_int[prop]["Number of attacks"]

            var regionGroups = region
            if (!attacks[regionGroups]) {
                attacks[regionGroups] = [];
            }
            attacks[regionGroups].push({
                x,
                y
            });
        }
    }
    //X
    // for (var regionGroups in attacks) {
    //     for (var j = 0; j < years.length; j++) {
    //         var found = false;
    //         for (var k = 0; k < attacks[regionGroups].length; k++) {
    //             if (attacks[regionGroups][k][0] === years[j]) {
    //                 found = true;
    //             }
    //         }
    //         if (found === false) {
    //             // console.log(years[j]);
    //             attacks[regionGroups].push([years[j], 0]);
    //         }
    //     }
    // }
    nvd3arrayArea = []
    for (var regionGroups in attacks) {
        nvd3arrayArea.push({
            key: regionGroups,
            values: attacks[regionGroups]
        })
    }
    // nvd3arrayArea.push({
    //     key: "Invasion of Iraq",
    //     values: [{1994,366},[1995,366],[1996,366],[1997,366],[1998,366],[1999,366],[2000,366],[2001,366],[2002,366],[2003,366],[2004,366],[2005,366],[2006,366],[2007,366],[2008,366],[2009,366],[2010,366],[2011,366],[2012,366],[2013,366],[2014,366],[2015,366]]
    // })
    // console.log(nvd3arrayArea)
    // var jsonString = JSON.stringify(nvd3arrayArea)
    // console.log(jsonString)
    return nvd3arrayArea
}
GroupAttacks()
// CHART 2 GRAPH
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
        .datum(GroupAttacks())
        .call(chart); //Finally, render the chart!
    //Update the chart when window resizes.
    nv.utils.windowResize(function() {
        chart.update()
    });
    return chart;
});

// CHART 3 FN
function att_int_west() {
    var attacks = []
    var years = [];
    // for (var prop in int_west) {
    //     if (int_west.hasOwnProperty(prop)) {
    //         if (years.indexOf(int_west[prop].iyear) === -1) {
    //             years.push(data_country[prop].iyear);
    //         }
    //     }
    // }
    // console.log(years);
    //Data is represented as an array of {x,y} pairs.
    for (var prop in int_west) {
        if (int_west.hasOwnProperty(prop)) {
            int_log = int_west[prop].INT_LOG
            x = int_west[prop].iyear
            if (years.indexOf(int_west[prop].iyear) === -1) {
                years.push(int_west[prop].iyear);
            }
            y = int_west[prop]["Number of attacks"]

            var IntGroups = int_log
            if (!attacks[IntGroups]) {
                attacks[IntGroups] = [];
            }
            attacks[IntGroups].push([x, y]);
        }
    }
    // for (var i = 0; i < int_west.length; i++) {
    //     region = int_west[prop].region_txt
    //     x = int_west[prop].iyear
    //     if(years.indexOf(int_west[prop].iyear) === -1) {
    //       years.push(int_west[prop].iyear);
    //     }
    //     y = int_west[prop]["Number of attacks"]
    //
    //     var regionGroups = region
    //     if (!attacks[regionGroups]) {
    //         attacks[regionGroups] = [];
    //     }
    //     attacks[regionGroups].push([x, y]);
    // }

    //X
    for (var IntGroups in attacks) {
        for (var j = 0; j < years.length; j++) {
            var found = false;
            for (var k = 0; k < attacks[IntGroups].length; k++) {
                if (attacks[IntGroups][k][0] === years[j]) {
                    found = true;
                }
            }
            if (found === false) {
                // console.log(years[j]);
                attacks[IntGroups].push([years[j], 0]);
            }
        }
    }
    labels = {
      "0": "Domestic",
      "1": "Foreign",
      "-9": "Unknown"
    };

    nvd3arrayArea = []
    for (var IntGroups in attacks) {
        nvd3arrayArea.push({
            key: labels["" + IntGroups],
            values: attacks[IntGroups]
        })
    }

    console.log(nvd3arrayArea)
    var jsonString = JSON.stringify(nvd3arrayArea)
    console.log(jsonString)
    return nvd3arrayArea
}
att_int_west()
// CHART 3 GRAPH
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
        .axisLabel('Years')
        .tickFormat(d3.format('r'));
    chart.yAxis
        .axisLabel('Number of Attacks')
        .tickFormat(d3.format('r'));
    d3.select('#chart3 svg')
        .datum(att_int_west())
        .call(chart);
    nv.utils.windowResize(chart.update);
    return chart;
});

// CHART 4 GRAPH

function aid_data_DAC() {
    var value_GNI = []
    var years = [];
    for (var prop in aid_data) {
        if (aid_data.hasOwnProperty(prop)) {
            countries = aid_data[prop].LOCATION
            x = aid_data[prop].TIME
            if (years.indexOf(aid_data[prop].TIME) === -1) {
                years.push(aid_data[prop].TIME);
            }
            y = aid_data[prop].Value

            var countryGroups = countries
            if (!value_GNI[countryGroups]) {
                value_GNI[countryGroups] = [];
            }
            value_GNI[countryGroups].push({
                x,
                y
            });
        }
    }
    //X
    // for (var countryGroups in value_GNI) {
    //     for (var j = 0; j < years.length; j++) {
    //         var found = false;
    //         for (var k = 0; k < value_GNI[countryGroups].length; k++) {
    //             if (value_GNI[countryGroups][k][0] === years[j]) {
    //                 found = true;
    //             }
    //         }
    //         if (found === false) {
    //             // console.log(years[j]);
    //             value_GNI[countryGroups].push([years[j], 0]);
    //         }
    //     }
    // }
    nvd3arrayArea = []
    for (var countryGroups in value_GNI) {
        nvd3arrayArea.push({
            key: countryGroups,
            values: value_GNI[countryGroups]
        })
    }
    // console.log(nvd3arrayArea)
    // var jsonString = JSON.stringify(nvd3arrayArea)
    // console.log(jsonString)
    return nvd3arrayArea
}

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
        .axisLabel('Percentage of Gross National Income')
        .tickFormat(d3.format('r'));
    d3.select('#chart4 svg') //Select the <svg> element you want to render the chart in.
        .datum(aid_data_DAC())
        .call(chart); //Finally, render the chart!
    //Update the chart when window resizes.
    nv.utils.windowResize(function() {
        chart.update()
    });
    return chart;
});
