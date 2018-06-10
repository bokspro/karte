var citys = [
	{city: 'Riga', pops: 701185, lat: 56.9475, lon: 24.106389},
	{city: 'Daugavpils', pops: 98089, lat: 55.865348, lon: 26.562868},
	{city: 'Liepaja', pops: 79995, lat: 56.502294, lon: 21.019955},
	{city: 'Jalgava', pops: 62572, lat: 56.639862, lon: 23.725242},
	{city: 'Jurmala', pops: 57385, lat: 56.947968, lon: 23.618976},
	{city: 'Ventspils', pops: 40679, lat: 57.401730, lon: 21.576574},
	{city: 'Rezekne', pops: 32630, lat: 56.484768, lon: 27.346534},
	{city: 'Ogre', pops: 25894, lat: 56.803410, lon: 24.621935},
	{city: 'Saldus', pops: 11686, lat: 56.689115, lon: 22.495258}
];

function getPos(lon,lat){
	LatLon.x = width * ((lon-westLong)/(eastLong-westLong)); 
	LatLon.y = height * ((northLat-lat)/(northLat-southLat));
}
function loadCitys(){
	for(var i=0,l=citys.length;i<l;i++){
		getPos(citys[i].lon,citys[i].lat);
		myAppArea.context.fillStyle = 'green';
        myAppArea.context.beginPath();
        myAppArea.context.arc(LatLon.x,LatLon.y,Math.sqrt((citys[i].pops/citys[0].pops)*40000*4095/width),0,2*Math.PI);
        myAppArea.context.strokeStyle='yellow';
        if(this.alpha==true){
            myAppArea.context.strokeStyle="blue";
        }
        myAppArea.context.stroke();
        myAppArea.context.fill();
	}
	myAppArea.context.strokeStyle = 'red';
	myAppArea.context.lineWidth=5;
}