Template.AirportPage.rendered = function() {
	
};

Template.AirportPage.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}
	
});

Template.AirportPage.helpers({
	
});

Template.AirportPageSideMenu.rendered = function() {
	$(".menu-item-collapse .dropdown-toggle").each(function() {
		if($(this).find("li.active")) {
			$(this).removeClass("collapsed");
		}
		$(this).parent().find(".collapse").each(function() {
			if($(this).find("li.active").length) {
				$(this).addClass("in");
			}
		});
	});

	
};

Template.AirportPageSideMenu.events({
	
});

Template.AirportPageSideMenu.helpers({
	
});
