function init() {
    var w = 600;
    var h = 300;
  
    // Set up the map projection (Mercator)
    var projection = d3.geoMercator()
      .center([145, -36.5])
      .translate([w / 2, h / 2])
      .scale(2450);
  
    // Define the path generator using the projection
    var path = d3.geoPath().projection(projection);
  
    // Create the SVG container
    var svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "grey");
  
    // Load and draw the map using GeoJSON data
    d3.json("LGA_VIC.json").then(function (json) {
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path);
    });
  }
  
  // Ensure the function runs when the page loads
  window.onload = init;