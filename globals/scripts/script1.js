var LatLon = {
    x: 0.0,
    y: 0.0
};
var lines = {
    x1: 0.0,
    y1: 0.0,
    x2: 0.0,
    y2: 0.0,
    z: 1.0
};
var width;
var height;
var cords;

// X and Y boundaries
var westLong = 20.967488;
var eastLong = 28.242923;
var northLat = 58.085900;
var southLat = 55.674427;

var background = new Image();
background.src = "latvija.png";
var body = document.getElementById('body');

var began=false;
RAD2DEG = 180 / Math.PI;
PI_4 = Math.PI / 4;

var tracker;

var myAppArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.height = body.offsetHeight*2;
        this.canvas.width = body.offsetWidth*2;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateCanvas, 3000);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function startApp() {
    width = 4095;
    height = 2477;
    myAppArea.start();
    var imageWidth = 0;
    var imageHeight = 0;

        if(background.complete){
            if (width/height > body.offsetWidth/body.offsetHeight) {
                imageWidth = body.offsetWidth;
                imageHeight = background.height * (imageWidth / background.width);//parseInt(background.height * (imageWidth / background.width));
            console.log('width');
            } else {
                imageHeight = body.offsetHeight;
                imageWidth = background.width * (imageHeight / background.height);//parseInt(background.width * (imageHeight / background.height));
            console.log('height');
            }

            console.log(imageWidth);
            console.log(imageHeight);

            myAppArea.context.drawImage(
                background,
                0,
                0,
                imageWidth*2,
                imageHeight*2
            );
            cords = document.createElement("h1");
            cords.appendChild(document.createTextNode('Latitude: ' + LatLon.y + ' Longitude: ' + LatLon.x));
            document.body.appendChild(cords);

            width=imageWidth*2;
            height=imageHeight*2;
            lines.z=height;
            // } else {
            //     background.onload = function(){
            //         myAppArea.context.drawImage(
            //             background,
            //             0,
            //             0,
            //             imageWidth,
            //             imageHeight
            //         );
            //     };
            // }
            //localStorage.clear();
            //updateCanvas();
            if(localStorage.length){        
                for ( var i = 0, len = localStorage.length; i < len; ++i ) {

                    pos = ( JSON.parse(localStorage.getItem( localStorage.key( i ) ) ) );
                    myAppArea.context.strokeStyle="#FF0000";
                    myAppArea.context.beginPath();
                    myAppArea.context.moveTo(pos.x1*height/pos.z,pos.y1*height/pos.z);
                    myAppArea.context.lineTo(pos.x2*height/pos.z,pos.y2*height/pos.z);
                    myAppArea.context.stroke();
                }
            }
            loadCitys();
            myAppArea.context.beginPath();
            getLocation();
    }
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        wrapText(myAppArea.context,"Geolocation is not supported by this browser.",width/2-100,height/2-15,width,300);
    }
}

function showPosition(position) {
    var lon=position.coords.longitude;
    var lat=position.coords.latitude;

    cords.innerHTML = 'Latitude: ' + lat + ' Longitude: ' + lon;

    LatLon.x = width * ((lon-westLong)/(eastLong-westLong)); 
    LatLon.y = height * ((northLat-lat)/(northLat-southLat));
    if(began==true){

         //bauska
        lines.x2 = LatLon.x; 
        lines.y2 = LatLon.y;
        localStorage.setItem(localStorage.length, JSON.stringify(lines));
        myAppArea.context.lineTo(LatLon.x,LatLon.y);
        myAppArea.context.stroke();
        //myAppArea.context.fillRect(LatLon.x-2, LatLon.y-2, 4, 4);
        myAppArea.context.beginPath();
        myAppArea.context.moveTo(LatLon.x,LatLon.y);
        lines.x1 = LatLon.x; 
        lines.y1 = LatLon.y;
    }else{
        myAppArea.context.moveTo(LatLon.x,LatLon.y);
        lines.x1 = LatLon.x; 
        lines.y1 = LatLon.y;
        began=true;
    }
}
function wrapText(context, text, x, y, maxWidth, lineHeight) {
var words = text.split(' ');
var line = '';

for(var n = 0; n < words.length; n++) {
  var testLine = line + words[n] + ' ';
  var metrics = context.measureText(testLine);
  var testWidth = metrics.width;
  if (testWidth > maxWidth && n > 0) {
    context.fillText(line, x, y);
    line = words[n] + ' ';
    y += lineHeight;
  }
  else {
    line = testLine;
  }
}
context.fillText(line, x, y);
}

function showError(error) {
    myAppArea.context.font = "30px Arial";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            wrapText(myAppArea.context,"User denied the request for Geolocation.",width/2-100,height/2-15,width,300);

            break;
        case error.POSITION_UNAVAILABLE:
            wrapText(myAppArea.context,"Location information is unavailable.",width/2-100,height/2-15,width,300);

            break;
        case error.TIMEOUT:
            wrapText(myAppArea.context,"The request to get user location timed out.",width/2-100,height/2-15,width,300);

            break;
        case error.UNKNOWN_ERROR:
            wrapText(myAppArea.context,"An unknown error occurred.",width/2-100,height/2-15,width,300);
           
            break;
    }
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
     // talsi
        //localStorage.setItem("vardi", visi);
        /*
            for (var key in localStorage){
                console.log(key)
            }
            JSON.stringify(users);
            JSON.parse(localStorage['users']);
            https://www.youtube.com/watch?v=RbfG7NLKDgQ
        */
       localStorage.clear();

    /*lines.x1 = width * ((22.531332-westLong)/(eastLong-westLong)); 
    lines.y1 = height * ((northLat-57.320654)/(northLat-southLat));
     //bauska
    lines.x2 = width * ((24.861906-westLong)/(eastLong-westLong)); 
    lines.y2 = height * ((northLat-56.539413)/(northLat-southLat));
    localStorage.setItem(localStorage.length, JSON.stringify(lines));
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        console.log( JSON.parse(localStorage.getItem( localStorage.key( i ) ) ) );
    }*/
    getLocation();
    //console.log('x: '+ LatLon.x + ' y: ' +LatLon.y);



   
   // getLocation();
    //console.log('x: '+ LatLon.x + ' y: ' +LatLon.y);
    //myAppArea.context.fillStyle = "#FF0000";
    //myAppArea.context.fillRect(LatLon.x-10,LatLon.y-10,20,20);
}