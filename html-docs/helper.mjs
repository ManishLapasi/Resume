var otherExec = false

/*
document.body.onmousemove = function(event){
    const {x, y} = event;
    console.log(x,y);
    var dot = d3.select("#main").append("circle").attr("id","mouseTrial").attr("r","5px").style("stroke","red").style("fill","red").attr("cx",x).attr("cy",y);
    setTimeout(() => dot.remove(), 500);
}
*/

function homeEle(){
    otherExec = false;
    d3.select("#main").selectAll("*").remove();
    
    var svg = d3.select("#main");
    var g = svg.append("g").attr("id","item1");

    var leftAlign = "10%";

    var introLines = [
        {value: "Hi!", font_size: "150%", dy: "0px" },
        {value: "I'm Manikandan Lapasi.", font_size: "300%", dy: "50px" },
        {value: "I write code.", font_size: "300%", dy: "100px" },
        {value: "I dabble in software development, and make a living out of it.", font_size: "150%", dy: "150px"}
    ]

    var text = g.append("text")
                .attr("x",leftAlign).attr("y","30%")
                .attr("dominant-baseline","middle")
                .attr("text-anchor","left")
                .style("inline-size","50px");

    for(let i in introLines){
        setTimeout(function(){
            text.append("tspan")
            .attr("x",leftAlign).attr("y","40%")
            .style("font-size",introLines[i].font_size)
            .attr("dy",introLines[i].dy)
            .style("text-align","left")
            .attr("display","block")
            .attr("id","homeDesc")
            .text(introLines[i].value);
        },1500*i)
    }
    
}

function createNodes(data, rScale, iniX, iniY){
    const nodes = data.map(d => ({
        ...d,
        radius: rScale(+d.value),
        x : Math.random()*1000 ,
        y : Math.random()*800 
    }))
    return nodes;
}

function writeDesc(data, dyIni, selector, dxIni, fontSize, id){
    var p = data.replace(new RegExp('%', 'g'),"\u2022 ").split("]");
    console.log(p);
    for(let line in p){    
        if(line==0){dy = dyIni;}
        else{dy = "25px";}
        if(p[line]==" "){p[line] = "\u00A0"}

        selector.append("tspan")
            .attr("width","100px")
            .style("font-size",fontSize)
            .attr("x",dxIni)
            .attr("dy",dy)
            .style("text-align","left")
            .text(p[line])  ;
        }
}

function skillsEle(){
    otherExec = false;
    d3.select("#main").selectAll("*").remove();
    var svg = d3.select("#main");
    var leftAlign = "73%"
    var text = svg.append("text").attr("id","homeDesc")
    var para1 = "My background in soft-dev is equal parts ]academic and professional. I've taken ]courses on the mathematics behind ]software tech and on their applications. ]I've applied these learnings at my ]internships while upskilling myself with ]the current industry standards. ] ] ]I'm a huge believer in automation - if ]there's a way to automate a menial task, ]I code away.";
    var para2 = "I've interned at a few software companies ]and worked as a soft-dev / site-reliability ]engineer. These make up the bulk of my ]expertise. I've also worked on collegiate ]projects and written a paper on ]UAV path-planning.";
   
    writeDesc(para1, "140px", text, leftAlign, "100%");
    writeDesc(para2, "110px", text, leftAlign, "100%");

    var languages = [
        {id:"Python", value: 10},
        {id:"C++", value: 4},
        {id:"R", value: 4},
        {id:"Powershell", value: 5},
        {id:"SQL", value: 8},
        {id:"NodeJS", value: 8},
        {id:"Erlang", value: 6}
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
    //.range(['#f0f9e8','#ccebc5','#a8ddb5','#7bccc4','#43a2ca','#0868ac']);
    //.range(['#ffffcc','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#0c2c84']);
    .range(['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6','#ffffcc']);

    // strength to apply to the position forces
    const forceStrength = 0.03;

    // charge is dependent on size of the bubble, so bigger towards the middle
    function charge(d) {
        return Math.pow(d.radius, 2.0) * 0.01
    }

    function chart(width, height, data, selector, translateX, translateY, iniX, iniY, textVal, yBase){
        
        var g = selector.append("g").attr("id","item1")
            .attr("transform","translate("+translateX+","+translateY+")");
        // location to centre the bubbles
        const centre = { x: width/2, y: height/2 };

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

        // radius scale !!
        const rScale = d3.scalePow().exponent(2)
            .domain([0,maxSize])
            .range([25,50])

        const nodes = createNodes(data, rScale, iniX, iniY);
        const nodeDict = {}
        for(let i in nodes){
            nodeDict[nodes[i].id] = {value: nodes[i].value, radius: nodes[i].radius, fill: fillColour(nodes[i].radius)}
        }
        console.log(nodes);
        console.log(nodeDict);

        var elements = g.selectAll('.bubble')
            .data(nodes)
            .enter()
            .append('g')
        
        var bubbles = elements
            .append('circle')
            .attr("id", d => d.id)
            .attr('r', d => nodeDict[d.id].radius)
            .attr('fill', d => nodeDict[d.id].fill)
            .style("opacity","0.7")
            .attr("pointer-events","visible")
            .on("mouseover", function(d){
                var thisItem = d3.select(this);
                console.log(thisItem);
                //console.log(thisItem._groups[0][0].__data__.radius);
                thisItem.attr("r",nodeDict[thisItem._groups[0][0].__data__.id].radius+10)
                .attr("fill", nodeDict[thisItem._groups[0][0].__data__.id].fill)
            })
            .on("mouseout", function(d){
                var thisItem = d3.select(this);
                //console.log(thisItem._groups[0][0].__data__.radius);
                thisItem.attr("r",nodeDict[thisItem._groups[0][0].__data__.id].radius)
                .attr("fill", nodeDict[thisItem._groups[0][0].__data__.id].fill)
            })

        // labels
        var labels = elements
            .append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('font-size', 10)
            .style('stroke',"#5A5A5A")
            .style('font-family',"poppins-thin")
            .attr("id","skillsDesc")
            .text(d => d.id)

        // set simulation's nodes to our newly created nodes array
        // simulation starts running automatically once nodes are set
        simulation.nodes(nodes)
        .on('tick', function(d){
            bubbles
              .attr('cx', d => d.x)
              .attr('cy', d => d.y)
        
            labels
              .attr('x', d => d.x)
              .attr('y', d => d.y)
        })
        .restart();

        selector.append("text")
            .attr("x",centre.x + translateX)
            .attr("y",yBase + translateY)
            .attr("id","homeDesc")
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
            .style("rx","5px")
            .attr("x", "0")
            .attr("y", function(d){return yScale(d.id)})
            .attr("width", function(d){return xScale(d.value)})
            .attr("height", yScale.bandwidth())
            .attr("fill","#cbd5e8");

        g.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .attr("x","0")
            .attr("dx","-10px")
            .attr("text-anchor","end")
            .attr("y",function(d){return yScale(d.id);})
            .attr("dy",yScale.bandwidth())
            .style("stroke","#E2E2E2")
            .style("fill","#E2E2E2")
            .text(function(d){return d.id;});
    }

    barchart(600, 200, areas, svg, 200, 500);

    chart(300, 400, languages, svg, -10, 50, 200, 0, "Languages", 40);
    chart(300, 400, frameWorks, svg, 300, 50, 400, 500, "Frameworks", 40);
    chart(300, 400, tools, svg, 650, 50, 600, 300, "Tools", 40);
}

function expEle(){
    otherExec = true
    d3.select("#main").selectAll("*").remove();
    var svg = d3.select("#main");
    var g = svg.append("g").attr("id","item1");
    var width = 1300, height = 600;

    var data = {
        "nodes":[
            {id: 0, name: "GreyOrange Robotics", year: "2019",position: "Soft-dev Intern",value: "%Worked on optimizing path ]planning algorithms ]%Implemented binary heaps to ]reduce computation time ]%Programmed real-time ]interactive path-plotting"},
            {id: 1, name: "SpaceX", year: "2019", position: "Hyperloop Pod Competition",value: "%Worked on a prototype ]hyperloop pod ]%Team-lead for the ]propulsion subsystem ]%Finished 10th at the finals"},
            {id: 2, name: "Insti", year: "2020", position: "M.Tech Robotics",value: "%Paper on UAV path planning"},
            {id: 3, name: "Honeywell", year: "2020", position: "SWE/Site Reliability Engineer",value: "%Worked on IoT systems ]%Worked on Identity and ]Access Management"},
            {id: 4, name: "GaTech", year: "2022", position: "MS CS student", value:"Specializing in Machine ]Learning and Artificial ]Intelligence"}
        ],
        "links":[
            {source: 0, target: 1},
            {source: 1, target: 2},
            {source: 2, target: 3},
            {source: 3, target: 4}
        ]
    }

    var link = g
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "#aaa")

    // Initialize the nodes
    var nodes = svg
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("g")
        .attr("id","nodes");
        
    var circles = nodes.append("circle")
        .attr("r", 40)
        .style("fill", "#69b3a2")

    var textYears = nodes.append("text")
        .attr("text-align","center") 
        .attr("text-anchor","middle")
        .style("font-family","poppins-reg")
        .style("fill","3d3d3d")
        .style("stroke","3d3d3d")
        .text(function(d){return d.year;})

    var textTitles = nodes.append("text")
        .attr("text-align","center") 
        .attr("text-anchor","middle")
        .attr("id","expTitles")
        .text(function(d){return d.name;})

    var textPos = nodes.append("text")
        .attr("text-align","center") 
        .attr("text-anchor","middle")
        .attr("id","expPos")
        .text(function(d){return d.position;})

    var simulation = d3.forceSimulation(data.nodes)
        .force("charge", d3.forceManyBody().strength(-100))
        .force("link", d3.forceLink(data.links).id(function(d,i){return d.id}).distance(350).strength(1))
        .force("x", d3.forceX(function(d,i){return width*i/data.nodes.length+15}))
        .force("y", d3.forceY(height/2))
        .force("collide", d3.forceCollide(42))
        .stop()
        
    simulation.restart()
        .on("tick",ticked)
        .on("end",ended);

    var xOffset = 200

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x+xOffset; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x+xOffset; })
            .attr("y2", function(d) { return d.target.y; });
    
        circles
            .attr("cx", function (d) { return d.x+6+xOffset; })
            .attr("cy", function(d) { return d.y-6; });

        textYears
            .attr("x", function(d) { return d.x+6+xOffset;})
            .attr("y", function(d) {return d.y;})

        textTitles
            .attr("x", function(d) { return d.x+6+xOffset;})
            .attr("y", function(d) { return d.y+60;})
        textPos
            .attr("x", function(d) { return d.x+6+xOffset;})
            .attr("y", function(d) { return d.y+85;})

    }

    function ended(){
        if(otherExec==true){
            var leftAlign = "7%";
            for(let exp in data.nodes){
                var selector = svg.append("g").attr("width","100px").attr("height","100px")
                    .attr("transform", "translate("+textTitles._groups[0][exp].__data__.x.toString()+","+textTitles._groups[0][exp].__data__.y.toString()+")").append("text").attr("id","expDesc");
                writeDesc(data.nodes[exp].value, "120px", selector, leftAlign, "80%");            
            }
        }
        otherExec = false;     
    }
}