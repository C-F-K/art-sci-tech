var week3 = JSON.parse(localStorage.assignment);
var allEvents = week3.events;

var w = 1000;
var h = 500;
var padding = 4;

var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

var barHeight = (h / allEvents.length) - padding;

svg.selectAll("rect")
	.data(allEvents)
	.enter()
	.append("rect")
	.attr("x", 0)
	.attr("y", function(d, i) {
		return i * (h / allEvents.length);
	})
	.attr("height", h / allEvents.length - padding)
	.attr("width", function(d) {
		return d.rating * 50;
	})
	.attr("fill", function(d) {
		if (d.ficticious) {
			return "#ff6666";
		} else {
			return "#6666ff";
		}
	});
svg.selectAll("text")
	.data(allEvents)
	.enter()
	.append("text")
	.text(function(d) {
		return d.name + ": " + d.rating;
	})
	.attr("x", 10)
	.attr("font-size", (barHeight - ((barHeight / 10) * 2)))
	.attr("y", function(d, i) {
		return (((i * barHeight) + barHeight) - ((barHeight / 10) * 2) + (i * padding)); 
		//I'm sorry this code is so fucking tense but I am so caffeinated right now it's like I can see the Matrix
	});