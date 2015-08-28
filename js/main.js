function Cat(photo, nameElem, counter, catName){
	this.photo = document.getElementById(photo);
	this.nameElem = document.getElementById(nameElem);
	this.nameElem.innerHTML = catName;
	this.counter = document.getElementById(counter);
	this.numClicks = 0;

	var self = this;

	this.photo.addEventListener('click', function(){self.countClicks(self)}, false);
}

Cat.prototype.countClicks = function(context){
	context.numClicks++;
	context.showClicks(context);
}

Cat.prototype.showClicks = function(context){
	context.counter.innerHTML = context.numClicks + ' clicks';
}

var cat1 = new Cat('cat1', 'cat1_name', 'cat1_counter', 'Fluffy');
var cat2 = new Cat('cat2', 'cat2_name', 'cat2_counter', 'Mittens');
