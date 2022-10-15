var otherExec = false
function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
  
function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}
  
width = getWidth();
height = getHeight();

var expData = {
    "nodes":[
        {id: 0, name: "GreyOrange Robotics", year: "2019",position: "Soft-dev Intern",value: "%Worked on optimizing path ]planning algorithms ]%Implemented binary heaps to ]reduce computation time ]%Programmed real-time ]interactive path-plotting", skills: ["Python", "Erlang", "C++"]},
        {id: 1, name: "SpaceX", year: "2019", position: "Hyperloop Pod Competition",value: "%Worked on a prototype ]hyperloop pod ]%Team-lead for the ]propulsion subsystem ]%Finished 10th at the finals", skills: ["Python"]},
        {id: 2, name: "Insti", year: "2020", position: "M.Tech Robotics",value: "%Paper on UAV path planning", skills: ["Python"]},
        {id: 3, name: "Honeywell", year: "2020", position: "SWE/Site Reliability Engineer",value: "%Worked on IoT systems ]%Worked on Identity and ]Access Management", skills: ["Python"]},
        {id: 4, name: "GaTech", year: "2022", position: "MS CS student", value:"Specializing in Machine ]Learning and Artificial ]Intelligence", skills: ["Python"]}
    ],
    "links":[
        {source: 0, target: 1},
        {source: 1, target: 2},
        {source: 2, target: 3},
        {source: 3, target: 4}
    ]
}

var expData2 = {
    "nodes":[
        {id: 0, name: "GreyOrange Robotics", year: "2019",position: "Soft-dev Intern",value: "%Worked on optimizing path planning algorithms ]%Implemented binary heaps to reduce computation time ]%Programmed real-time interactive path-plotting", skills: ["Python", "Erlang", "C++"]},
        {id: 1, name: "SpaceX", year: "2019", position: "Hyperloop Pod Competition",value: "%Worked on a prototype hyperloop pod ]%Team-lead for the propulsion subsystem ]%Finished 10th at the finals", skills: ["Python", "Flask"]},
        {id: 2, name: "IIT Madras", year: "2020", position: "M.Tech Robotics",value: "%Paper on UAV path planning", skills: ["Python", "Flask", "Matlab", "Tensorflow"]},
        {id: 3, name: "Honeywell", year: "2020", position: "SWE/Site Reliability Engineer",value: "%Worked on IoT systems ]%Worked on Identity and Access Management", skills: ["Python", "SQL", "Powershell", "Flask", "Terraform", "Ansible", "Kubernetes", "Docker", "Azure", "Prometheus", "Grafana", "ReactJS", "NodeJS"]},
        {id: 4, name: "GaTech", year: "2022", position: "MS CS student", value:"Specializing in Machine Learning and Artificial Intelligence", skills: ["Python", "SQL", "NodeJS", "Flask", "D3", "Neo4j", "Docker", "Tensorflow", "MongoDB"]}
    ],
    "links":[
        {source: 0, target: 1},
        {source: 1, target: 2},
        {source: 2, target: 3},
        {source: 3, target: 4}
    ]
}

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

var combined = languages.concat(tools, frameWorks);
console.log(combined);
var combinedDict = {}
for(let i in combined){
    combinedDict[combined[i].id] = combined[i].value
}
console.log(combinedDict);

// set up colour scale
const fillColour = d3.scaleOrdinal()
.domain(["2", "4", "6", "8", "10"])
//.range(['#f0f9e8','#ccebc5','#a8ddb5','#7bccc4','#43a2ca','#0868ac']);
//.range(['#ffffcc','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#0c2c84']);
.range(['#fbb4ae','#b3cde3','#ccebc5','#decbe4','#fed9a6','#ffffcc']);

/*
document.body.onmousemove = function(event){
    const {x, y} = event;
    console.log(x,y);
    var dot = d3.select("#main").append("circle").attr("id","mouseTrial").attr("r","5px").style("stroke","grey").style("fill","grey").style("opacity","0.3").attr("cx",x).attr("cy",y);
    setTimeout(() => dot.remove(), 2000);
}
*/
const cursor = document.getElementById('cursor');

document.body.onmousemove = (event) => {
    cursor.setAttribute("style", "top: "+(event.y - 10)+"px; left: "+(event.x - 10)+"px;")
}

document.body.onclick = () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
}

function homeEle(){
    otherExec = false;
    d3.select("#main").remove();
    let mb = document.getElementById("mainbody")
    if(mb != null){mb.remove();}
    let svg = d3
    .select("body")
    .append("svg")
    .attr("id","main");
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
    var xInit = 2*width/3, yInit = 10*height/11
    const nodes = data.map(d => ({
        ...d,
        radius: rScale(+d.value),
        x : Math.random()*iniX ,
        y : Math.random()*iniY 
    }))
    return nodes;
}

function writeDesc(data, dyIni, selector, dxIni, fontSize){
    var p = data.replace(new RegExp('%', 'g'),"\u2022 ").split("]");
    for(let line in p){    
        if(line==0){dy = dyIni;}
        else{dy = (25*height/880).toString()+"px";}
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
    d3.select("#main").remove();
    let mb = document.getElementById("mainbody")
    if(mb != null){mb.remove();}
    let svg = d3
    .select("body")
    .append("svg")
    .attr("id","main");
    let width = getWidth(), height = getHeight();

    var leftAlign = "73%"
    var text = svg.append("text").attr("id","homeDesc")
    var para1 = "My background in soft-dev is equal parts ]academic and professional. I've taken ]courses on the mathematics behind ]software tech and on their applications. ]I've applied these learnings at my ]internships while upskilling myself with ]the current industry standards. ] ] ]I'm a huge believer in automation - if ]there's a way to automate a menial task, ]I code away.";
    var para2 = "I've interned at a few software companies ]and worked as a soft-dev / site-reliability ]engineer. These make up the bulk of my ]expertise. I've also worked on collegiate ]projects and written a paper on ]UAV path-planning.";
   
    writeDesc(para1, (140*height/880).toString()+"px", text, leftAlign, Math.min(width/15,1000*height/880).toString()+"%");
    writeDesc(para2, (110*height/880).toString()+"px", text, leftAlign, Math.min(width/15,1000*height/880).toString()+"%");

    // strength to apply to the position forces
    const forceStrength = 0.03;

    // charge is dependent on size of the bubble, so bigger towards the middle
    function charge(d) {
        return Math.pow(d.radius, 2.0) * 0.01
    }

    function chart(width, height, data, selector, translateX, translateY, iniX, iniY, textVal, yBase, screenWidth){
        
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
            .range([screenWidth/70,screenWidth/35])

        const nodes = createNodes(data, rScale, 2*screenWidth/3, 10*height/11);
        const nodeDict = {}
        for(let i in nodes){
            nodeDict[nodes[i].id] = {value: nodes[i].value, radius: nodes[i].radius, fill: fillColour(nodes[i].radius)}
        }
        
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
                thisItem.attr("r",nodeDict[thisItem._groups[0][0].__data__.id].radius+10)
                .attr("fill", nodeDict[thisItem._groups[0][0].__data__.id].fill)
            })
            .on("mouseout", function(d){
                var thisItem = d3.select(this);
                thisItem.attr("r",nodeDict[thisItem._groups[0][0].__data__.id].radius)
                .attr("fill", nodeDict[thisItem._groups[0][0].__data__.id].fill)
            })

        // labels
        var labels = elements
            .append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('font-size', screenWidth/180)
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

    var chartWidth = width/5, chartHeight = height/2, barChartWidth = 2*width/5, barChartHeight = height/4;

    barchart(barChartWidth, barChartHeight, areas, svg, 2*width/15, 500/880*height);

    chart(chartWidth, chartHeight, languages, svg, -10, (50*height/880), 2*chartWidth/15, 0, "Languages", (40*height/880), width);
    chart(chartWidth, chartHeight, frameWorks, svg, width/5, (50*height/880), 4*chartWidth/15, (500*height/880), "Frameworks", (40*height/880), width);
    chart(chartWidth, chartHeight, tools, svg, 2*width/5+20, (50*height/880), 6*chartWidth/15, (300*height/880), "Tools", (40*height/880), width);
}

function expEle(){
    otherExec = true
    d3.select("#main").remove();
    let mb = document.getElementById("mainbody")
    if(mb != null){mb.remove();}
    let svg = d3
    .select("body")
    .append("svg")
    .attr("id","main");let width = getWidth(), height = getHeight();
    var g = svg.append("g").attr("id","item1");
    var expWidth = width-200, expHeight = height-200;

    var link = g
        .selectAll("line")
        .data(expData.links)
        .enter()
        .append("line")
        .style("stroke", "#aaa")

    // Initialize the nodes
    var nodes = svg
        .selectAll("circle")
        .data(expData.nodes)
        .enter()
        .append("g")
        .attr("id","nodes");
        
    var circles = nodes.append("circle")
        .attr("r", (40*width/1500))
        .attr("id",(d) => d.id)
        .style("fill", "#69b3a2");

    var textYears = nodes.append("text")
        .attr("text-align","center") 
        .attr("text-anchor","middle")
        .style("font-family","poppins-reg")
        .style("font-size",(100*width/1500).toString()+"%")
        .style("fill","3d3d3d")
        .style("stroke","3d3d3d")
        .text(function(d){return d.year;})

    var textTitles = nodes.append("text")
        .attr("text-align","center") 
        .attr("text-anchor","middle")
        .style("font-size",(100*width/1500).toString()+"%")
        .attr("id","expTitles")
        .text(function(d){return d.name;})

    var textPos = nodes.append("text")
        .attr("text-align","center") 
        .attr("text-anchor","middle")
        .style("font-size",(100*width/1500).toString()+"%")
        .attr("id","expPos")
        .text(function(d){return d.position;})

    var simulation = d3.forceSimulation(expData.nodes)
        .force("charge", d3.forceManyBody().strength(-100))
        .force("link", d3.forceLink(expData.links).id(function(d,i){return d.id}).distance(width/5).strength(1))
        .force("x", d3.forceX(function(d,i){return expWidth*i/expData.nodes.length+15}))
        .force("y", d3.forceY(expHeight/2))
        .force("collide", d3.forceCollide(42))
        .stop()
        
    simulation.restart()
        .on("tick",ticked)
        .on("end",ended);

    var xOffset = 2*width/15

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
            .attr("y", function(d) { return d.y+(60*height/880);})
        textPos
            .attr("x", function(d) { return d.x+6+xOffset;})
            .attr("y", function(d) { return d.y+(85*height/880);})

    }

    function ended(){
        if(otherExec==true){
            var leftAlign = "7%";
            for(let exp in expData.nodes){
                var selector = svg.append("g").attr("width",(100*height/880).toString()+"px").attr("height",(100*height/880).toString()+"px")
                    .attr("transform", "translate("+textTitles._groups[0][exp].__data__.x.toString()+","+textTitles._groups[0][exp].__data__.y.toString()+")").append("text").attr("id","expDesc");
                writeDesc(expData.nodes[exp].value, (Math.max(width/1500, height/880)*(120)).toString()+"px", selector, leftAlign, (4*width/75).toString()+"%");            
            }
        }
        otherExec = false;     
    }
}

function exp2(){
    console.log("exp2 exec")
    otherExec = false;
    d3.select("#main").remove();
    let mb = document.getElementById("mainbody")
    if(mb != null){mb.remove();}

    let mainBody = document.createElement("div")
    mainBody.setAttribute("id","mainbody");
    document.body.appendChild(mainBody);

    var scene, camera, renderer;
    var WIDTH  = window.innerWidth;
    var HEIGHT = window.innerHeight;

    var targetQuaternion = undefined;

    function init(){
        scene = new THREE.Scene();
        initCamera();
        initRenderer();
    
        initCube();
        console.log(renderer);
        var ambientLight = new THREE.AmbientLight(0x888888);
        scene.add(ambientLight);
        renderer.domElement.classList.add("flex-child");
        renderer.domElement.id = "canvasCube";
        mainBody.appendChild(renderer.domElement);
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
        camera.position.set(0, 2, 5);
        camera.lookAt(scene.position);
    }

    function initRenderer() {
        renderer = new THREE.WebGLRenderer({ antialias: true }, { alpha: true });
        renderer.setClearColor( 0x2C5f78 );
        renderer.setSize(WIDTH/2, HEIGHT/2);
    }

    function initCube() {
        cube = new THREE.Mesh(new THREE.CubeGeometry(2.5, 2.5, 2.5), new THREE.MeshNormalMaterial());
        scene.add(cube);
    }
    
    var SPEED = 0.005;

    function rotateCube() {
        cube.rotation.x -= SPEED * 2;
        cube.rotation.y -= SPEED;
        cube.rotation.z -= SPEED * 3;
    }

    function render(){
        requestAnimationFrame(render);
        if(targetQuaternion===undefined){rotateCube();}
        else{
            console.log("quaternion defined");
            if ( ! cube.quaternion.equals( targetQuaternion ) ) {
                console.log("quaternion rotation", cube, cube.quaternion);
                var step = SPEED * 10;
                cube.quaternion.rotateTowards(targetQuaternion, step);
                console.log("quaternion after", cube.quaternion);
            }

        }
        renderer.render(scene, camera);
    }

    init();
    render();

    let mbChild = document.createElement("div");
    mbChild.classList.add("flex-child");
    mbChild.id = "expDescBox";
    mainBody.appendChild(mbChild);

    for(let i in expData2.nodes){
        
        let btn = document.createElement("button");
        btn.innerHTML = expData.nodes[i].name;
        btn.className = "collapsible";
        mbChild.appendChild(btn);
        
        let btncont = document.createElement("div")
        btncont.setAttribute("class","content")
        let btnp = document.createElement("p")
        let btntextArr = expData2.nodes[i].value.replace(new RegExp('%', 'g'),"\u2022 ").split(']')
        for(let i in btntextArr){
            //console.log(btntextArr[i])
            let btntext = document.createTextNode(btntextArr[i]);
            btnp.appendChild(btntext);
            let br = document.createElement("br")
            btnp.appendChild(br);
        }
        btncont.appendChild(btnp);
        mbChild.appendChild(btncont);

        btn.addEventListener("click", function(){
            let thisbtn = this;
            thisbtn.classList.toggle("active");
            let cont = document.getElementsByClassName("content");
            for(let c of cont){
                if(c !== thisbtn.nextElementSibling){c.classList.remove("active")}
            }
            thisbtn.nextElementSibling.classList.toggle("active");
            let numActive = -1, currActive = 0
            for(let c of cont){
                if(c.classList.contains("active")){numActive = currActive; }
                currActive++
            }
            console.log(i, numActive);
            if(numActive >= 0){
                targetQuaternion = new THREE.Quaternion();
                targetQuaternion.setFromEuler( new THREE.Euler( Math.PI, Math.PI, 0 ) );
            }
            else{
                targetQuaternion = undefined;
            }
        })
    }
}

function exp3(){

    console.log("exp3 exec")
    otherExec = false;
    d3.select("#main").remove();
    let mb = document.getElementById("mainbody")
    if(mb != null){mb.remove();}

    let mainBody = document.createElement("div")
    mainBody.setAttribute("id","mainbody");
    document.body.appendChild(mainBody);

    let mbChild = document.createElement("div");
    mbChild.classList.add("flex-child");
    mbChild.id = "expDescBox";
    mainBody.appendChild(mbChild);

    let mbChildSvgDiv = document.createElement("div");
    mbChildSvgDiv.classList.add("flex-child");
    mbChildSvgDiv.id = "expSvg";
    mainBody.appendChild(mbChildSvgDiv);

    let svg = d3.select("#expSvg")
    .append("svg")
    .attr("width","100%")
    .attr("height","100%");

    const maxSize= d3.max(combined, d => +d.value);

    // radius scale !!
    var rScale = d3.scalePow().exponent(2)
        .domain([0,maxSize])
        .range([width/60,width/30])

    function expChart(skillList, nodes, links, nodeDict, linkDist, forceStrength, chargeStrength, centre){


        // charge is dependent on size of the bubble, so bigger towards the middle
        function charge(d) {
            return Math.pow(d.radius, 2.0) * chargeStrength
        }


        svg.selectAll("*").remove();
        var xOffset = 0;

        var link = svg
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .style("stroke", "#aaa")
            .style("opacity","0.2")

        // yay, bubbles !!

        var elements = svg.selectAll('.bubble')
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
                thisItem.attr("r",nodeDict[thisItem._groups[0][0].__data__.id].radius+10)
                .attr("fill", nodeDict[thisItem._groups[0][0].__data__.id].fill)
            })
            .on("mouseout", function(d){
                var thisItem = d3.select(this);
                thisItem.attr("r",nodeDict[thisItem._groups[0][0].__data__.id].radius)
                .attr("fill", nodeDict[thisItem._groups[0][0].__data__.id].fill)
            })

        // labels
        var labels = elements
            .append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('font-size', width/150)
            .style('stroke',"#5A5A5A")
            .style('font-family',"poppins-thin")
            .attr("id","skillsDesc")
            .text(d => d.name)

        // set simulation's nodes to our newly created nodes array
        // simulation starts running automatically once nodes are set

        // create a force simulation and add forces to it
        const simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(charge))
            .force('x', d3.forceX().strength(forceStrength).x(centre.x))
            .force('y', d3.forceY().strength(forceStrength).y(centre.y))
            .force('link', d3.forceLink(links).id(function(d){return d.id}).distance(linkDist).strength(0.2))
            .force('collision', d3.forceCollide().radius((d) => {return d.radius + 1}))
            .on('tick', function(d){
                bubbles
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
            
                labels
                .attr('x', d => d.x)
                .attr('y', d => d.y)

                link
                .attr("x1", function(d) { return nodes[d.source.id].x; })
                .attr("y1", function(d) { return nodes[d.source.id].y; })
                .attr("x2", function(d) { return nodes[d.target.id].x; })
                .attr("y2", function(d) { return nodes[d.target.id].y; });
            });
    }

    var expSkills = expData2.nodes.map((d) => d.name)
    var nodeDict = {}
    for(let i in expSkills){
        nodeDict[parseFloat(i)] = {value: 5, radius: width/25, fill: rScale(50)}
    }

    var nodes = []
    for(let i in expSkills){
        nodes.push({id:parseFloat(i), name:expSkills[i], value:5})
    }
    nodes = createNodes(nodes, rScale, width/5, height/2);
    var links = []
    for(let i=0; i<expSkills.length-1; i++){
        links.push({source:parseFloat(i), target:parseFloat(i)+1})
    }
    var centre = { x: width/4, y: height/2-50 };

    var defaults = {
        expSkills: expSkills,
        nodes: nodes,
        links: links,
        nodeDict: nodeDict,
        linkDist: width/7,
        forceStrength: 0.01,
        chargeStrength: -0.1,
        centre: centre
    }

    expChart(defaults.expSkills, defaults.nodes, defaults.links, defaults.nodeDict, defaults.linkDist, defaults.forceStrength, defaults.chargeStrength, defaults.centre)

    for(let i in expData2.nodes){        
        let btn = document.createElement("button");
        btn.innerHTML = expData.nodes[i].name;
        btn.className = "collapsible";
        mbChild.appendChild(btn);
        
        let btncont = document.createElement("div")
        btncont.setAttribute("class","content")
        let btnp = document.createElement("p")
        let btntextArr = expData2.nodes[i].value.replace(new RegExp('%', 'g'),"\u2022 ").split(']')
        for(let i in btntextArr){
            let btntext = document.createTextNode(btntextArr[i]);
            btnp.appendChild(btntext);
            let br = document.createElement("br")
            btnp.appendChild(br);
        }
        btncont.appendChild(btnp);
        mbChild.appendChild(btncont);

        btn.addEventListener("click", function(){
            let thisbtn = this;
            thisbtn.classList.toggle("active");
            let cont = document.getElementsByClassName("content");
            for(let c of cont){
                if(c !== thisbtn.nextElementSibling){c.classList.remove("active")}
            }
            thisbtn.nextElementSibling.classList.toggle("active");
            let numActive = -1, currActive = 0
            for(let c of cont){
                if(c.classList.contains("active")){numActive = currActive; }
                currActive++
            }
            console.log(i, numActive);
            if(numActive!=-1){
                var centre = { x: width/2, y: height/2+20 };
                var expSkills = expData2["nodes"][numActive].skills
                var nodeDict = {}
                for(let i in expSkills){
                    nodeDict[parseFloat(i)+1] = {value: combinedDict[expSkills[i]], radius: rScale(combinedDict[expSkills[i]]), fill: fillColour(rScale(combinedDict[expSkills[i]]))}
                }
                nodeDict[0] = {value: 5, radius: width/15, fill: rScale(50)}
        
                var nodes = []
                nodes.push({id: 0, name:expData2.nodes[numActive].name, value:20, radius:width/15, x:centre.x, y:centre.y})
                for(let i in expSkills){
                    nodes.push({id:parseFloat(i)+1, name:expSkills[i], value:combinedDict[expSkills[i]]})
                }
                nodes = createNodes(nodes, rScale, width/5, height/2);
                var links = []
                for(let i in expSkills){
                    links.push({source:0, target:parseFloat(i)+1})
                }
                expChart(expSkills, nodes, links, nodeDict, width/6, 0.01, 0.005, centre)
            }
            else{
                var centre = { x: width/2, y: height/2+20 };
                expChart(defaults.expSkills, defaults.nodes, defaults.links, defaults.nodeDict, defaults.linkDist, defaults.forceStrength, defaults.chargeStrength, defaults.centre);
            }
        })
    }

}