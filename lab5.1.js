function init() {

    var w = 500;
    var h = 250;

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
                .attr("width", w)   //total length
                .attr("height", h) //total height
                .style("background-color", "powderblue");

    d3.select("#update")
    .on("click", function() {
        //alert("Hey, the button works!")
        // Store the length of the existing dataset array in numValues
        var numValues = dataset.length;
        var maxValue = 30;

        dataset = [];
        // Generate new random numbers to refill the dataset
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            // Add the newly generated random number to the dataset
            dataset.push(newNumber); 
        }

        svg.selectAll("rect")
           .data(dataset)
           .attr("x", function(d, i) {                
               return xScale(i);
           })
           // Set the 'y' attribute of the elements (e.g., rectangles) using a function
           .attr("y", function(d) {
            // Calculate the y-position of the element by subtracting its height (yScale(d)) from the total height (h)
               return h - yScale(d);
           })
           .attr("width", xScale.bandwidth())
           .attr("height", function(d) {
            // Determine the height of the element based on its data value using yScale
               return yScale(d);
           })
           .attr("fill", function(d) {
               return "rgb(150, 0, " + (d * 10) + ")";
           });

        svg.selectAll("text")
           .data(dataset)
           .text(function(d) {
               return d;
           })
           .attr("x", function(d, i) {
               return xScale(i) + xScale.bandwidth() / 2;
           })
           .attr("y", function(d) {
               return h - yScale(d) + 14;
           })
           .attr("fill", "white")
           .attr("text-anchor", "middle");
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

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return h - yScale(d) + 14;
        })
        .attr("fill", "white")
        .attr("text-anchor", "middle");
}

window.onload = init;