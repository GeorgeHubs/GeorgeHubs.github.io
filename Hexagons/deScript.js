var mousePos = {x:0 , y:0};

let deCanvas = document.createElement("canvas");

let deContext = deCanvas.getContext("2d");
	//console.log("helloo");
document.body.appendChild(deCanvas);
	//console.log("helloo");
document.body.style.margin = "0px";
deCanvas.width = window.innerWidth;
deCanvas.height = window.innerHeight;
console.log(window);

var hexagons = [];
var waves = [];
var resizeBy = 0;

let hexagonWidth = 40;
let hexagonHeight = 40;

var nrOfHexagonsHorizontally = parseInt(window.innerWidth/hexagonWidth) -1;
let nrOfHexagonsVertically = parseInt(window.innerHeight/hexagonHeight) -1;	
//console.log("horizontally = "+nrOfHexagonsHorizontally);
//console.log("vertically = "+nrOfHexagonsVertically);

let freeSpaceY = nrOfHexagonsVertically * hexagonHeight - (nrOfHexagonsVertically*hexagonHeight)/2;
let numberOfHexagonsToFitInTheFreeSpace = parseInt(freeSpaceY/hexagonHeight);

nrOfHexagonsVertically += numberOfHexagonsToFitInTheFreeSpace;

var hexagonsWithDrawingPriority = [];
var hexagonsWithoutDrawingPriority = [];

function Wave(startPos){
	this.originX = startPos.x;
	this.originY = startPos.y;
	
	this.currentProgress = 0;
	this.maxProgress = Math.sqrt(Math.pow(window.innerWidth,2) + Math.pow(window.innerHeight,2));
}

function Hexagon(vertexA, vertexB, vertexC, vertexD, vertexE, vertexF){
	this.vertexA = vertexA;
	this.vertexB = vertexB;
	this.vertexC = vertexC;
	this.vertexD = vertexD;
	this.vertexE = vertexE;
	this.vertexF = vertexF;
	
	this.color = "rgb("+0+","+parseInt(Math.max(Math.random()*255 ,100))+","+0+")";//"rgb("+Math.floor(Math.random()*50)+","+Math.max(Math.floor(Math.random()*255),150)+","+Math.floor(Math.random()*100)+")";
	
	this.resized = false;
	this.resizedCount = 0;
	
	
	this.print = function (){
	    console.log(this.vertexA);	
	    console.log(this.vertexB);
		console.log(this.vertexC);
	    console.log(this.vertexD);
	    console.log(this.vertexE);
	    console.log(this.vertexF);		
	}
	
	this.getCenter = function(){
		return {x: this.vertexA.pointA.x + (this.vertexD.pointB.x - this.vertexA.pointA.x)/2,
		        y: this.vertexA.pointA.y + (this.vertexA.pointB.y - this.vertexA.pointA.y)/2}
	}
	
	this.adjustYOffset = function(by){
		this.vertexA.pointA.y += by;
	    this.vertexA.pointB.y += by

	    this.vertexB.pointA.y += by;
		this.vertexB.pointB.y += by;

	    this.vertexC.pointA.y += by;
	    this.vertexC.pointB.y += by;
			
		this.vertexD.pointA.y += by;
		this.vertexD.pointB.y += by;

		this.vertexE.pointA.y += by;
		this.vertexE.pointB.y += by;

		this.vertexF.pointA.y += by;
		this.vertexF.pointB.y += by;	
	}
	
	this.resize = function(by){
		this.vertexA.pointA.x -= by;
		this.vertexA.pointA.y -= by;
		
		this.vertexA.pointB.x -= by/2;
		this.vertexA.pointB.y += by/2;
		
		this.vertexB.pointA.x -= by/2;
		this.vertexB.pointA.y += by/2;
		
		this.vertexB.pointB.x -= by/2;
		this.vertexB.pointB.y += by/2;
		
		this.vertexC.pointA.x += by/2;
		this.vertexC.pointA.y += by;
		
		this.vertexC.pointB.x += by/2;
		this.vertexC.pointB.y += by/2;
		
		this.vertexD.pointA.x += by/2;
		this.vertexD.pointA.y += by/2;
		
		this.vertexD.pointB.x += by/2;
		this.vertexD.pointB.y -= by/2;
		
		this.vertexE.pointA.x += by/2;
		this.vertexE.pointA.y -= by/2;
		
		this.vertexE.pointB.x += 0;
		this.vertexE.pointB.y -= by;
		
		this.vertexF.pointA.x += 0;
		this.vertexF.pointA.y -= by/2; 
		
		this.vertexF.pointB.x -= by;
		this.vertexF.pointB.y -= by;
	}
	
	this.showVertexes = function(){
		this.showVertex(vertexA);
		this.showVertex(vertexB);
		this.showVertex(vertexC);
		this.showVertex(vertexD);
		this.showVertex(vertexE);
		this.showVertex(vertexF);
	}
	
	this.showVertex = function(vertex){
		let vertexColor = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
		console.log("Vertex color : "+vertexColor);
		
		deContext.strokeStyle = vertexColor;
		deContext.fillStyle = vertexColor;
		deContext.beginPath();
		deContext.arc(vertex.pointA.x, vertex.pointA.y, 5, 0, 2*Math.PI);
		deContext.closePath();
		deContext.fill();
		
		deContext.beginPath();
		deContext.arc(vertex.pointB.x, vertex.pointB.y, 5, 0, 2*Math.PI);
		deContext.closePath();
		deContext.fill();
		
		deContext.beginPath();
		deContext.moveTo(vertex.pointA.x, vertex.pointA.y);
		deContext.lineTo(vertex.pointB.x, vertex.pointB.y);
		deContext.closePath();
		deContext.stroke();
	}
}

function Vertex(pointA, pointB){
	this.pointA = pointA;
	this.pointB = pointB;
}

function Point(x, y){
	this.x = x;
	this.y = y;
}
	
function createHexagons(){
	//console.log("Creating hexagons...");
	
	for(var i = 0;i < nrOfHexagonsHorizontally; i++){
	    for(var j = 0;j < nrOfHexagonsVertically; j++){
			var leftSpacing = 0, topSpacing = (j*hexagonHeight)/4;
		    if(j%2 == 0){ leftSpacing = hexagonWidth/2; topSpacing = (j*hexagonHeight)/4;}
            //let hexagonCenter = new Point(i + hexagonWidth/2, j+ hexagonHeight/2);
			let vertexAP1 = new Point(i*hexagonWidth + leftSpacing,j*hexagonHeight + hexagonHeight/2 - topSpacing);
			let vertexAP2 = new Point(i*hexagonWidth + leftSpacing,j*hexagonHeight + hexagonHeight - topSpacing);
			var vertexA = new Vertex(vertexAP1, vertexAP2);
			
			let vertexBP1 = vertexA.pointB;
			let vertexBP2 = new Point(vertexBP1.x + hexagonWidth/2, vertexAP2.y + hexagonHeight/4);
			var vertexB = new Vertex(vertexBP1, vertexBP2);
			
			let vertexCP1 = vertexB.pointB;
			let vertexCP2 = new Point(vertexCP1.x+hexagonWidth/2, vertexBP2.y - hexagonHeight/4);
			var vertexC = new Vertex(vertexCP1, vertexCP2);

			let vertexDP1 = vertexC.pointB;
			let vertexDP2 = new Point(vertexDP1.x, vertexBP2.y- hexagonHeight/2 -hexagonHeight/4);
			var vertexD = new Vertex(vertexDP1, vertexDP2);

			let vertexEP1 = vertexD.pointB;
			let vertexEP2 = new Point(vertexEP1.x - hexagonWidth/2, vertexDP2.y - hexagonHeight/4);
			var vertexE = new Vertex(vertexEP1, vertexEP2);

			let vertexFP1 = vertexE.pointB;
			let vertexFP2 = new Point(vertexFP1.x - hexagonWidth/2, vertexEP2.y + hexagonHeight/4);
			var vertexF = new Vertex(vertexFP1, vertexFP2);		

            let hexagon = new Hexagon(vertexA, vertexB, vertexC, vertexD, vertexE, vertexF);	
			console.log(hexagon.color);
			//hexagon.print();
            hexagons.push(hexagon);			
		}		
	}
	
	
	//console.log("hexagons: "+hexagons);
}

function drawContourOfHexagons(){
	//console.log("drawing hexagons");
        for(var i = 0;i < hexagons.length; i++){
			//console.log("drawing hexagon on line "+i+"  colon "+j);
	        let hexagonToDraw = hexagons[i];	
            //console.log("Drawing hexagon nr: "+i*j);			
			deContext.strokeStyle = "black";
			deContext.lineWidth = "1px";
			
			deContext.beginPath();
			//console.log("Starting to draw the hexagon at : "+ hexagonToDraw.vertexA.pointA.x + ", "+ hexagonToDraw.vertexA.pointA.y);
			deContext.moveTo(hexagonToDraw.vertexA.pointA.x, hexagonToDraw.vertexA.pointA.y);
			
			//console.log("Drawing line to : "+hexagonToDraw.vertexA.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexA.pointB.x, hexagonToDraw.vertexA.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexB.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
		    deContext.lineTo(hexagonToDraw.vertexB.pointB.x, hexagonToDraw.vertexB.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexC.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexC.pointB.x, hexagonToDraw.vertexC.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexD.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexD.pointB.x, hexagonToDraw.vertexD.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexE.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexE.pointB.x, hexagonToDraw.vertexE.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexF.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexF.pointB.x, hexagonToDraw.vertexF.pointB.y);
			
			//deContext.closePath();
			deContext.stroke();
		}
	//console.log("done drawing");
}

function drawTheInsideOfHexagons(){
	    for(var i = 0;i < hexagons.length; i++){
			//console.log("drawing hexagon on line "+i+"  colon "+j);
	        let hexagonToDraw = hexagons[i];	
            //console.log("Drawing hexagon nr: "+i*j);
			let maxDistance = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight
			let hexagonCenterX = hexagonToDraw.vertexA.pointA.x + hexagonWidth/2;
			let hexagonCenterY = hexagonToDraw.vertexA.pointA.y + hexagonHeight/2;
			var distance = Math.sqrt(Math.pow(mousePos.x - hexagonCenterX,2) + Math.pow(mousePos.y - hexagonCenterY,2));
            
			//console.log("maxDistance = "+maxDistance+"  distance = "+distance);
			
			var normatedValue = distance/maxDistance;
			//console.log("maxDistance = "+maxDistance+"  distance = "+distance+"  normatedValue = "+normatedValue+ "hexagonCenter = "+hexagonCenterX+", "+hexagonCenterY+"  mousePos = "+mousePos.x+", "+mousePos.y);
			
			var fillValue = (parseInt(255 * normatedValue));
			if (fillValue < 20){ fillValue = 20; }
            let fillStyleValue = hexagons[i].color;			
			deContext.fillStyle = fillStyleValue;
			//console.log("fillStyle = "+fillStyleValue);
			deContext.lineWidth = "2px";
			
			deContext.beginPath();
			//console.log("Starting to draw the hexagon at : "+ hexagonToDraw.vertexA.pointA.x + ", "+ hexagonToDraw.vertexA.pointA.y);
			deContext.moveTo(hexagonToDraw.vertexA.pointA.x, hexagonToDraw.vertexA.pointA.y);
			
			//console.log("Drawing line to : "+hexagonToDraw.vertexA.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexA.pointB.x, hexagonToDraw.vertexA.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexB.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
		    deContext.lineTo(hexagonToDraw.vertexB.pointB.x, hexagonToDraw.vertexB.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexC.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexC.pointB.x, hexagonToDraw.vertexC.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexD.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexD.pointB.x, hexagonToDraw.vertexD.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexE.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexE.pointB.x, hexagonToDraw.vertexE.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexF.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexF.pointB.x, hexagonToDraw.vertexF.pointB.y);
			
			deContext.closePath();
			deContext.fill();
		}
}

function clearCanvas(){
	deContext.fillStyle = "white";
	deContext.fillRect(0, 0, deCanvas.width, deCanvas.height);
}

function startNewWave(){
	// initWave
	let wave = new Wave(mousePos);
    waves.push(wave);
		
	//clearCanvas();
	//drawContourOfHexagons();
}

function progressWaves(){
	clearCanvas();
	//console.log("Wave count = "+waves.length);
	hexagonsWithDrawingPriority = [];
	hexagonsWithoutDrawingPriority = [];
	for(var i = 0;i < waves.length; i++){
		if(waves[i].currentProgress < waves[i].maxProgress){
		//console.log("[WAVE "+i+"]");
		waves[i].currentProgress += 5;
		
		for(var j = 0;j < hexagons.length; j++){
			//console.log("[GOING THROUGH HEXAGONS] "+j);
			let distance = parseInt(Math.sqrt(Math.pow(waves[i].originX - hexagons[j].getCenter().x,2) + Math.pow(waves[i].originY - hexagons[j].getCenter().y,2))) ;
			//hexagonsWithDrawingPriority = [];
			//hexagonsWithoutDrawingPriority = [];
			//console.log("Distance = "+distance+"    Progress = "+ waves[i].currentProgress);
		    if(distance < waves[i].currentProgress + 20 && distance > waves[i].currentProgress -20 && !hexagons[j].resized){
				hexagonsWithDrawingPriority.push(hexagons[j]);
				hexagons[j].resize(10);
				hexagons[j].resized = true;
			}else if(waves[i].currentProgress > distance + hexagonWidth && hexagons[j].resized){
				hexagonsWithoutDrawingPriority.push(hexagons[j]);
			    hexagons[j].resize(-10);
			    hexagons[j].resized = false;
			}
		}
		}
	}
	
	for(var i = 0;i < waves.length; i++){
		waves[i].currentProgress += 5;
	}
	
    for(var i = 0;i < waves.length; i++){
		waves[i].currentProgress += 5;
	}
	
	//drawTheInsideOfHexagons();
	//drawContourOfHexagons();
}

function resize(hexagon, by){
    
}

function drawWaves(){
	deContext.fillStyle = "rgba(255,0,0,0.5)";
	
	for(var i = 0;i < waves.length; i++){
	    deContext.beginPath();
		deContext.arc(waves[i].originX, waves[i].originY, waves[i].currentProgress, 0, Math.PI*2);
		deContext.closePath();
		deContext.fill();
	}
}

function drawHexagonsCenter(){
	deContext.fillStyle = "rgba(255,0,0,1)";
	
	for(var i = 0;i < hexagons.length; i++){
	    deContext.beginPath();
		deContext.arc(hexagons[i].getCenter().x, hexagons[i].getCenter().y, 5, 0, Math.PI*2);
		deContext.closePath();
		deContext.fill();
	}
}

function drawHexagonsBasedOnPriority(){
    console.log("priority: "+hexagonsWithDrawingPriority.length);
	console.log("non-priority: "+hexagonsWithDrawingPriority.length);
		 for(var i = 0;i < hexagonsWithoutDrawingPriority.length; i++){
			//console.log("drawing hexagon on line "+i+"  colon "+j);
	        let hexagonToDraw = hexagonsWithoutDrawingPriority[i];	
            //console.log("Drawing hexagon nr: "+i*j);
			let maxDistance = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight
			let hexagonCenterX = hexagonToDraw.vertexA.pointA.x + hexagonWidth/2;
			let hexagonCenterY = hexagonToDraw.vertexA.pointA.y + hexagonHeight/2;
			var distance = Math.sqrt(Math.pow(mousePos.x - hexagonCenterX,2) + Math.pow(mousePos.y - hexagonCenterY,2));
            
			//console.log("maxDistance = "+maxDistance+"  distance = "+distance);
			
			var normatedValue = distance/maxDistance;
			//console.log("maxDistance = "+maxDistance+"  distance = "+distance+"  normatedValue = "+normatedValue+ "hexagonCenter = "+hexagonCenterX+", "+hexagonCenterY+"  mousePos = "+mousePos.x+", "+mousePos.y);
			
			var fillValue = (parseInt(255 * normatedValue));
			if (fillValue < 20){ fillValue = 20; }
            let fillStyleValue = hexagonToDraw.color;			
			deContext.fillStyle = fillStyleValue;
			//console.log("fillStyle = "+fillStyleValue);
			deContext.lineWidth = "2px";
			
			deContext.beginPath();
			//console.log("Starting to draw the hexagon at : "+ hexagonToDraw.vertexA.pointA.x + ", "+ hexagonToDraw.vertexA.pointA.y);
			deContext.moveTo(hexagonToDraw.vertexA.pointA.x, hexagonToDraw.vertexA.pointA.y);
			
			//console.log("Drawing line to : "+hexagonToDraw.vertexA.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexA.pointB.x, hexagonToDraw.vertexA.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexB.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
		    deContext.lineTo(hexagonToDraw.vertexB.pointB.x, hexagonToDraw.vertexB.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexC.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexC.pointB.x, hexagonToDraw.vertexC.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexD.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexD.pointB.x, hexagonToDraw.vertexD.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexE.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexE.pointB.x, hexagonToDraw.vertexE.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexF.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexF.pointB.x, hexagonToDraw.vertexF.pointB.y);
			
			deContext.closePath();
			deContext.fill();
		}
		
	    for(var i = 0;i < hexagonsWithDrawingPriority.length; i++){
			//console.log("drawing hexagon on line "+i+"  colon "+j);
	        let hexagonToDraw = hexagonsWithDrawingPriority[i];	
            //console.log("Drawing hexagon nr: "+i*j);
			let maxDistance = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight
			let hexagonCenterX = hexagonToDraw.vertexA.pointA.x + hexagonWidth/2;
			let hexagonCenterY = hexagonToDraw.vertexA.pointA.y + hexagonHeight/2;
			var distance = Math.sqrt(Math.pow(mousePos.x - hexagonCenterX,2) + Math.pow(mousePos.y - hexagonCenterY,2));
            
			//console.log("maxDistance = "+maxDistance+"  distance = "+distance);
			
			var normatedValue = distance/maxDistance;
			//console.log("maxDistance = "+maxDistance+"  distance = "+distance+"  normatedValue = "+normatedValue+ "hexagonCenter = "+hexagonCenterX+", "+hexagonCenterY+"  mousePos = "+mousePos.x+", "+mousePos.y);
			
			var fillValue = (parseInt(255 * normatedValue));
			if (fillValue < 20){ fillValue = 20; }
            let fillStyleValue = hexagons[i].color;			
			deContext.fillStyle = fillStyleValue;
			//console.log("fillStyle = "+fillStyleValue);
			deContext.lineWidth = "2px";
			
			deContext.beginPath();
			//console.log("Starting to draw the hexagon at : "+ hexagonToDraw.vertexA.pointA.x + ", "+ hexagonToDraw.vertexA.pointA.y);
			deContext.moveTo(hexagonToDraw.vertexA.pointA.x, hexagonToDraw.vertexA.pointA.y);
			
			//console.log("Drawing line to : "+hexagonToDraw.vertexA.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexA.pointB.x, hexagonToDraw.vertexA.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexB.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
		    deContext.lineTo(hexagonToDraw.vertexB.pointB.x, hexagonToDraw.vertexB.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexC.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexC.pointB.x, hexagonToDraw.vertexC.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexD.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexD.pointB.x, hexagonToDraw.vertexD.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexE.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexE.pointB.x, hexagonToDraw.vertexE.pointB.y);
			//console.log("Drawing line to : "+hexagonToDraw.vertexF.pointB.x + ", "+hexagonToDraw.vertexA.pointB.y);
			deContext.lineTo(hexagonToDraw.vertexF.pointB.x, hexagonToDraw.vertexF.pointB.y);
			
			deContext.closePath();
			deContext.fill();
		}
}

document.body.onload = function(){
    createHexagons();
    //drawTheInsideOfHexagons();

	setInterval(function(){ progressWaves();drawTheInsideOfHexagons();  drawHexagonsBasedOnPriority();  /*drawTheInsideOfHexagons(); drawContourOfHexagons(); drawHexagonsCenter(); drawWaves();*/}, 50);
}

document.body.onmousemove = function(e){
	//mousePos.x = e.clientX;
	//mousePos.y = e.clientY;
	
    //clearCanvas();
	
	//drawTheInsideOfHexagons();
	//drawContourOfHexagons();
}

document.body.onclick = function(e){
	mousePos.x = e.clientX;
	mousePos.y = e.clientY;
	
    //clearCanvas();
	
	startNewWave();
}