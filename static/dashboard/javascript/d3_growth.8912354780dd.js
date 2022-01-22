var margin = {
  top: 50,
  left: 60,
  right: 30,
  bottom: 50,
};

var width = 500;
var height = 400;

var svg_gdp = d3.select('#vis_gdp')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

svg_gdp.append("linearGradient")
  .attr("id", "line-gradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", 0).attr("y1", "0%")
  .attr("x2", 0).attr("y2", "100%")
  .selectAll("stop")
  .data([{
      offset: "0%",
      color: "red"
    },
    {
      offset: "60%",
      color: "skyblue"
    },
    {
      offset: "100%",
      color: "skyblue"
    }
  ])
  .enter().append("stop")
  .attr("offset", function(d) {
    return d.offset;
  })
  .attr("stop-color", function(d) {
    return d.color;
  });

var tooltip = d3.select('body')
  .append('div')
  .attr('class', 'tooltip');

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var dateParse = d3.timeParse('%Y');
var tooltipFormat = d3.timeFormat('%Y');


var x = d3.scaleTime()
  .range([0, width]);

var y = d3.scaleLinear()
  .domain(d3.extent(growth, function(d) {
    return parseFloat(d.value);
  }))
  .range([height, 0]);

var x_axis = d3.axisBottom(x)
var y_axis = d3.axisLeft(y)

svg_gdp.append('g')
  .attr('transform', 'translate(0,' + height + ')')
  .attr('class', 'x axis');

// Labels
svg_gdp.append("text")
  .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top) + ")")
  .style("text-anchor", "middle")
  .text("Year");

svg_gdp.append('g')
  .attr('class', 'y axis')

// y label
svg_gdp.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 10 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("growth %");

svg_gdp.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .text("Prices spiked after the Brexit referendum");

function make_x_gridlines() {
  return d3.axisBottom(x)
    .ticks(0);
}

function make_y_gridlines() {
  return d3.axisLeft(y)
    .ticks(10);
}

// add the X gridlines
svg_gdp.append("g")
  .attr("class", "grid")
  .attr("transform", "translate(0," + height + ")")
  .call(make_x_gridlines()
    .tickSize(-height)
    .tickFormat("")
  );
// add the Y gridlines
svg_gdp.append("g")
  .attr("class", "grid")
  .call(make_y_gridlines()
    .tickSize(-width)
    .tickFormat("")
  );

// function expenditure_pounds() {

x.domain(d3.extent(growth, function(d) {
  return dateParse(d.year);
}));

var line = d3.line()
  .curve(d3.curveCatmullRom)
  .x(function(d) {
    return x(dateParse(d.year));
  })
  .y(function(d) {
    return y(d.value);
  });

var lines = svg_gdp.selectAll('.line')
  .remove()
  .exit()
  .data([growth]);
console.log(lines)

lines
  .enter()
  .append('path')
  .attr('class', 'line')
  .attr('fill', 'none')
  // .attr('stroke', 'steelblue')
  .attr('d', line);

var points = svg_gdp.selectAll('.point')
  .remove()
  .exit()
  .data(growth);

points
  .enter()
  .append('circle')
  .attr('class', 'point')
  .attr('r', 3)
  .attr('cx', function(growth) {
    return x(dateParse(growth.year));
  })
  .attr('cy', function(growth) {
    return y(growth.value);
  })
  .attr('fill', 'black')
  .attr('opacity', 1)
  .on('mouseover', mouseOver)
  .on('mousemove', mouseMove)
  .on('mouseout', mouseOut);

svg_gdp.select('.x.axis')
  .call(x_axis)
  .selectAll('text')
  .attr('transform', 'rotate(30)')
  .attr('y', '10')
  .attr('x', '0')
  .style("text-anchor", "start");

svg_gdp.select('.y.axis')
  .call(y_axis)

function mouseOver(d) {
  var date = dateParse(d.year);
  var displayDate = tooltipFormat(date)
  var value_function = d.value;

  d3.select(this)
    .transition()
    .style('opacity', 1);

  tooltip
    .style('display', null)
    .html('<p>UK growth was ' + value_function + ' in ' + displayDate + '</p>');
}

function mouseMove(d) {
  tooltip
    .style('top', (d3.event.pageY - 20) + "px")
    .style('left', (d3.event.pageX + 20) + "px");
}

function mouseOut(d) {
  d3.select(this)
    .transition()
    .style('opacity', 1);

  tooltip
    .style('display', 'none');

}
