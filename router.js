//2. Handle HTTP route GET / and POST / i.e. Home
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};

function home(request, response){
	if(request.url === "/"){
		if(request.method.toLowerCase() === "get"){
			//show search
			response.writeHead(200, commonHeaders);
	  		renderer.view("header", {}, response);
	  		renderer.view("search", {}, response);
	  		renderer.view("footer", {}, response);
	  		response.end();
	  	}else{
	  		//else if url "/" && POST


	  			//get post data from body
	  			request.on("data", function(postBody){
	  				var query = querystring.parse(postBody.toString());
	  				response.writeHead(303,{"Location": "/"+ query.username});
	  				response.end();
	  			});

	  			//extract username
				//redirect to /username
	  	}

	}
}


//3. Handle HTTP route GET /username e.g. /ldthorne
function user(request, response){
	var username = request.url.replace("/", "");
	if(username.length>0){
		response.writeHead(200, commonHeaders);
  		renderer.view("header", {}, response);
  		var studentProfile = new Profile(username);
		//on end
		studentProfile.on("end", function(profileJSON){
			//show profile

			//store vals we need
			var vals = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badgeCount: profileJSON.badges.length,
				jsPoints: profileJSON.points.JavaScript
			}
			

  			renderer.view("profile", vals, response);
  			renderer.view("footer", {}, response);
  			response.end();
		});

		//on error
		studentProfile.on("error", function(error){
			//show error
			renderer.view("error", {errorMessage: error.message}, response);
  			renderer.view("search", {}, response);
  			renderer.view("footer", {}, response);
  			response.end();

		});

	
	//if url == "/..."
		//get JSON from Treehouse
			//on "end"
				//show profile
			//on "error"
				//show error
	}
}

module.exports.home = home;
module.exports.user = user;
