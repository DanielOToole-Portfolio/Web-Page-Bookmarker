// listens form submit
document.getElementById('bForm').addEventListener('submit', savedLink);

// saved web page link
function savedLink(e){
	//form values
	//logs the value not the input field
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;

	if(!validForm(siteURL, siteName)){
		return false;
	}

	//creating bookmark object with siteName/siteURL variables in it
	var bookmark = {
		name: siteName,
		url: siteURL
	}


	//if its null need to initialaise bookmarks array
	if(localStorage.getItem('bookmarks') === null){
		//bookmark array
		var bookmarks = [];
		//this will add to the array
		bookmarks.push(bookmark);
		//set to local storage + wrapping bookmarks in a json function to turn it into a string before saving it
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} 
	//if there is an object in bookmarks array
	else{
		//get bookmarks array from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array
		bookmarks.push(bookmark);
		//reset to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}

	getBookmarks();
	//this prevents the default behavour of the event listener, 
	//stops form from submitting so you can work with it.
	e.preventDefault();
}

function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // reset back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // get bookmarks
  getBookmarks();
}


//get bookmarks

function getBookmarks(){
	//get bookmarks array fromlocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	
	//get output id
	var savedBookmarks = document.getElementById('savedbookmarks');

	//build the output
	savedBookmarks.innerHTML = '';

	//loop through the bookmarks set in local storage and output them in a div
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		//append
		savedBookmarks.innerHTML += '<div class="well">' +
									'<h3>' + name +
									' <a class="btn bg-default" target="_blank" href="'+ url +'">Visit</a>' +
									' <a onclick="deleteBookmark(\''+url+'\')" class="btn bg-danger" href="#">Delete</a>' +
									'</h3>' +
									'</div>';
	}



}

function validForm(siteName, siteURL){
	//if siteName and siteURL are blank the alert message appears
	if(!siteName || siteURL){
		alert('Fill in form');
		return false;
	}


	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	//if siteURL is incorrect the alert message appears
	if(!siteURL.match(regex)){
		alert('use a valid url');
		return false;
	}
	return true;
}

