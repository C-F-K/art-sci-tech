var assignments = [
	{
		src: "task.js"
	},
	{
		src: "berliner.js"
	},
	{
		src: "bear.js"
	},
];

var context = {
	students: [
		{
			name: "Random Task",
			number: "6234234",
			email: "random.task@student.uva.nl",
			assignment: assignments[0].src
		},
		{
			name: "Frau Berliner",
			number: "8495612",
			email: "frau.berliner@student.uva.nl",
			assignment: assignments[1].src
		},
		{
			name: "Smokey Bear",
			number: "1593751",
			email: "smokey.bear@student.uva.nl",
			assignment: assignments[2].src
		},
	]
};

//method of getting assignments inside context is arbitrary as hell, but then IMHO so is the instruction to use two separate collections. *shrug*

var handleTemplate = '<script id="week2" type="text/x-handlebars-template"><table><thead><th>Name</th><th>Student number</th><th>Email</th><th>Assignment</th></thead><tbody>{{#students}}<tr><td>{{name}}</td><td>{{number}}</td><td><a href="mailto:{{email}}">{{email}}</a></td><td><a href="{{assignment}}">Link</a></td></tr>{{/students}}</tbody></table></script>';

//Googled for a way to trim whitespace from a string and found a suitable regex, but that would not be precise enough, and the developer console still chokes on the input; suspect it's the newlines. Further suspect that precompiling the template would allow it to be written in human-readable format.

//comment out the jQuery wrapper and ctrl+ACV to test in dev console

$(document).ready(function(){
	$("body").append(handleTemplate);
	var handleTemplateCompile = $("#week2").html();
	var assignmentTemplate = Handlebars.compile(handleTemplateCompile);
	$(".info").append(assignmentTemplate(context));
});
