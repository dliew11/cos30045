function init(){
    var w = 500;
    var h = 300;
    var xpadding = 60;
    var ypadding = 20;
    var dataset = [ 
        { apples: 5, oranges: 10, grapes: 22 }, 
        { apples: 4, oranges: 12, grapes: 28 }, 
        { apples: 2, oranges: 19, grapes: 32 }, 
        { apples: 7, oranges: 23, grapes: 35 }, 
        { apples: 23, oranges: 17, grapes: 43 } 
    ]; 
    var xAxis, yAxis;
    
    var stack = d3.stack()
                  .keys([ "apples", "oranges", "grapes" ])
                  .order(d3.stackOrderDescending);
    
    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset, function(d) {
                        return d.apples + d.oranges + d.grapes;
                   })])
                   .range([h - ypadding, 0]);
    
    var xScale = d3.scaleBand()
                  .domain(d3.range(dataset.length))
                  .range([xpadding, w])
                  .paddingInner(0.05);
    
    //Data, stacked
    var series = stack(dataset);
    
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    
    //Create SVG element
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
    
    // Add a group for each row of data
    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function(d, i) {
                        return color(i);
                    });
    
    // Add a rect for each data value
    var rects = groups.selectAll("rect")
                      .data(function(d) { return d; })
                      .enter()
                      .append("rect")
                      .attr("x", function(d, i) {
                            return xScale(i);
                         })
                      .attr("y", function(d) {
                            return yScale(d[1]);
                         })
                      .attr("height", function(d) {
                            return yScale(d[0]) - yScale(d[1]);
                         })
                      .attr("width", xScale.bandwidth());
    

}window.onload = init;