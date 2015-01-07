var fs = require('fs');

var csvFile = fs.readFileSync("friends_list.csv","utf8");
var emailTemplate = fs.readFileSync("email1_friend_email_text.html", "utf8");
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

friendList.forEach(function(row) {
	var templateCopy;
	firstName = row["firstName"];
	numMonthsSinceContact = row["monthsSinceContact"];

	templateCopy = emailTemplate;

	// gi  <==== global and ignore case flag
	templateCopy = templateCopy.replace(/FIRST_NAME/gi,firstName).replace(/NUM_MONTHS_SINCE_CONTACT/gi, monthsSinceContact);

	console.log(templateCopy);

});
