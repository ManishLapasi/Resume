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

    var languages = [
        {id:"python", value: 10},
        {id:"C++", value: 4},
        {id:"R", value: 4},
        {id:"Powershell", value: 4},
        {id:"SQL", value: 8},
        {id:"NodeJS", value: 8}
    ];

    var tools = [
        {id:"Docker", value: 8},
        {id:"Terraform", value: 9},
        {id:"Ansible", value: 6},
        {id:"Kubernetes", value: 8},
        {id:"Grafana", value: 8},
        {id:"Prometheus", value: 8},
        {id:"Matlab", value: 6},
        {id:"Azure", value: 8}
    ];

    var frameWorks = [
        {id:"Tensorflow", value: 5},
        {id:"Flask", value: 8},
        {id:"ReactJS", value: 6},
        {id:"D3", value: 8},
        {id:"MongoDB", value: 6},
        {id:"Neo4j", value: 6}
    ];

    // set up colour scale
    const fillColour = d3.scaleOrdinal()
    .domain(["1", "2", "3", "5", "99"])
    .range(["#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#AAAAAA"]);

    function createNodes(data, rScale, iniX, iniY){
        const nodes = data.map(d => ({
            ...d,
            radius: rScale(+d.value),
            x : Math.random()*100 + iniX,
            y : Math.random()*100 + iniY
        }))
        return nodes;
    }

    function chart(width, height, data, selector, translateX, translateY, iniX, iniY, textVal){
        
        var g = selector.append("g").attr("id","item1")
            .attr("transform","translate("+translateX+","+translateY+")");
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

        nodes = createNodes(data, rScale,iniX, iniY);

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

        selector.append("text")
            .attr("x",centre.x + translateX)
            .attr("y",centre.y + 250 + translateY*(data.length/15+Math.random()))
            .text(textVal);
    }

    function ticked() {
        bubbles
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
    
        labels
          .attr('x', d => d.x)
          .attr('y', d => d.y)
      }

    chart(300, 500, languages, svg, 25, 100, 200, 0, "Languages");
    setTimeout(function(){
        chart(300, 500, frameWorks, svg, 300, 100, 400, 500, "Frameworks");
        }, 2000)
    setTimeout(function(){
        chart(300, 500, tools, svg, 625, 100, 600, 300, "Tools");
        }, 4000)
    
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