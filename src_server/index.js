var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

var multer= require ('multer');

var n_query=0;
var N_QUERY_OFFERT= 5;
app.use(multer());

//*************************stn
var Db = require('mongodb').Db,
   
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code;

/////////////////////////
var mongo= require('mongodb').MongoClient, assert = require('assert');

var BSON = require('mongodb').BSONPure;
//var uri= process.env.MONGOLAB_URI;
//var uri = "mongodb://admin:admin@ds027521.mongolab.com:27521/firstdb";
var uri = "mongodb://heroku_app37011580:tb9s93lrjrmn1kh322e41omb2k@ds031952.mongolab.com:31952/heroku_app37011580";
//var uri = "mongodb://127.0.0.1:27017/firstdb";
//*************************






app.use(bodyParser.urlencoded({ extended: true }));// initialize appimport java.io.IOException;
;
fs = require('fs');

var tracked_Region = {number_region: 1,  region: [{ uuid: 'F7826DA6-4FA2-4E98-8024-BC5B71E0893E', identifier: 'region A'}] };



app.get('/UpdateRequest', function (req, response) {

console.log(req.url);
   response.contentType('application/JSON');

	

 var objJSON = JSON.stringify(tracked_Region);
   	response.send(objJSON);

;
});



var ip = '192.168.1.102';
var port;


//************************Parte html per web page
var html;
fs.readFile('./index.html', function( err,data){
    html = data;
     });

app.get('/config/:field', function (req, response) {
  
  var field = (req.params.field);
      fs.readFile('./'+field, function( err,data){
      response.contentType('text/html');
      response.send(data);
      });
  console.log(req.url);
});

app.get('/', function (req, response) {

	response.contentType('text/html');
	response.send(html);  
	console.log(req.url);
});

//************************************************************


//reading ip address of wifi interface!

var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0
    ;

  ifaces[ifname].forEach(function (iface) {

   if((ifname== 'wlan0')&&(iface.family== 'IPv4'))
	{

	ip= iface.address; }
   
  });
});


var server = app.listen(process.env.PORT||3000, function () {

  var host = server.address().address;
   port = server.address().port;

  console.log('Beacons server listening at http://%s:%s', ip, port);

});

	



//add matching uuid position using browser

//OK
app.post('/position/add', function(req,response){
	console.log(req.url);
	var new_uuid =req.body.uuid;
	var new_position= req.body.position;
	var updated= false;
response.contentType('text/html');
var text='<html><head><title> Position Added!</title></head><body> <p><form method="get" action=/>Back to the home <button type= "submit"> Home</button></form>';
//contents button
text += '<form method = "get" action=/config/positions.html>Configure positions: <button type= "submit" >Positions</button></form>';
text += '<form method="get" action=/position/all>Show all positions:  <button type= "submit"> all</button>';

text +='</form>New uuid-position matching added!<pre>';
mongo.connect (uri,function (err,db)
		{
			
			if (err)
			{
				console.log('error');
				return;
			}
			console.log('db conn');
	
			db.collection('coll1', function(err, collection) 
		    {
			    if (err) 
			    {
			        console.log('error');
			        return;
			    }
				    var mydocins =
						    [
						      {
						        uuid: new_uuid,
						        position: new_position
						      }
						      ];
				    console.log('insert'+mydocins+'\n');
				    collection.insert(mydocins);
				collection.find({}).toArray(function(err, results)
			   {
			    	
					console.log(results+ "\n");
					
					results.forEach(function(doc) {
					    console.log("Doc from Array ");
					    console.dir(doc);
text += 'uuid: '+doc.uuid+'<p allign= centre>position: '+ doc.position + '</p><br>';
					  });
					text +='</pre>';
					response.send(text +'</body><html>');
				});
				
			
		
				    
		    });
		});
});

//OK
app.post('/position/remove', function(req,response){
	console.log(req.url);

var old_uuid =req.body.uuid;
	
	var updated= false;
	
var text='<html><head><title> Position Removed!</title></head><body> <p><form method="get" action=/>Back to the home <button type= "submit"> Home</button></form>';
//contents button
text += '<form method = "get" action=/config/positions.html>Configure positions: <button type= "submit" >Positions</button></form>';
text += '<form method="get" action=/position/all>Show all positions:  <button type= "submit"> all</button>';

text +='</form>uuid-position matching removed!<pre>';
	
	mongo.connect (uri,function (err,db)
		{
			
			if (err)
			{
				console.log('error');
				return;
			}
			console.log('db conn');
	
			db.collection('coll1', function(err, collection) 
		    {
			    if (err) 
			    {
			        return;
			    }
				    
				   
				    collection.remove ({uuid: old_uuid},1);
			collection.find({}).toArray(function(err, results)
			   {
			    	
					console.log(results+ "\n");
					
					results.forEach(function(doc) {
					    console.log("Doc from Array ");
					    console.dir(doc);
					text += 'uuid: '+doc.uuid+'<p allign= centre>position: '+ doc.position + '</p><br>';
										  });
					text +='</pre>';
					response.send(text +'</body><html>');
			    	
				});

				    
		    });
		});    
	
	
	  


});
//OK
//display all the matching
app.get('/position/all', function(req,response){
	console.log(req.url);
	response.contentType('text/html');
	
var text='<html><head><title> Positions</title></head><body> <p><form method="get" action=/>Back to the home <button type= "submit"> Home</button></form>';
//contents button
text += '<form method = "get" action=/config/positions.html>Configure positions: <button type= "submit" >Positions</button></form>';
text +='<pre>';
mongo.connect (uri,function (err,db)
		{
			
			if (err)
			{
				console.log('error');
				return;
			}
			console.log('db conn');
		
			db.collection('coll1', function(err, collection) 
			{
			    if (err) 
			    {
			        console.log('error');
			    }
			   
			   collection.find({}).toArray(function(err, results)
			   {
			    	
					console.log(results+ "\n");
					
					results.forEach(function(doc) {
					    console.log("Doc from Array ");
					    console.dir(doc);
						text += 'uuid: '+doc.uuid+'<p allign= centre>position: '+ doc.position + '</p><br>';
					  });
					text +='</pre>';
					response.send(text +'</body><html>');
					
				});
				
			});
		
		});



});

// resolution: return position,type,title,message,id,link of a content from one uuid

app.get('/position/:uuid', function (req, response) {
   


var _uuid = (req.params.uuid);
   	response.contentType('application/json');
	console.log('/position/'+_uuid+'\n');
temp = "undefined";
temp1 = "undefined";
var selected_title; var typeF; var idF;
var imageid="undefined",audioid="undefined",videoid="undefined";
var cuttitle;

		//MATCHING UUID - POSITION
		mongo.connect (uri,function (err,db)
		{
			
			if (err)
			{
				console.log('error');
				return;
			}
			console.log('db conn');
		
			db.collection('coll1', function(err, collection) 
			{
			    if (err) 
			    {
			        console.log('error');
			    }
			   console.log('coll1 conn');
			   collection.find({uuid: _uuid}).toArray(function(err, results)
			   {
			    	
					
					results.forEach(function(doc) 
					{
						console.log("uuid: "+ _uuid+"\n");
						console.dir(doc);
						temp1 = doc;
						posF=temp1.position;
						console.log("position Fin: "+JSON.stringify(posF)+ "\n");
						db.close();
					});
		//MATCHING POSITION - TITLES
		mongo.connect (uri,function (err,db)
		{
			
			if (err)
			{
				console.log('error');
				return;
			}
			console.log('db conn');
		
			db.collection('coll2', function(err, collection) 
			{
			    if (err) 
			    {
			        console.log('error');
				return;
			    }
			   console.log('coll2 conn');
			   collection.find({position: temp1.position}).toArray(function(err, results)
			   {
			    	
			    			posF=temp1.position;
					
					results.forEach(function(doc) {
					    console.log("find position: "+ temp1.position+"\n");
					    console.dir(doc);temp = doc;
		cuttitle=temp.title.split('_')[0];//tolgo la seconda parte del titolo es: goodmorning_enter
		//matching in base all' ora***********
			if(temp1.position=="entrance" ||temp1.position=="exit")
		{				
		var date = new Date();
		var current_hour = date.getHours();
		var text;
		if(current_hour>=5 && current_hour<12)   {/*"Buongiorno"*/;if(cuttitle=="goodmorning"){selected_title=temp.title;    console.log("titolo:   mattinaaaaa");};}
		if(current_hour>=12 && current_hour<17)   {if(cuttitle=="goodafternoon"){selected_title=temp.title;console.log("titolo:   pome");}}
		if(current_hour>=17 && current_hour<=23)   {if(cuttitle=="goodevening"){selected_title=temp.title;console.log("titolo:   sera");}}
		if(current_hour>=0 && current_hour<5)   {if(cuttitle=="goodnigth"){selected_title=temp.title;console.log("titolo:   notte");}}
		}
		//**********************
		//Matching in base al numero di query
		else
		{ if(temp1.position=="left" || temp1.position=="right")
		  {     console.log("left or right!!!!!");
			if(n_query<N_QUERY_OFFERT)  //devo mandare un prodotto
			{  console.log("query ok\n\n"+temp.title); 
			  if(cuttitle=="products")
				{selected_title=temp.title; console.log("prodotto \n"); n_query++;}	
			}
			else  //mando l' offerta speciale e azzero il contatore
			{
				 if(cuttitle=="offers")
				{selected_title=temp.title; console.log("Offerta speciale \n"); n_query=0;}	
		
			}


		  }
		 else
		 {selected_title=temp.title}
		}
				
							console.log(".title: "+JSON.stringify(selected_title)+ "\n");
									db.close();});


		//MATCHING TITLE - CONTENTS
		mongo.connect (uri,function (err,db)
		{
			
			if (err)
			{
				console.log('error');
				return;
			}
			console.log('db conn');
		
			var arraudio=[],arrvideo=[],arrimage=[];
			db.collection('coll3', function(err, collection) 
			{
			    if (err) 
			    {
			        console.log('error');
			    }
//info->title!!!
			   collection.find({title: selected_title}).toArray(function(err, results)
			   {
			    	
					for (var i=0;i<results.length;i++)
					{
						if (results[i].type=="image")
						{
							arrimage.push(results[i].imgId);
						}
						if (results[i].type=="audio")
						{	
							arraudio.push(results[i].imgId);
						}
						if (results[i].type=="video")
						{
							arrvideo.push(results[i].imgId);
						}
					}					
					console.log("arrimage: "+arrimage+"\n");
					console.log("arraudio: "+arraudio+"\n");
					console.log("arrvideo: "+arrvideo+"\n");
var message,titolo;  //visualizzati sulcell
if(!(typeof selected_title === 'undefined'))
{selected_title=selected_title.split('_')[0];}
if(posF=="entrance"){
	titolo="WELCOME!";
   message=selected_title+" dear customer!";

}
if(posF=="exit"){
	titolo="GOODBYE!"; message="Thank you for your visit, have a nice ";
   if(selected_title=="goodmorning") {message+="day";}
   if(selected_title=="goodafternoon") {message+="afternoon";}
   if(selected_title=="goodevening") {message+="evening";}
   if(selected_title=="goodnigth") {message+="nigth";}
  message +="!";
}
if(posF=="center"){
   titolo="Hey!";
   message="Can we help you? Find what you're looking for!";
}
if(posF=="left" || posF=="right")
{	titolo=selected_title;
	if(selected_title=="products"){message="Take a look to our products!";}
	if(selected_title=="offers"){message="Hey, this is a special offer only for you!";}
}
///



				if ((Math.random()<0.7)||(arrvideo.length ==0))
				{	
					if (arrimage.length !=0)
					{
						if (arraudio.length !=0)
						{
							//audio+image
							var choosei = Math.round(Math.random()* (arrimage.length-1));
							var choosea = Math.round(Math.random()* (arraudio.length-1));
							imageid=arrimage[choosei];
							audioid=arraudio[choosea];
							console.log(arrimage.length+"idimage: "+imageid+"\n");
							console.log(arraudio.length+"idaudio: "+audioid+"\n");







					var obj = 		 //linkimgage + linkaudio      
					  	{ position: posF,type : "image+audio",title:titolo, msg:message,img:imageid,
						linkimage :"http://"+ip+":"+port+"/contentimage/"+imageid ,
						linkaudio :"http://"+ip+":"+port+"/contentaudio/"+audioid};
						}
						else
						{
							//only image
							var choosei = Math.round(Math.random()* (arrimage.length-1));
							imageid=arrimage[choosei];
				var obj = 		
    				{ position: posF,type : "image",title:titolo, msg:message,img:imageid,linkimage :"http://"+ip+":"+port+"/contentimage/"+imageid};
						}
					}
					else
						{var obj = 		
    				{ position: posF,type : "NotFound",title:titolo, msg:message,img:audioid,linkaudio :"http://"+ip+":"+port+"/contentaudio/"+audioid};
						if(arraudio.length !=0){
							//only audio
							var choosea = Math.round(Math.random()* (arraudio.length-1));
							audioid=arraudio[choosea];
							var obj = 		
    				{ position: posF,type : "audio",title:titolo, msg:message,img:audioid,linkaudio :"http://"+ip+":"+port+"/contentaudio/"+audioid};
						}
				}}
				else
				{
					//only video
					var choosev = Math.round(Math.random()* (arrvideo.length-1));
							videoid=arrvideo[choosev];
				var obj = 		
    				{ position: posF,type : "video",title:titolo, msg:message,img:imageid,linkvideo :"http://"+ip+":"+port+"/contentvideo/"+videoid};
				}
					
					
response.send(JSON.stringify( obj ));
db.close();
					  
					
				
				
			
		
		});
					  });
				});
				
			});
		
		});
					  });
				});
				
			});
		
		});




   
});


	









//resolution: get the selected content audio/image/video by id
//content/id
//ok
app.get('/contentimage/:id', function(request, response) {
	console.log(request.url);
	var id= request.params.id;
	var found= false;
	response.contentType('image/jpeg');
	

//////OOOKKKK
mongo.connect (uri,function (err,db)
	{
		console.log("read\n");		
		_id = new ObjectID(id);
		var gridStore = new GridStore(db, _id, 'r');
		gridStore.open(function (err, gridStore) 
		{
		  if (err) 
			{
		    response.writeHead(500);
		    return response.end();
		  	}
		  response.writeHead(200, {'Content-Type': 'image/jpeg'});
		  gridStore.stream(true).on('end', function() 
			{
		    		db.close();
		  	}).pipe(response);
		});
	});
	
	
});
app.get('/contentaudio/:id', function(request, response) {
	console.log(request.url);
	var id= request.params.id;
	var found= false;
	response.contentType('audio/mp3');
	

//////OOOKKKK
mongo.connect (uri,function (err,db)
	{
		console.log("read\n");		
		_id = new ObjectID(id);
		var gridStore = new GridStore(db, _id, 'r');
		gridStore.open(function (err, gridStore) 
		{
		  if (err) 
			{
		    response.writeHead(500);
		    return response.end();
		  	}
		  response.writeHead(200, {'Content-Type': 'audio/mp3'});
		  gridStore.stream(true).on('end', function() 
			{
		    		db.close();
		  	}).pipe(response);
		});
	});
	
	
});
app.get('/contentvideo/:id', function(request, response) {
	console.log(request.url);
	var id= request.params.id;
	var found= false;
	response.contentType('video/mp4');
	

//////OOOKKKK
mongo.connect (uri,function (err,db)
	{
		console.log("read\n");		
		_id = new ObjectID(id);
		var gridStore = new GridStore(db, _id, 'r');
		gridStore.open(function (err, gridStore) 
		{
		  if (err) 
			{
		    response.writeHead(500);
		    return response.end();
		  	}
		  response.writeHead(200, {'Content-Type': 'video/mp4'});
		  gridStore.stream(true).on('end', function() 
			{
		    		db.close();
		  	}).pipe(response);
		});
	});
	
	
});


app.post('/settings', function(request, response) {
console.log(request.url);	
ip= request.body.ip;
	port= request.body.port;
	response.send('current ip: '+ ip +'\ncurrent port number: '+port);  
	
});

app.post('/content/add', function(request, response) {
console.log(request.url);
		var new_position= request.body.position;
		var new_title=request.body.title;
	var new_type= '';
console.log(request.files.file);
	if(typeof request.files.file === 'undefined')
{
	fs.readFile('./contents.html', function( err,data){
      response.contentType('text/html');
      response.send(data+'<html> <body> <script> alert("Error, you must select a file!")  </script> </body> </html>');});return;
}
	var file = request.files.file.path;
        var name = request.files.file.originalname;
        var local_path='';
        var extension= name.split('.')[1];
        var new_link= '';
	var right_file= false;
        
        if(extension=='jpg' || extension=='jpeg' )     {local_path='/database/images/'+name; new_type='image'; right_file=true;}
        
        if(extension=='mp3' )     {local_path='/database/audios/'+name;  new_type='audio';right_file=true;};
        
        if(extension=='mp4')     {local_path='/database/videos/'+name; new_type= 'video';right_file=true; };

    if(!right_file)
{	fs.readFile('./contents.html', function( err,data){
      response.contentType('text/html');
      response.send(data+'<html> <body> <script> alert("Error, file not supported!")  </script> </body> </html>');});return;


}
        
        new_link=ip+':'+port+local_path;
       
	mongo.connect (uri,function (err,db)
	{

			if (err)
			{
				console.log('error');
				return;
			}			
			var fileId = new ObjectID();

		  // Open a new file
		  var gridStore = new GridStore(db, fileId, 'w');

		  // Read the filesize of file on disk (provide your own)
		  var fileSize = fs.statSync(file).size;
		  // Read the buffered data for comparision reasons
		  var data = fs.readFileSync(file);

		  // Open the new file
		  gridStore.open(function(err, gridStore) 
		  {

		    // Write the file to gridFS
		    gridStore.writeFile(file, function(err, doc) 
		    {

		      // Read back all the written content and verify the correctness
		      GridStore.read(db, fileId, function(err, fileData) 
		      {
			assert.equal(data.toString('base64'), fileData.toString('base64'))
			assert.equal(fileSize, fileData.length);
			console.log("image add: "+/*new_img*/+"\n");			
			console.log("id: "+fileId+"\n");
			db.close();

/////////////////////////////////////////////////////////////////////
mongo.connect (uri,function (err,db)
		{
			
			if (err)
			{
				console.log('error');
				return;
			}
			console.log('db conn');
		
			db.collection('coll3', function(err, collection) 
			{
			    if (err) 
			    {
			        console.log('error');
				return;
			    }
			   var mydocins =
						    [
						      {
						        type: new_type,
						        title: new_title,
							imgId: fileId
						      }
						      ];
				    console.log('insert'+JSON.stringify(mydocins)+'\n');
				    collection.insert(mydocins);
				db.close();
///////////////////////////////////////////////////////////////
		mongo.connect (uri,function (err,db)
		{
			
			if (err)
			{
				console.log('error');
				return;
			}
			console.log('db conn');
		var i=0,j=0;
			db.collection('coll2', function(err, collection) 
			{
			    if (err) 
			    {
			        console.log('error');
				return;
			    }
			   
			   collection.find({position: new_position}).toArray(function(err, results)
			   {
			    	
					
					if (results.length>0)
					{
						console.log("results: "+ new_position+"\n"+JSON.stringify(results)+"\n");						
						results.forEach(function(doc) 
						 {
						    console.log("position: "+ new_position+"\n");
						    console.dir(doc);
							i++;
					
						  });
                                        db.close();
                                        mongo.connect (uri,function (err,db)
		                                        {
			
			                                        if (err)
			                                        {
				                                        console.log('error');
				                                        return;
			                                        }
			                                        console.log('db conn');
		                                        var i=0,j=0;
			                                        db.collection('coll2', function(err, collection) 
			                                        {
			                                            if (err) 
			                                            {
			                                                console.log('error');
				                                        return;
			                                            }
						collection.find({position: new_position,title: new_title}).toArray(function(err, results)
						   {
			    	
					
							if (results.length>0)
							{
                                                                console.log("results: "+ new_title+"\n" + JSON.stringify(results)+"\n");														
                                                                results.forEach(function(doc) 
								{
								    console.log("title: "+ new_title+"\n");
								    console.dir(doc);
									j++;
					
								  });
							}
								else
								{
									var mydocins =
										    [
										      {
											title: new_title,
											position: new_position
										      }
										      ];
				    					console.log('no title\ninsert '+JSON.stringify(mydocins)+'\n');
				    					collection.insert(mydocins);//FUNZIONANTE
									
								}	
						    });
                                                });
		
		                              });
					
					}
					
					else
					{
						/////////////////add pos
						var mydocins =
						     [
						      {
						        title: new_title,
						        position: new_position
						      }
						      ];
					    console.log('no po results\n insert'+JSON.stringify(mydocins)+'\n');
					    collection.insert(mydocins);
						
					}
					
					
						
					db.close();
				});
				
			});
		
		});

			});
							});
		
////////////////////////////////////////////////////////////////////



		      });
		    });
		});

		  
 	});

	
	
	
	response.contentType('text/html');
var text='<html><head><title> Content Added!</title></head><body> <p><form method="get" action=/>Back to the home <button type= "submit"> Home</button></form>';
//contents button
text += '<form method = "get" action=/config/contents.html>Configure Contents: <button type= "submit" >Contents</button></form><br>';
text +='<form method="get" action=/content/all>Show all contents stored <button type= "submit">';
text +=' Show all</button></form>';
	response.send(text+'<br><br>specific content  added!\n'); 
	
	
	
	
});
function confirmAction(){
      var confirmed = confirm("Are you sure? This will remove this entry forever.");
      return confirmed;
}




//content/removebyid 
app.get('/content/remove/:id', function(request, response) {
	console.log(request.url);
	var _id= request.params.id;

                mongo.connect (uri,function (err,db)
		{
			
			if (err)
			{
				console.log('error');
				return;
			}
			console.log('db conn');
                // Unlink the file (removing it)
               var objid = new ObjectID(_id)
            GridStore.unlink(db, objid, function(err, gridStore) {//remove image
	//image + title + pos(se ultimo)

                        if (err)
			{
				console.log('error unlink');
				return;
			}
                        db.collection('coll3', function(err, collection) 
			{
			    if (err) 
			    {
			        console.log('error');
			    }
			   var _title;
			   collection.find({imgId: objid}).toArray(function(err, results)
			   {
			    	
					
					console.log(JSON.stringify( results ));
                                        results.forEach(function(doc) {
					console.log("Doc from Array ");
					console.dir(doc);
					_title = doc.title;
					console.log("title: "+_title+ "\n");
					  });
					if(results.length>0)
					{collection.remove ({imgId: objid},1);//remove coll3
						}
			                db.collection('coll3', function(err, collection) 
			                {
			                    if (err) 
			                    {
			                        console.log('error');
			                    }
			                   console.log("title remove:? "+JSON.stringify( _title ));
			                   collection.find({title: _title}).toArray(function(err, results)
			                   {
			                    	
					
					                console.log(JSON.stringify( results ));
                                                        if (results.length>=1)
					                {
                                                                console.log('many title');
                                                        }
                                                        else
                                                        {	db.collection('coll2', function(err, collection) 
			                {console.log("title removed from coll2");
                                                                collection.remove ({title: _title},1);});
                                                        }
					                //
			                    	
			                   });
				
			                });
			   });
				
			});



		
                     });
		});    




	
		
	var text='<html><head><title> Content Removed!</title></head><body> <p><form method="get" action=/>Back to the home <button type= "submit"> Home</button></form>';
//contents button
text += '<form method = "get" action=/config/contents.html>Configure Contents: <button type= "submit" >Contents</button></form><br>';
text +='<form method="get" action=/content/all>Show all contents stored <button type= "submit">';
text +=' Show all</button></form>';
	response.send(text+'<br><br>specific content  removed!\n');  
	
	
	
	
});







//Third Resolution: DATABASE!!! Responding to the user sending the wanted content


//app.get('/image_data') REMOVED
//app.get('/database/:folder/:name') REMOVED



app.get('/showContentPosition/:position', function(request,response ){
console.log(request.url);
var pos= request.params.position;
var text='<html><head><title>Contents for position: '+pos+'</title></head><body> <p><form method="get" action=/>Back to the home <button type= "submit"> Home</button></form>';
//contents button
text += '<form method = "get" action=/config/contents.html>Configure Contents: <button type= "submit" >Contents</button></form>';
	
	mongo.connect (uri,function (err,db){ //connesioneeeeeeeeeeeeeeeee      
               if (err)
		{
			console.log('error');
			return;
		}
		console.log('db conn');
		
		db.collection('coll2', function(err, collection){

			collection.find({position: pos}).toArray(function(err, results){
			    	

				results.forEach(function(doc2) {
					console.log(doc2.title);
					text += '<form method = "get" action=/showContentTitle/'+doc2.title+'>Show Contens for title: <button type= "submit" >'+doc2.title+'</button></form>';

				});response.send(text);
			});

		});

	});
});


app.get('/showContentTitle/:title', function(request,response ){
console.log(request.url);
var _title= request.params.title;
var text='<html><head><title>'+_title+'</title></head><body> <p><form method="get" action=/>Back to the home <button type= "submit"> Home</button></form>';
text += '<form method = "get" action=/config/contents.html>Configure Contents: <button type= "submit" >Contents</button></form>';
text += '</p><script type="text/javascript" language="JavaScript">';
text+='function clicked() {    return confirm("Are you sure you want to remove this content?");}</script>';
	




	mongo.connect (uri,function (err,db){ //connesioneeeeeeeeeeeeeeeee      
               if (err)
		{
			console.log('error');
			return;
		}
		console.log('db conn');
		
		db.collection('coll3', function(err, collection){

			collection.find({title: _title}).toArray(function(err, results){
			    	

				results.forEach(function(doc2) {
				console.log(doc2.title);console.log(doc2);

			if(doc2.type=="image"){	
				text= text+ '<a> <img src= "http://'+ip+':'+port +'/contentimage/'+doc2.imgId+'"'+" style=width:304px > </a>";
text += '<form method="get" action=/content/remove/'+doc2.imgId+'> <input type="submit" onclick=';
text+= '"return clicked();" value="Remove image" /></form>';
}

			if(doc2.type=="audio")
			{
text+= '<a><audio src="http://'+ip+':'+port+'/contentaudio/'+doc2.imgId+'"preload="auto" controls  > </a>';
text += '<form method="get" action=/content/remove/'+doc2.imgId+'><input type="submit" onclick=';
text+= '"return clicked();" value="Remove audio" /></form>';

			}

			if(doc2.type=="video")
			{

text+= '<a><video src="http://'+ip+':'+port+'/contentvideo/'+doc2.imgId+'"preload="auto" controls  > </a>';
text += '<form method="get" action=/content/remove/'+doc2.imgId+'><input type="submit" onclick=';
text+= '"return clicked();" value="Remove video" /></form>';
			}
	});response.send(text);
			
			});

		});

	});

});
app.get('/content/all', function(request, response) {
console.log(request.url);
ShowAllContent(response);
});

function ShowAllContent(response,text){
	response.contentType('text/html');
var ok=false;
var pos; var _title;
    //writing html rensponse: button home
var text='<html><head><title> Contents</title></head><body> <p><form method="get" action=/>Back to the home <button type= "submit"> Home</button></form>';
//contents button
text += '<form method = "get" action=/config/contents.html>Configure Contents: <button type= "submit" >Contents</button></form><br><br><br>';


	
var n_docs; var i=0; 

mongo.connect (uri,function (err,db){ //connesioneeeeeeeeeeeeeeeee      
               if (err)
		{
			console.log('error');
			return;
		}
		console.log('db conn');
		
		db.collection('coll1', function(err, collection){

			collection.find({}).toArray(function(err, results_pos){
			    	var current_pos='null';
				results_pos.forEach(function(doc_pos) {
				
					   console.log(doc_pos.position);
					text += '<form method = "get" action=/showContentPosition/'+doc_pos.position+'>Show Contens for positions: <button type= "submit" >'+doc_pos.position+'</button></form>';
						
	                        	

					//});
				}); response.send(text);
			});

		});

			

});

}


