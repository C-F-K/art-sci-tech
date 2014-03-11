var citeEntry = function(bibEntry) {
	switch(bibEntry.type) {
		case 'book' :
			var citeBook = bibEntry.authorLastname + ', ' + bibEntry.authorFirstname + '. <i>' + bibEntry.title + '.</i> ' + bibEntry.where + ': ' + bibEntry.who + ', ' + bibEntry.year + '. Print.';
			$('.main').append('<p>' + citeBook + '</p>');
			break;
		case 'film' :
			var citeFilm = '<i>' + bibEntry.title + '.</i> ' + 'Writ. ' + bibEntry.authorFirstname + ' ' + bibEntry.authorLastname + '. Dir. ' + bibEntry.director + '. ' + bibEntry.where + ': ' + bibEntry.who + ', ' + bibEntry.year + '. Film.';
			$('.main').append('<p>' + citeFilm + '</p>');
			break;
		case 'article' :
			var citeArticle = bibEntry.authorLastname + ', ' + bibEntry.authorFirstname + '. "' + bibEntry.title + '." <i>' + bibEntry.journal + '</i> ' + bibEntry.volume + ' (' + bibEntry.year + '): ' + bibEntry.pages + '. Print.';
			$('.main').append('<p>' + citeArticle + '</p>');
			break;
		default : 
			alert('No new data.');
			break;
	}
};

var bibRef = new Firebase('https://ast45.firebaseio.com/bibliography/');

bibRef.on('value', function(snapshot) {
	$('.main p').remove();
	var bib = snapshot.val();
	for (var entry in bib) {
		citeEntry(entry);
	}
});

var submitBookForm = function() {
	var bookFormContents = {
		authorFirstname: $('#bookAuthorFirstname').val(),
		authorLastname: $('#bookAuthorLastname').val(),
		title: $('#bookTitle').val(),
		where: $('#bookWhere').val(),
		who: $('#bookWho').val(),
		year: $('#bookYear').val(),
		cited: 1,
		type: $('#mediatype').val()
	};
	return bookFormContents;
};

var submitFilmForm = function() {
	var filmFormContents = {
		authorFirstname: $('#filmAuthorFirstname').val(),
		authorLastname: $('#filmAuthorLastname').val(),
		director: $('#filmDirector').val(),
		title: $('#filmTitle').val(),
		where: $('#filmWhere').val(),
		who: $('#filmWho').val(),
		year: $('#filmYear').val(),
		cited: 1,
		type: $('#mediatype').val()
	};
	return filmFormContents;
};

var submitArticleForm = function () {
	var articleFormContents = {
		authorFirstname: $('#articleAuthorFirstname').val(),
		authorLastname: $('#articleAuthorLastname').val(),
		title: $('#articleTitle').val(),
		journal: $('#articleJournal').val(),
		volume: $('#articleVolume').val(),
		pages: $('#articlePages').val,
		year: $('#articleYear').val(),
		cited: 1,
		type: $('#mediatype').val()
	};
	return articleFormContents;
};

	var formSubmission = function() {
		var formType = $('#mediatype').val();
		switch (formType) {
			case 'book' :
				var bookEntry = submitBookForm();
				return bookEntry;
				break;
			case 'film' :
				var filmEntry = submitFilmForm();
				return filmEntry;
				break;
			case 'article' :
				var articleEntry = submitArticleForm();
				return articleEntry;
				break;
			default:
				alert('You done goofed');
				break;
		}
	};

$(document).ready(function() {
	$('.main').append("<section class = 'form'></section>");
	$('.form').append("\
		<form>\
			Media type: <select id='mediatype'>\
				<option value='none' id='none'></option>\
				<option value='book'>Book</option>\
				<option value='film'>Film</option>\
				<option value='article'>Article</option>\
			</select><br>\
			<div id='bookForm' class='bibForm'>\
				Author's first name: <input type='text' id='bookAuthorFirstname'><br>\
				Author's last name: <input type='text' id='bookAuthorLastname'><br>\
				Book's title: <input type='text' id='bookTitle'><br>\
				Publisher: <input type='text' id='bookWho'><br>\
				Publisher's headquarters: <input type='text' id='bookWhere'><br>\
				Year of publication: <input type='text' id='bookYear'><br>\
				<input type='submit' value='Submit'>\
			</div>\
			<div id='filmForm' class='bibForm'>\
				Author's first name: <input type='text' id='filmAuthorFirstname'><br>\
				Author's last name: <input type='text' id='filmAthorLastname'><br>\
				Director's full name: <input type'text' id='filmDirector'><br>\
				Films's title: <input type='text' id='filmTitle'><br>\
				Studio: <input type='text' id='filmWho'><br>\
				Studio's headquarters: <input type='text' id='filmWhere'><br>\
				Year of release: <input type='text' id='filmYear'><br>\
				<input type='submit' value='Submit'>\
			</div>\
			<div id='articleForm' class='bibForm'>\
				Author's first name: <input type='text' id='articleAuthorFirstname'><br>\
				Author's last name: <input type='text' id='articleAuthorLastname'><br>\
				Article's title: <input type='text' id='articleTitle'><br>\
				Journal: <input type='text' id='articleJournal'><br>\
				Journal volume: <input type='text' id='articleVolume'><br>\
				Page range: <input type='text' id='articlePages'><br>\
				Year of publication: <input type='text' id='articleYear'><br>\
				<input type='submit' value='Submit'>\
			</div>\
		</form>\
	")
	$('.bibForm').hide();
	$('#mediatype').on('change', function() {
		$('#none').remove();
		switch ($('#mediatype').val()) {
			case 'book' : 
				$('.bibForm').slideUp();
				$('#bookForm').slideDown();
				break;
			case 'film' :
				$('.bibForm').slideUp();
				$('#filmForm').slideDown();
				break;
			case 'article' :
				$('.bibForm').slideUp();
				$('#articleForm').slideDown();
				break;
			default :
				alert('Nice job breaking it, hero.');
				break;
		}
	});
	$('#mediatype').on('submit', function() {
		bibRef.push(formSubmission());
	});
});