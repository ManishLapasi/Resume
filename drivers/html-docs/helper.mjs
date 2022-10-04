var timeouts = [];

function clearTimeouts(){
    for(let i in timeouts){
        clearTimeout(timeouts[i]);
    }
    timeouts = [];
}

function homeEle(){

    clearTimeouts();
    d3.select("#main").selectAll("*").remove();

    var svg = d3.select("#main");
    var g = svg.append("g").attr("id","item1");

    var leftAlign = "10%";

    var text = g.append("text")
                .attr("x",leftAlign).attr("y","30%")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","left")
                .style("inline-size","50px");
    text.append("tspan")
        .style("font-size","150%")
        .attr("display","block")
        .text("Hi!");
    text.append("tspan")
        .attr("x",leftAlign).attr("y","40%")
        .style("font-size","300%")
        .style("text-align","left")
        .attr("display","block")
        .text("I'm Manikandan Lapasi.");
    text.append("tspan")
        .attr("x",leftAlign).attr("y","50%")
        .style("font-size","300%")
        .style("text-align","left")
        .style("margin-bottom","50px")
        .attr("display","block")
        .text("I write code.");
    text.append("br");
    lines = [
        {value: "I dabble in software development, and make a living out of it.", dy: "70px"},
        {value: "I've worked as software developer and as a site reliability engineer.", dy: "30px"},
        {value: "I'm currently pursuing a master's in CS at Georgia Tech.", dy: "30px"}
    ]
    for(let line in lines){
        text.append("tspan")
            .attr("width","100px")
            .style("font-size","150%")
            .attr("x",leftAlign).attr("dy",lines[line].dy)
            .style("text-align","left")
            .text(lines[line].value);
    }
}

function skillsEle(){
    clearTimeouts();
    d3.select("#main").selectAll("*").remove();
    var svg = d3.select("#main");
    var leftAlign = "70%"
    var text = svg.append("text")
    var para1 = "My background in soft-dev is equal parts academic and ;professional. I've taken up courses on the mathematics ;behind software tech and on their applications. I've applied ;these learnings at my internships while upskilling ;myself with the current industry standards. ; ; ;I'm a huge believer in automation - if there's a way to ;automate a menial task, I code away.";
    var para2 = "I've interned at a few software-based companies and ;worked as a soft-dev / site-reliability engineer. These make ;up the bulk of my expertise. I've also worked on college-level ;projects and written a paper in UAV path-planning."
    
    function writeDesc(data, dyIni){
        var p = data.split(";")
    
        for(let line in p){    
            if(line==0){dy = dyIni;}
            else{dy = "25px";}
            if(p[line]==" "){p[line] = "\u00A0"}

            text.append("tspan")
                .attr("width","100px")
                .style("font-size","100%")
                .attr("x",leftAlign)
                .attr("dy",dy)
                .style("text-align","left")
                .text(p[line])  ;
            }
    }
    
    writeDesc(para1, "170px");
    writeDesc(para2, "170px");

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
        {id:"Tensorflow", value: 6},
        {id:"Flask", value: 8},
        {id:"ReactJS", value: 6},
        {id:"D3", value: 8},
        {id:"MongoDB", value: 6},
        {id:"Neo4j", value: 6}
    ];

    var areas = [
        {id:"Back-end", value: 8},
        {id:"Front-end", value: 6},
        {id:"Reliability", value: 8},
        {id:"Dev-Ops", value: 6}
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

    function chart(width, height, data, selector, translateX, translateY, iniX, iniY, textVal, yBase){
        
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
        var simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(charge))
        .force('x', d3.forceX().strength(forceStrength).x(centre.x))
        .force('y', d3.forceY().strength(forceStrength).y(centre.y))
        .force('collision', d3.forceCollide().radius(d => d.radius + 1));

        // force simulation starts up automatically, which we don't want as there aren't any nodes yet
        simulation.stop();

        // yay, bubbles !!

        const maxSize= d3.max(data, d => +d.value);
        //console.log(maxSize);

        // radius scale !!
        const rScale = d3.scalePow().exponent(2)
            .domain([0,maxSize])
            .range([25,50])

        nodes = createNodes(data, rScale,iniX, iniY);

        //console.log(nodes);

        var elements = g.selectAll('.bubble')
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

        function ticked() {
            bubbles
              .attr('cx', d => d.x)
              .attr('cy', d => d.y)
        
            labels
              .attr('x', d => d.x)
              .attr('y', d => d.y)
          }

        selector.append("text")
            .attr("x",centre.x + translateX)
            .attr("y",centre.y + yBase + translateY)
            .style("text-align","center")
            .text(textVal);
    }

    function barchart(width, height, data, selector, translateX, translateY)
    {
        var g = selector.append("g").attr("id","item1")
            .attr("transform","translate("+translateX+","+translateY+")");

        var xScale = d3.scaleLinear().range([0,width]);
        var yScale = d3.scaleBand().range([0,height]).padding(0.8);

        xScale.domain([0,10]);
        yScale.domain(data.map(function(d){return d.id;}));

        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", "0")
            .attr("y", function(d){return yScale(d.id)})
            .attr("width", function(d){return xScale(d.value)})
            .attr("height", yScale.bandwidth());

        g.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .attr("x","0")
            .attr("dx","-10px")
            .attr("text-anchor","end")
            .attr("y",function(d){return yScale(d.id);})
            .attr("dy",yScale.bandwidth())
            .attr("stroke","red")
            .text(function(d){return d.id;});
    }

    barchart(600, 200, areas, svg, 200, 500);

    chart(300, 400, languages, svg, 0, 50, 200, 0, "Languages", 125);
    var t1 = setTimeout(function(){
        chart(300, 400, frameWorks, svg, 250, 50, 400, 500, "Frameworks", 225);
        }, 2000)
    var t2 = setTimeout(function(){
        chart(300, 400, tools, svg, 550, 50, 600, 300, "Tools", 200);
        }, 4000)
    timeouts.push(t1);
    timeouts.push(t2);

}

function expEle(){
    clearTimeouts();
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