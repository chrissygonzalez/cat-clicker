var model = {
	adminMode: true,
	currentCat: null,
	cats:  [{
		name: 'Mittens',
		photo: 'images/Cat_eating_a_rabbit.jpeg',
		clickCount: 0
	},{
		name: 'Socks',
		photo: 'images/cat_new20151.jpg',
		clickCount: 0
	},{
		name: 'Mr. Whiskers',
		photo: 'images/Large_Siamese_cat_tosses_a_mouse.jpg',
		clickCount: 0
	},{
		name: 'Frisky',
		photo: 'images/maxresdefault.jpg',
		clickCount: 0
	},{
		name: 'Chairman Meow',
		photo: 'images/siberian-cat1.jpg',
		clickCount: 0
	}],

	countClicks: function(whichCat){
		whichCat.clickCount++;
		return whichCat.clickCount;
	}
}

var adminView = {
	adminMode: document.getElementById('adminMode'),
	editName: document.getElementById('editName'),
	editPhoto: document.getElementById('editPhoto'),
	clicks: document.getElementById('clicks'),

	init: function(){
		this.render();
		this.toggleAdmin();

		this.adminBtn = document.getElementById('adminBtn');
		this.adminBtn.addEventListener('click', function(e){
			adminView.render();
			adminView.toggleAdmin();
			e.preventDefault();
		});

		this.saveBtn = document.getElementById('saveBtn');
		this.saveBtn.addEventListener('click', function(e){
			adminView.write();
			e.preventDefault();
		});

		this.cancelBtn = document.getElementById('cancelBtn');
		this.cancelBtn.addEventListener('click', function(e){
			adminView.render();
			e.preventDefault();
		});
	},

	render: function(){
		//console.log('rendering');
		var cat = octopus.getCurrentCat();
		var clickCount = octopus.getClicks();

		this.editName.value = cat.name;
		this.editPhoto.value = cat.photo;
		this.clicks.value = clickCount;
	},

	write: function(){
		var newName = this.editName.value;
		var newPhoto = this.editPhoto.value;
		var newClicks = this.clicks.value;

		octopus.setName(newName);
		octopus.setPhoto(newPhoto);
		octopus.setClicks(newClicks);

		//adminView.render();
		catView.render();
		listView.render();
	},

	toggleAdmin: function(){
		//console.log('toggling');
		var admin = octopus.getAdmin();

		if (admin) {
			adminMode.style.display = 'none';
			octopus.setAdmin(false);
		} else {
			adminMode.style.display = 'block';
			octopus.setAdmin(true);
		}
	}
}

var catView = {
	init: function(){
		this.catDisplay = document.getElementById('catDisplay');
		this.catName = document.getElementById('catName');
		this.catCount = document.getElementById('catCount');
		this.catPhoto = document.getElementById('catPhoto');
		this.catPhoto.addEventListener('click', function(){
			octopus.countClicks();
			catView.render();
			adminView.render();
		});
	},

	render: function(){
		var currentCat = octopus.getCurrentCat();
		catName.textContent = currentCat.name;
		catCount.textContent = currentCat.clickCount;
		catPhoto.src = currentCat.photo;
	}
}

var listView = {
	catList: null,

	init: function(){
		var catList = document.getElementById('catList');
		this.render();
	},

	render: function(){
		var cats = octopus.getCats();
		catList.innerHTML = '';

		for (var i = 0; i < cats.length; i++) {
			var catItem = document.createElement('li');
			catItem.textContent = cats[i].name;

			catItem.addEventListener('click', (function(cat){
				return function(){
					octopus.setCurrentCat(cat);
					catView.render();
					adminView.render();
				};
			})(cats[i]));
			catList.appendChild(catItem);
		}
		catView.render();
	}
}

var octopus = {
	init: function(){
		model.currentCat = model.cats[0];
		catView.init();
		listView.init();
		adminView.init();
	},

	getCurrentCat: function(){
		this.currentCat = model.currentCat;
		return this.currentCat;
	},

	getCats: function(){
		var cats = model.cats;
		return cats;
	},

	setCurrentCat: function(whichCat){
		model.currentCat = whichCat;
	},

	setPhoto: function(newPhoto){
		var whichCat = this.getCurrentCat();
		whichCat.photo = newPhoto;
	},

	setName: function(newName){
		var whichCat = this.getCurrentCat();
		whichCat.name = newName;
	},

	getClicks: function(){
		var whichCat = this.getCurrentCat();
		return whichCat.clickCount;
	},

	setClicks: function(numClicks){
		var whichCat = this.getCurrentCat();
		whichCat.clickCount = numClicks;
	},

	countClicks: function(){
		var whichCat = this.getCurrentCat();
		whichCat.clickCount++;
		return whichCat.clickCount;
	},

	getAdmin: function(){
		var admin = model.adminMode;
		return admin;
	},

	setAdmin: function(isAdmin){
		model.adminMode = isAdmin;
	}
}
octopus.init();