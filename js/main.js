var cat = document.getElementsByClassName('cat');
var counter = document.getElementsByClassName('counter');
var numClicks = 0;

cat[0].addEventListener('click', function(){
	numClicks++;
	counter[0].innerHTML = numClicks + ' clicks';
}, false);