$(document).ready(function() {
	var cat = $('<p><img src="http://i.imgur.com/awJ5yso.jpg"></p>');
	$(".email-policy").find("p").remove();
	$(".email-policy").append(cat);
});