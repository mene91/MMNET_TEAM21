var TiBeacons = null;
if (Ti.Platform.name === "android") {
  TiBeacons = require("com.liferay.beacons");
} else {
  console.log("liferay.beacons not supported on " + Ti.Platform.name);
}
var scanP=500; var idleP=200;
TiBeacons.setBackgroundMode(false);
TiBeacons.setScanPeriods({
  foregroundScanPeriod: scanP,
  foregroundBetweenScanPeriod: idleP,
  backgroundScanPeriod: scanP,
  backgroundBetweenScanPeriod: idleP
});
//alert('funziona: '+ TiBeacons.checkAvailability());


function doClick(e) {
    alert($.label.text);
}



	// make a window with two buttons to start and stop monitoring
var win = Titanium.UI.createWindow({
    title:'SmartShopApp',
    backgroundColor:'#fff'
});

var b1 = Titanium.UI.createButton({
    title: "Start Monitoring"
});
var b2 = Titanium.UI.createButton({
    title: "Stop Monitoring"
});
var b3 = Titanium.UI.createButton({
    title: "Settings"
});
var b4 = Titanium.UI.createButton({
    title: "Reset messages"
});


var ip='http://ibeaconsteam21.herokuapp.com';
var port='80';



var showAlways=false;

var visualizeContent= function(obj){
//It Enters in this function when the first rensponse is received (content type and link to the content)
			
		/*var dialog = Ti.UI.createAlertDialog({
    		cancel: 1,
    		buttonNames: ['Si', 'No','Yes and do not ask again'],   //l' indice parte da 0 a sinistra ma i tasti appaiono rovesci SULL APP
    		message: 'You received some content, would you like to display it?',
    		title: 'Content received!!!'
  			});

  		dialog.addEventListener('click', function(e){
    	
    	if(e.index==2){  //------> Don't ask again'
    		showAlways=true;
    	}
    	
		if (showAlways||e.index === 0 ){   //I want to receive the content*/
           
      /*************************************************DISPLAY IMAGE CONTENT*******************************************************/

		var label2 = Ti.UI.createLabel({
 		 color: '#900',
  		font: { fontSize:24 },
  		shadowColor: '#aaa',
  		shadowOffset: {x:5, y:5},
  		shadowRadius: 3,
  		text: obj.msg,
 		 textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
 		 top: 30,
  		width: Ti.UI.SIZE, height: Ti.UI.SIZE
		});
/*
		var label2 = Ti.UI.createLabel({
 		 color:'blue',
  		text: obj.msg,
 		 textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
 		 top: 30,
 		 width: 300, height: 200
		});*/
         if(obj.type=='image+audio')
        {	var player;var playing=false;
        	var win2 = Titanium.UI.createWindow({
        	title:obj.title,
        	backgroundColor:'#fff',
        	modal:false,
        	
        	
        	});
			var bPlay = Titanium.UI.createButton({
   			title: "Play/Pause"
			});
            
			player = Ti.Media.createSound({url: obj.linkaudio});
			
			
			
    		bPlay.addEventListener('click', function(e) {
    			
    			if(playing==true){player.pause(); playing=false;} 				
    			else {player.play(); playing=true;}
				
			});
			
			     
           
			win2.setLayout('vertical');win2.add(label2);
 		win2.add(bPlay);
  
        	var immagine = Titanium.UI.createImageView({
   			//image:  obj.link + Math.random(),   //------> link to the wanted image! (in the database)
			enableZoomControls: true,
			
			});	
	     	win2.add(immagine);
	     	var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
	c.onload = function() {
    			if(c.status == 200) {
        	immagine.image = this.responseData;
		win2.open();player.play();playing=true;
        	immagine.width = 300;
        	immagine.heigth = 'auto';
        	immagine.canScale = true;
        
   			 }
		};
 
	c.open('GET', obj.linkimage);
	c.send();
	     	//
        }
	    




 if(obj.type=='image')
        {	
        	var win2 = Titanium.UI.createWindow({
        	title:obj.title,
        	backgroundColor:'#fff',
        	modal:false,
        	
        	
        	});

			win2.setLayout('vertical');
        	var immagine = Titanium.UI.createImageView({
   			//image:  obj.link + Math.random(),   //------> link to the wanted image! (in the database)
			enableZoomControls: true,
			
			});	win2.add(label2);
	     	win2.add(immagine);
	     	var c = Titanium.Network.createHTTPClient();
		c.setTimeout(10000);
	
	c.onload = function() {
    			if(c.status == 200) {
        	immagine.image = this.responseData;win2.open();
        	immagine.width = 300;
        	immagine.heigth = 'auto';
        	immagine.canScale = true;
        
   			 }
		};
 
	c.open('GET', obj.linkimage);
	c.send();
	     	//win2.open();
        }
		
	    /*************************************************PLAY AUDIO CONTENT*******************************************************/
	    if(obj.type=='audio')
	    {    
	    	
	    	var loaded=false;
	    	var player;    //metterei player e loaded nel main
	    	var audio_win = Titanium.UI.createWindow({
            title:obj.title,
        	backgroundColor:'#fff',
        	modal:false
        	});	player = Ti.Media.createSound({url: obj.linkaudio});
			audio_win.open();loaded=true;
			player.play();

			audio_win.setLayout('vertical');
			
			var bPlay = Titanium.UI.createButton({
   			title: "play"
			});
            var bPause = Titanium.UI.createButton({
    		title: "pause"
			});
            var bStop = Titanium.UI.createButton({
    		title: "stop"
			});	       
			
			var bReplay = Titanium.UI.createButton({
    		title: "replay"
			});
			
    		bPlay.addEventListener('click', function(e) {
    			
    			if(!loaded)
    			{
    				//player = Ti.Media.createSound({url: obj.linkaudio});  //------> Open the wanted content requesting the server
    				loaded=true;
    			}
				player.play();
			});
			
			bPause.addEventListener('click', function(e) {
    			
    			if(loaded)
    			{
    				player.pause();
    			}
				
			});			  
                         
            bStop.addEventListener('click', function(e) {
    			
    			if(loaded)
    			{
    				player.stop();
    			}
				
			});		             
                         
            bReplay.addEventListener('click', function(e) {
    			
    			if(loaded)
    			{
    				player.reset();
    			}
				
			});   
	audio_win.add(label2);         
            audio_win.add(bPlay);
            audio_win.add(bPause);
            audio_win.add(bStop);
            audio_win.add(bReplay);      
    		audio_win.open();
        }
        //******************************END AUDIO CONTENT****************************
        
        //*******************************************DISPLAY VIDEO CONTENT***************************************
        if(obj.type=='video')
	    {
	    	var vidWin = Titanium.UI.createWindow({
    			title : obj.title,
    			backgroundColor : '#fff'
			});
			
	    	var openButton = Ti.UI.createButton({
    			title : "Start Video",
    			top : "0dp",
    			height : "40dp",
    			left : "10dp",
    			right : "10dp"
				});

			openButton.addEventListener('click', function() {
    		
    			var activeMovie = Titanium.Media.createVideoPlayer({
        			url : obj.linkvideo, //link to the wanted content in the database
        			backgroundColor : 'blue',
        			movieControlMode : Titanium.Media.VIDEO_CONTROL_DEFAULT,
        			scalingMode : Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
        			fullscreen : true,
        			autoplay : true
    				});

    			var closeButton = Ti.UI.createButton({
        			title : "Exit Video",
        			top : "0dp",
        			height : "40dp",
        			left : "10dp",
        			right : "10dp"
    				});

    			closeButton.addEventListener('click', function() {
        		
        			activeMovie.hide();
        			activeMovie.release();
        			activeMovie = null;
    				});
    
    			activeMovie.add(closeButton);
			});
		vidWin.add(label2);
		  vidWin.add(openButton);
		  vidWin.open();
	   
	    }//--------> end video content    

 //   }//--_> end if yes or don't ask me again
  //  }); //----> end dialog listener
     
 /*  if(!showAlways){
  		dialog.show();
   }
        
	if(showAlways){
		dialog.fireEvent('click','click');
	}*/
};



var contactServerContent= function(url, position) {     
	 
	 //this is the first request to the server (asking the position)       
	
	// var obj = JSON.parse(this.responseText);
    /* var dialog = Ti.UI.createAlertDialog({
    		cancel: 1,
    		//buttonNames: ['Si', 'No','Yes and do not ask again'],   //l' indice parte da 0 a sinistra ma i tasti appaiono rovesci SULL APP
    		message: 'Hey you are near the ' + position ,
    		title: position,
  		});*/

  		 
  		
     			alert('Hey you are near the ' + position);
 					var client = Ti.Network.createHTTPClient({
    
					 // function called when the response data is available

					     onload : function(e) {
     	
     						var obj = JSON.parse(this.responseText); //the rensponse will contain the type of the content and the location (link)
     						visualizeContent(obj);
     	
     						},

     					// function called when an error occurs, including a timeout

    					 onerror : function(e) {
       						  Ti.API.debug(e.error);
         						alert('error: cannot connect with the server for the content');
     						},
     						timeout : 10000  // in milliseconds
 					});    
 					
 					 // Prepare the connection.
 					client.open("GET", url);

 						// Send the request.
 					client.send();			
     		
     			
     		
        
		
        
};

var contactServerPosition= function(url) {     
	 
	 //this is the first request to the server (asking the position)       
	 var client = Ti.Network.createHTTPClient({
    
 // function called when the response data is available

     onload : function(e) {
     	
     					var obj = JSON.parse(this.responseText); //the rensponse will contain the type of the content and the location (link)
     						/*var url_pos=ip+":"+port+"/content/"+obj.position;
     						Ti.API.debug(url_pos);
     						contactServerContent(url_pos,obj.position);
     						var obj = JSON.parse(this.responseText); //the rensponse will contain the type of the content and the location (link)
     					*///alert("First rensponse received...");
     						visualizeContent(obj);
    	}, //------>end of onload

     // function called when an error occurs, including a timeout

     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error: cannot connect with the server for the position');
     },
     timeout : 10000  // in milliseconds
 });

 // Prepare the connection.
 client.open("GET", url);

 // Send the request.
 client.send();
	        
	        
};


//beaconsssssssssssssssssssssssssssss

var messages = {uuid: 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E', welcome:false, bye: false, middle: false,  beacons: [{major: 21134, message: false},{major: 7097, message:false}]};
var setAllFalse = function(){
     
     messages.welcome = false;
	messages.bye = false;
	messages.beacons[0].message = false;
	messages.beacons[1].message = false;

	messages.middle= false;

};


var contentAlreadyShown = function(major){
	 var shown = false;
	for(var  i=0; i<2; i++)
  {  if(messages.beacons[i].major == major)
       { shown = messages.beacons[i].message;console.log("letto  ");
}
  }
   return shown;
};

var setContentAsShown = function(major)
{ 
	for(var  i=0; i<2; i++)
  {  if(messages.beacons[i].major == major)
       { messages.beacons[i].message = true; console.log("scritto  ");
}
  }
   
};



var entered = function(reg) {
    //alert("entered region: " + reg.identifier );
	console.log("entered region: " + reg.identifier );
    
        var url = ip+":"+port+"/position/"+"entered="+reg.identifier;
	contactServerPosition(url);
    
};

var exited = function(reg) {
   // alert("exited region: " + reg.identifier);
	console.log("exited region: " + reg.identifier);
        var url = ip+":"+port+"/position/"+"exited="+reg.identifier;
	contactServerPosition(url);
setAllFalse();
   /* for(var i=0;i<beacons_in_proximity.length;i++){
	    
	   if( objectArray[i].uuid == old_uuid){
	   	
	   	objectArray.splice(i, 1); break;
	   }
	
	}*/
};

var range_2_beacons = true;
var proximity = function(e){

var url = ip+":"+port+"/position/"+e.uuid;
	//contactServerPosition(url);
	//alert ('beacons: '+e.uuid);
 console.log("I see " + e.beacons.length +" beacons!");
e.beacons.forEach(function (beacon,index){
  	
  console.log("identifer: " + beacon.identifier);
  console.log("uuid: " + beacon.uuid);
  console.log("major: " + beacon.major);
  console.log("minor: " + beacon.minor);
  console.log("proximity: " + beacon.proximity);
  console.log("accuracy: " + beacon.accuracy);
  console.log("rssi: " + beacon.rssi);
  console.log("power: " + beacon.power);
  });
  
if((e.beacons.length==2)&&range_2_beacons)
{	

	console.log("major1: " + e.beacons[0].major);
	console.log("rssi1: " + e.beacons[0].rssi);
console.log("major2: " + e.beacons[1].major);
	console.log("rssi2: " + e.beacons[1].rssi);

if((e.beacons[0].rssi <=t3)&&(e.beacons[0].rssi >-91) && (e.beacons[1].rssi <=t3)&&(e.beacons[1].rssi >-91))//+ lontano da entrambi (in mezzo)
	{console.log("in mezzo e lontano" );

		if(!messages.middle)
		{	//alert("in mezzo!");
console.log("in mezzo!");

        var url = ip+":"+port+"/position/"+"middle="+e.beacons[0].major+"+"+e.beacons[1].major;
	contactServerPosition(url);
	messages.middle=true; 
                     }// mai ricevuto

         }
   else
   {
   if(e.beacons[0].rssi >=t1) //+ vicino al primo
	{console.log("vicino a " + e.beacons[0].major);

      	if (!contentAlreadyShown (e.beacons[0].major))
		{//messages.beacon1.message=true;
			setContentAsShown(e.beacons[0].major);

		var url = ip+":"+port+"/position/"+e.beacons[0].major;
	contactServerPosition(url);

		//alert("beacon :"+e.beacons[0].major);
console.log("beacon :"+e.beacons[0].major);

		}
     	}
   else
   {
   	if(e.beacons[1].rssi >=t2) //+ vicino al secondo
		{console.log("vicino a " + e.beacons[1].major);


		if (!contentAlreadyShown (e.beacons[1].major))
		{//messages.beacon1.message=true;
		setContentAsShown(e.beacons[1].major);

		//alert("beacon :"+e.beacons[1].major);
console.log("beacon :"+e.beacons[1].major);
var url = ip+":"+port+"/position/"+e.beacons[1].major;
	contactServerPosition(url);
		}

		}
   
   }
   }
 

}

else{

if(!range_2_beacons)
{  e.beacons.forEach(function (beacon,index){
if(beacon.rssi >=-85) 
		{console.log("vicino a " + beacon.major);


		if (!contentAlreadyShown (beacon.major))
		{//messages.beacon1.message=true;
		setContentAsShown(beacon.major);

		//alert("beacon :"+beacon.major);
console.log("beacon :"+beacon.major);
var url = ip+":"+port+"/position/"+beacon.major;
	contactServerPosition(url);
		}}

		});
}

}


     
};

b1.addEventListener('click', function(e) {
		
		
    // add the listeners for beacon region monitoring
    TiBeacons.addEventListener("enteredRegion", entered);
    TiBeacons.addEventListener("exitedRegion", exited);
	TiBeacons.addEventListener("beaconRanges", proximity);
	
	
    // start monitoring in the button click callback
    TiBeacons.startMonitoringForRegion({
      identifier: 'region A',
      uuid: 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E'
    });
});

b2.addEventListener('click', function(e) {

    // stop everything
    TiBeacons.stopMonitoringAllRegions();
    TiBeacons.removeEventListener("enteredRegion", entered);
    TiBeacons.removeEventListener("exitedRegion", exited);
    TiBeacons.removeEventListener("beaconRanges", proximity);
setAllFalse();
});

b3.addEventListener('click', function(e) {
	

	win_sett.open();
});

b4.addEventListener('click', function(e) {
	
	setAllFalse();

	});
	var win_sett = Titanium.UI.createWindow({
    title:'Settings',
    backgroundColor:'#fff',
    modal:false
	});
    
    var textField = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		top: 10, left: 10,
  		width: 250, height: 60,
  		hintText: 'Server IP addr'
		});

	var textFieldPort = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		top: 10, left: 10,
  		width: 250, height: 60,
  		hintText: 'Server Port Number'
		});
var textFieldb1 = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		top: 10, left: 10,

  		width: 250, height: 60,
  		hintText: 'th b1'
		});
var textFieldb2 = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		top: 10, left: 10,

  		width: 250, height: 60,
  		hintText: 'th b2'
		});
var textFieldbb = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		top: 10, left: 10,

  		width: 250, height: 60,
  		hintText: 'th both'
		});
var textFieldidleP = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		top: 10, left: 10,
  		width: 250, height: 60,
  		hintText: 'idle Period ms'
		});
var textFieldscanP = Ti.UI.createTextField({
  		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  		color: '#336699',
  		top: 10, left: 10,
  		width: 250, height: 60,
  		hintText: 'scan Period ms'
		});

	var checkbox = Ti.UI.createSwitch({
  		style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
  		textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
		color: '#000',
  		title:'Range 2 beacons',
  		value:true,
  		width: 300,
  		left: 18
});


checkbox.addEventListener('change',function(e){
  //function
  Ti.API.info('Switch value: ' + checkbox.value);
  range_2_beacons=checkbox.value;
});
	
	textField.addEventListener('change',function(e){
       ip = e.value;
		});

	textFieldPort.addEventListener('change',function(e){
       port = e.value;
	});
textFieldb1.addEventListener('change',function(e){
       t1 = e.value;
	});
textFieldb2.addEventListener('change',function(e){
       t2 = e.value;
	});
textFieldbb.addEventListener('change',function(e){
       t3 = e.value;
	});
textFieldscanP.addEventListener('change',function(e){
       scanP = e.value;
	});
textFieldidleP.addEventListener('change',function(e){
       idleP = e.value;
	});


	win_sett.add(textField);
	win_sett.add(textFieldPort);

win_sett.add(textFieldb2);
win_sett.add(textFieldb1);
win_sett.add(textFieldbb);
//win_sett.add(textFieldscanP);
//win_sett.add(textFieldidleP);
	win_sett.add(checkbox);
	win_sett.add(b4);
	win_sett.setLayout('vertical');
win.setLayout('vertical');
win.add(b1);
win.add(b2);
win.add(b3);
win.open();

var t1=-80; var t2=-80; var t3=-87; 
	
