function myFunc(){
    var p = document.getElementById("navbar")
    var content = document.createTextNode("hi!")
    p.appendChild(content);
}

function homeEle(){
    d3.select("#main").selectAll("*").remove();
    var svg = d3.select("#main");
    var g = svg.append("g").attr("id","item1");
    var text = g.append("text")
                .attr("x","50%").attr("y","50%")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle")
                .style("inline-size","50px");
    text.append("tspan")
        .style("font-size","200%")
        .text("Hi!");
    text.append("tspan")
        .attr("x","50%").attr("y","55%")
        .style("font-size","200%")
        .style("text-align","center")
        .text("I'm Manikandan Lapasi!");
    text.append("tspan")
        .attr("x","50%").attr("y","60%")
        .style("text-align","center")
        .text("I dabble in software development, and make a living out of it!");
}

function skillsEle(){
    d3.select("#main").selectAll("*").remove();
    var svg = d3.select("#main");
    var g = svg.append("g").attr("id","item1")
            .attr("width","400")
            .attr("height","300");
    var text = g.append("text")
                .attr("x","50%").attr("y","50%")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle")
                .style("inline-size","50px");
    text.append("tspan")
        .style("font-size","200%")
        .text("Skillz!");

    var skills = [
        {id:"python", value: 5},{id:"C++", value: 3},{id:"erlang", value: 2}
    ];

    // set up colour scale
    const fillColour = d3.scaleOrdinal()
    .domain(["1", "2", "3", "5", "99"])
    .range(["#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#AAAAAA"]);

    function createNodes(data, rScale){
        const nodes = data.map(d => ({
            ...d,
            radius: rScale(+d.value),
            x : Math.random()*400,
            y : Math.random()*400
        }))
        return nodes;
    }

    function chart(width, height, data){

        // location to centre the bubbles
        const centre = { x: width/2, y: height/2 };

        // strength to apply to the position forces
        const forceStrength = 0.03;

        // charge is dependent on size of the bubble, so bigger towards the middle
        function charge(d) {
            return Math.pow(d.radius, 2.0) * 0.01
        }

        // create a force simulation and add forces to it
        const simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(charge))
        .force('x', d3.forceX().strength(forceStrength).x(centre.x))
        .force('y', d3.forceY().strength(forceStrength).y(centre.y))
        .force('collision', d3.forceCollide().radius(d => d.radius + 1));

        // force simulation starts up automatically, which we don't want as there aren't any nodes yet
        simulation.stop();

        // yay, bubbles !!

        const maxSize= d3.max(data, d => +d.value);
        console.log(maxSize);

        // radius scale !!
        const rScale = d3.scalePow().exponent(2)
            .domain([0,maxSize])
            .range([25,50])

        nodes = createNodes(data, rScale);

        console.log(nodes);

        const elements = g.selectAll('.bubble')
        .data(nodes, d => d.id)
        .enter()
        .append('g')

        bubbles = elements
        .append('circle')
        .classed('bubble', true)
        .attr('r', d => d.radius)
        .attr('fill', d => fillColour(d.value))

        // labels
        labels = elements
        .append('text')
        .attr('dy', '.3em')
        .style('text-anchor', 'middle')
        .style('font-size', 10)
        .text(d => d.id)

        // set simulation's nodes to our newly created nodes array
        // simulation starts running automatically once nodes are set
        simulation.nodes(nodes)
        .on('tick', ticked)
        .restart();
    }

    function ticked() {
        bubbles
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
    
        labels
          .attr('x', d => d.x)
          .attr('y', d => d.y)
      }

    chart(940, 500, skills);

}

function expEle(){
    d3.select("#main").selectAll("*").remove();
    var svg = d3.select("#main");
    var g = svg.append("g").attr("id","item1");
    var text = g.append("text")
                .attr("x","50%").attr("y","50%")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","middle")
                .style("inline-size","50px");
    text.append("tspan")
        .style("font-size","200%")
        .text("Expertise!");
}