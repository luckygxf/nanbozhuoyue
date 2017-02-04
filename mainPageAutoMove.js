var xPos = 15; 
var yPos = document.body.clientHeight; 
var step = 1; 
var delay = 30; 
var height = 0; 
var Hoffset = 0; 
var Woffset = 0; 
var yon = 0; 
var xon = 0; 
var pause = true; 
var interval; 
mainPageText.style.top = yPos; 
function changePos() { 
	width = document.body.clientWidth; 
	height = document.body.clientHeight; 
	Hoffset = mainPageText.offsetHeight; 
	Woffset = mainPageText.offsetWidth; 
	mainPageText.style.left = xPos + document.body.scrollLeft; 
	mainPageText.style.top = yPos + document.body.scrollTop; 
	if (yon) { 
		yPos = yPos + step; 
	} 
	else { 
		yPos = yPos - step; 
	} 
	if (yPos < 0) { 
		yon = 1; 
		yPos = 0; 
	} 
	if (yPos >= (height - Hoffset)) { 
	yon = 0; 
	yPos = (height - Hoffset); 
	} 
	if (xon) { 
	xPos = xPos + step; 
	} 
	else { 
	xPos = xPos - step; 
	} 
	if (xPos < 0) { 
	xon = 1; 
	xPos = 0; 
	} 
	if (xPos >= (width - Woffset)) { 
		xon = 0; 
		xPos = (width - Woffset); 
	} 
} 
function start() { 
	mainPageText.visibility = "visible"; 
	interval = setInterval('changePos()', delay); 
} 
start(); 