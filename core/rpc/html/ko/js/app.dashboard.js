/**
 * Model class
 * @returns {dashBoard}
 */
function dashBoard() {
    var self = this;
    this.devices = ko.observableArray([]);
    this.hasNavigation = ko.observable(false);

    this.page = ko.observable(1);
    this.pages = ko.computed(function() {
	var pages = [];
	var max = Math.ceil(self.devices().length / 9);
	for ( var i = 1; i <= max; i++) {
	    pages.push({
		idx : i
	    });
	}
	return pages;
    });

    this.firstRow = ko.computed(function() {
	var currentList = self.devices().chunk(9);
	if (currentList.length < self.page()) {
	    return [];
	}
	currentList = currentList[self.page() - 1];
	if (currentList.length >= 3) {
	    return currentList.chunk(3)[0];
	}
	return [];
    });

    this.secondRow = ko.computed(function() {
	var currentList = self.devices().chunk(9);
	if (currentList.length < self.page()) {
	    return [];
	}
	currentList = currentList[self.page() - 1];
	if (currentList.length >= 6) {
	    return currentList.chunk(3)[1];
	}
	return [];
    });

    this.thirdRow = ko.computed(function() {
	var currentList = self.devices().chunk(9);
	if (currentList.length < self.page()) {
	    return [];
	}
	currentList = currentList[self.page() - 1];
	if (currentList.length >= 9) {
	    return currentList.chunk(3)[2];
	}
	return [];
    });

    this.switchPage = function(item) {
	self.page(item.idx);
    };
}

/**
 * Initalizes the model
 */
function init_dashBoard() {
    model = new dashBoard();

    model.deviceTemplate = function(item) {
	if (supported_devices.indexOf(item.devicetype) != -1) {
	    return 'devices/' + item.devicetype;
	}
	
	return 'devices/empty';
    }.bind(model);

    model.mainTemplate = function() {
	return "dashboard";
    }.bind(model);

    model.navigation = function() {
	return ""; // No navigation
    }.bind(model);

    ko.applyBindings(model);
}