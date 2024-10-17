function init(){
    var w = 300;
    var h = 300;

    var dataset = [ 11, 10, 50, 35, 16, 23];
    
    var outerRadius = w / 2;
    var innerRadius = 30;
    var arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);
    var pie = d3.pie();
   
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    
   //Create SVG element
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    //Set up groups
    var arcs = svg.selectAll("g.arc")
                  .data(pie(dataset))
                  .enter()
                  .append("g")
                  .attr("class", "arc")
                  .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

    //Draw arc paths
        arcs.append("path")
            .attr("fill", function(d, i) {
                return color(i);
            })
            .attr("d", function(d,i){
                return arc(d,i);
            });

   

        arcs.append("text")
            .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .attr("fill","white")
            .text(function(d) {
            return d.value;
            }); 

   
}
window.onload = init;