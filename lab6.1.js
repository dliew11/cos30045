function init() {

    var w = 600;
    var h = 300;
    var maxValue = 30;

    var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6,21, 28];
   
    var xScale = d3.scaleBand()
                   .domain(d3.range(dataset.length))
                   .rangeRound([0, w])
                   .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset)])
                   .range([0, h]);

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var registerMouseovers = function() {
        svg.selectAll("rect")
           .on("mouseover", function(event, d) {
    // Get the 'x' position of the currently selected element and convert it to a float
            var xPosition = parseFloat(d3.select(this).attr("x"));
            // Get the 'y' position of the currently selected element and convert it to a float
            var yPosition = parseFloat(d3.select(this).attr("y"));

               d3.select(this)
                 .transition()
                 .delay(50)
                 .attr("fill", "orange");
    // Append a new 'text' element to the SVG container
               svg.append("text")
                // Set the 'id' attribute to 'tooltip' so it can be styled or selected later
                  .attr("id", "tooltip")
                   // Set the 'x' position of the text element relative to xPosition
                  .attr("x", xPosition + (xScale.bandwidth() / 2) - 7)
                  // Set the 'y' position of the text element slightly above yPosition
                  .attr("y", yPosition - 5)
                  // Set the text content of the tooltip to the data value 'd'
                  .text(d)
                  .attr("fill","black");
           })
           // Set up an event listener for the 'mouseout' event on the selected elements
           .on("mouseout", function(event, d) {
            // Select the element that triggered the 'mouseout' event 
               d3.select(this)               
                 .transition()
                 .delay(250)
                 .attr("fill", "rgb(150, 0, " + (d * 10) + ")");
    
               d3.select("#tooltip")
                 .remove()
           })           
        
        }
    registerMouseovers();

    //Add
    d3.select("#add")
    .on("click", function() {        
    
        var newNumber = Math.floor(Math.random() * maxValue);
        dataset.push(newNumber); 
        
        var bars = svg.selectAll("rect").data(dataset);
        var labels = svg.selectAll("text").data(dataset);
        xScale.domain(d3.range(dataset.length));

        bars.enter()
            .append("rect")
            .attr("x", w)
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .merge(bars)
            .transition()
            .duration(500)
            .attr("x", function(d, i) {  
                return xScale(i);
            })
            .attr("y", function(d) {
                return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("fill", function(d) {
                return "rgb(150, 0, " + (d * 10) + ")";
            });

        registerMouseovers();              
    });

    //Remove
    d3.select("#remove")
    .on("click", function() {
        dataset.shift(); //removes first element (left)
        // dataset.pop(); //removes last element (right)

        var bars = svg.selectAll("rect").data(dataset);
        var labels = svg.selectAll("text").data(dataset);
        xScale.domain(d3.range(dataset.length));

        bars.exit()
            .transition()
            .duration(500)
            .attr("x", w)
            .remove("x", w)

        bars.transition()
            .delay(500)
            .attr("x", function(d, i) {
            return xScale(i);
            }) 
            .attr("y", function(d) {
            return h - yScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return yScale(d);
            })
            .attr("fill", function(d) {
                return "rgb(150, 0, " + (d * 10) + ")";
            });      

        labels.exit()
              .transition()
              .duration(500)
              .attr("x", w)
              .remove()

        labels.transition()
              .delay(500)
              .text(function(d) {
                  return d;
              })
              .attr("x", function(d, i) {
                  return xScale(i) + xScale.bandwidth() / 2;
              })
              .attr("y", function(d) {
                  return h - yScale(d) + 14;
              })
              .attr("text-anchor", "middle")
              .attr("fill", "white");
        
        registerMouseovers(); 
    });

    svg.selectAll("rect")
        .data(dataset)
        .enter()            
        .append("rect")
        .attr("x", function(d, i) {                
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", function(d) {
            return "rgb(150, 0, " + (d * 10) + ")";
        });

    
    registerMouseovers();
}

window.onload = init;