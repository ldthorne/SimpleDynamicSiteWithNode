var fs = require("fs");

function mergeVals(vals, content){
	//cycle over keys
	for(var key in vals){
		//replace all {{key}} with val content
		content = content.replace("{{" +key+"}}", vals[key]);
	}
	//return merged content
	return content
}

function view(templateName, vals, response){

	var fileContents = fs.readFileSync("./views/"+templateName+".html", {encoding:"utf8"});

	fileContents = mergeVals(vals, fileContents);	
	//insert vals into the content

	//write content to response
	response.write(fileContents);	
	
	//read from the template files

	//insert vals into the content

	//write out to the response
}

module.exports.view = view;