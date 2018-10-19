angular.module("film_indonesia_2018", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","film_indonesia_2018.controllers", "film_indonesia_2018.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "myfilmindo" ;
		$rootScope.appLogo = "data/images/header/logo.png" ;
		$rootScope.appVersion = "1.0" ;
		$rootScope.headerShrink = true ;

		$ionicPlatform.ready(function() {
			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
			// this will create a banner on startup
			//required: cordova plugin add cordova-plugin-admobpro --save
			if (typeof AdMob !== "undefined"){
				var admobid = {};
				admobid = {
					banner: "",
					interstitial: "",
					rewardvideo: ""
				};
				$timeout(function(){
					
				}, 1000);
			
			
				$timeout(function(){
				}, 30000);
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "film_indonesia_2018",
				storeName : "film_indonesia_2018",
				description : "The offline datastore for FILM Indonesia 2018 app"
			});



		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("film_indonesia_2018.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("objLabel", function(){
		return function (obj) {
			var new_item = [];
			angular.forEach(obj, function(child) {
				new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v,l) {
					if (indeks !== 0) {
					new_item.push(l);
				}
				indeks++;
				});
			});
			return new_item;
		}
	})
	.filter("objArray", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks !== 0){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})


.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("id");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("id");
})



.config(function($stateProvider,$urlRouterProvider,$sceDelegateProvider,$ionicConfigProvider,$httpProvider){
	/** tabs position **/
	$ionicConfigProvider.tabs.position("bottom"); 
	try{
	// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?oceanpro\.xyz/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?bstrdproject\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("film_indonesia_2018",{
		url: "/film_indonesia_2018",
		abstract: true,
		templateUrl: "templates/film_indonesia_2018-tabs.html",
	})

	.state("film_indonesia_2018.about_us", {
		url: "/about_us",
		views: {
			"film_indonesia_2018-about_us" : {
						templateUrl:"templates/film_indonesia_2018-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("film_indonesia_2018.admob", {
		url: "/admob",
		cache:false,
		views: {
			"film_indonesia_2018-admob" : {
						templateUrl:"templates/film_indonesia_2018-admob.html",
						controller: "admobCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("film_indonesia_2018.dashboard", {
		url: "/dashboard",
		views: {
			"film_indonesia_2018-dashboard" : {
						templateUrl:"templates/film_indonesia_2018-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("film_indonesia_2018.dashboard_singles", {
		url: "/dashboard_singles/:snippetresourceIdvideoId",
		cache:false,
		views: {
			"film_indonesia_2018-dashboard" : {
						templateUrl:"templates/film_indonesia_2018-dashboard_singles.html",
						controller: "dashboard_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("film_indonesia_2018.menu_one", {
		url: "/menu_one",
		views: {
			"film_indonesia_2018-menu_one" : {
						templateUrl:"templates/film_indonesia_2018-menu_one.html",
						controller: "menu_oneCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("film_indonesia_2018.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"film_indonesia_2018-slide_tab_menu" : {
						templateUrl:"templates/film_indonesia_2018-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/film_indonesia_2018/dashboard");
});
