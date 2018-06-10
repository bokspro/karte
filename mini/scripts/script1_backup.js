var x 
var c
var pieskx=0;
var piesky=0; 
var ctx
var flag=true;
var myGamePiece;
var myObstacles = [];
var myScore;

var LatLon = {
    x: 0.0,
    y: 0.0
};
var cordas = new Array();
/*cordas.push(LatLon);
cordas[0].x;*/
var width;
var height;
// X and Y boundaries
var westLong = 21.053654;
var eastLong = 28.242923;
var northLat = 58.085900;
var southLat = 55.674427;
/*var background = new Image();
background.src = "latvija.png";*/

RAD2DEG = 180 / Math.PI;
PI_4 = Math.PI / 4;

var myAppArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = document.body.clientWidth;     
        //console.log(this.canvas.width);                    
        this.canvas.height = document.body.clientHeight;     
       // console.log(this.canvas.height);
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateCanvas, 200);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function startApp() {
   width = document.body.clientWidth; 
  height = document.body.clientHeight;
    myAppArea.start();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    //alert(position.coords.longitude + ' ' + position.coords.latitude)
    //LatLon.x = width * ((westLong-22.604332)/(westLong-eastLong)); 
    //LatLon.y = (height * ((northLat-57.759354)/(northLat-southLat)));
    LatLon.y = (((Math.log(Math.tan((position.coords.latitude / 90 + 1) * PI_4 )) * RAD2DEG)-(Math.log(Math.tan((southLat / 90 + 1) * PI_4 )) * RAD2DEG))/(northLat-southLat))*height;
   // LatLon.x = (position.coords.longitude-westLong)/(eastLong-westLong)*width;
   // alert(LatLon.y + ' ' + LatLon.x)
   LatLon.x = ((Math.log(Math.tan((position.coords.longitude / 90 + 1) * PI_4 )) * RAD2DEG)-(Math.log(Math.tan((westLong / 90 + 1) * PI_4 )) * RAD2DEG))/(eastLong-westLong)*width;

}

function getDistanceFromLatLon(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM    
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}



function updateCanvas(){
    myAppArea.clear();
    getLocation();
    if (flag && LatLon.x>0)
    {
       /*while (LatLon.x==0)
            {
                console.log("error");
                getLocation();
            }*/
        pieskx=(width/2)-LatLon.x;
        piesky=(height/2)-LatLon.y;
      flag=false;
    }
    //console.log('x: '+ LatLon.x + ' y: ' +LatLon.y);
    if (LatLon.x>0) {
    cordas.push(LatLon);var c = document.getElementById("myCanvas");
    for (var i=0;i<cordas.length;i++)
    {
        myAppArea.context.fillStyle = "#FF0000";
        myAppArea.context.fillRect(cordas[i].x+pieskx,cordas[i].y+piesky,5,5);
       /* myAppArea.context.beginPath();
                    myAppArea.context.moveTo(pos.x1,pos.y1);
                    myAppArea.context.lineTo(pos.x2,pos.y2);
                    myAppArea.context.stroke();*/
        myAppArea.context.beginPath();
        myAppArea.context.moveTo(cordas[i-1].x+pieskx,cordas[i-1].y-piesky);
       // myAppArea.context.lineTo(cordas[i].x+pieskx,cordas[i].y-piesky);
         myAppArea.context.stroke();
    }
    myAppArea.context.beginPath();
    console.log(LatLon.x+pieskx);
    console.log(LatLon.y+piesky)
}
}



