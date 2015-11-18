Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

if(Meteor.isClient) {
	Router.onBeforeAction(function() {
		// loading indicator here
		if(!this.ready()) {
			$("body").addClass("wait");
		} else {
			$("body").removeClass("wait");
			this.next();
		}
	});
}

Router.map(function () {

	this.route("home", {path: "/", controller: "HomeController"});
	this.route("airport_page", {path: "/airport_page", controller: "AirportPageController"});
	this.route("airport_page.distances", {path: "/airport_page/distances", controller: "AirportPageDistancesController"});/*ROUTER_MAP*/
});
