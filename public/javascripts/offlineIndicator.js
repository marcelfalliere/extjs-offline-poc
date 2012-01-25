// global object
var localStorage;

function init_store() {
  // load persistent store after the DOM has loaded
  localStorage = new Persist.Store('pocOffline');
}

// isonline ?
var isOnline=navigator.onLine;
function init_connection_status() {
	update_connection_status();
	window.setInterval(function() {
		if (isOnline != navigator.onLine) {
			isOnline = navigator.onLine;
			if(isOnline) {
				var usersStore = Ext.data.StoreManager.getByKey('Users');
				usersStore.sync();
				
			}
		}
		update_connection_status();
	}, 1000);
}

function update_connection_status() {
	connectionStatus = document.getElementById("connectionStatus")
	if(connectionStatus) {
		text=connectionStatus.getElementsByClassName("x-btn-inner")[0];
		if(text) {
			if (isOnline) {
				text.innerHTML = "Synchronisation des données avec le serveur !"
				removeClass(text, "offline");
				addClass(text, "online");
			} else {
				text.innerHTML = "Connection perdue."
				removeClass(text, "online");
				addClass(text, "offline");
			}
		}
		
	}
}

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}