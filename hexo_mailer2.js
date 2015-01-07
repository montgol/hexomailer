var fs = require('fs');
var ejs = require('ejs');

var csvFile = fs.readFileSync("friends_list.csv","utf8");
var emailTemplate = fs.readFileSync("email_template.ejs", "utf8");

function csvParse(csvFile) {
	// split csvFile into an array of each person
	var csvArray = csvFile.split("\n");  	

	// shift array to only hold first line of keys.... firstname, etc
	var keyArray = csvArray.shift().split(",");
	
	var emailList = [],
			emailObj;

	csvArray.forEach(function(contactInfo) {
		var contactInfo = contactInfo.split(",");  // ["Scott", "D\n..."]
		emailObj = {};

		for (var i=0; i < contactInfo.length; i++) {
			emailObj[keyArray[i]] = contactInfo[i];
		}
		emailList.push(emailObj);
	});

	return emailList;
}

var friendList = csvParse(csvFile);

friendList.forEach(function(row){
 
  firstName = row["firstName"];
  monthsSinceContact = row["monthsSinceContact"];
 
  var customizedTemplate = ejs.render(emailTemplate, 
    { firstName: firstName,  
      monthsSinceContact: monthsSinceContact
    });
  console.log(customizedTemplate);
});

