// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('AM.store.Users', {
  extend: 'Ext.data.Store',

  model: 'AM.model.User',
  autoLoad: true,
  autoSync: false,

  isOnline : function() {
	//return navigator.onLine;
	return isOnline;
  },
  
  syncToLocalStorage : function() {
	jsonUsers = { data: [] };
	this.each(function(record) {
		jsonUsers.data.push(record.data);
		console.log(record.data);
	});
	localStorage.setItem('users', JSON.stringify(jsonUsers));
	
  },
  eraseSync : function() {
	localStorage.removeItem('sync');
  },
  
  listeners: {
    beforeload: function(store, operation) {
      console.log("---- beforeload() event on main store ---");
		if(!this.isOnline()) {
			// chargement des données synchronisées avec le store
			this.removeAll();
			jsonUsers = JSON.parse(localStorage.getItem('users'));
			if (jsonUsers) {
				for (i=0;i<jsonUsers.data.length;i++) {
					record = jsonUsers.data[i];
					this.add(record);
				}
			}
			
			console.log("fin du chargement du storage local dans le store actuel");
			
			// chargement des données pas synchronisées avec le store
			sync = localStorage.getItem('sync');
			if(sync) {
				jsonSync=JSON.parse(sync);
				for(j=0;j<jsonSync.operations.length;j++) {
					if(jsonSync.operations[j].type=="create") {
						for(i=0;i<jsonSync.operations[j].data.length;i++) {
							this.add(jsonSync.operations[j].data[i]);
						}
					}
					console.log("operation de type "+jsonSync.operations[j]);
					if(jsonSync.operations[j].type=="destroy") {
						// il faut supprimer au cas ou il soit deja coté serveur
						for(i=0;i<jsonSync.operations[j].data.length;i++) {
							console.log("remove off "+jsonSync.operations[j].data[i].first_name);
							recordToRemove = this.findRecord("id", jsonSync.operations[j].data[i].id);
							console.log("record foung ");
							console.log(recordToRemove);
							this.remove( recordToRemove);
						}
					}
				}	
			}
			
			this.each(function(record){
				console.log("record présent:"+record.data.first_name);
			});
			
			console.log("fin du chargement des synchro dans le store actuel");
			
			this.eraseSync();
		
			return false;
		}	
      console.log("---- EO beforeload() event on main store ---");
	},
	datachange:function() {
		console.log("datachange event");
	},
    load: function() {
      console.log("---- load() event on main store ---");
      
      console.log(this.proxy);
		if(this.isOnline()) {
			
			console.log("online");
			this.each(function(record) {
				console.log("record=>"+record.data.first_name);
			});
			this.syncToLocalStorage();
			this.eraseSync();
			
		} else {
			
			console.log("offline...");
			
			// chargement des données synchronisées avec le store
			this.removeAll();
			jsonUsers = JSON.parse(localStorage.getItem('users'));
			if (jsonUsers) {
				for (i=0;i<jsonUsers.data.length;i++) {
					record = jsonUsers.data[i];
					this.add(record);
				}
			}
			
			console.log("fin du chargement du storage local dans le store actuel");
			
			// chargement des données pas synchronisées avec le store
			sync = localStorage.getItem('sync');
			if(sync) {
				jsonSync=JSON.parse(sync);
				for(j=0;j<jsonSync.operations.length;j++) {
					if(jsonSync.operations[j].type=="create") {
						for(i=0;i<jsonSync.operations[j].data.length;i++) {
							this.add(jsonSync.operations[j].data[i]);
						}
					}
					if(jsonSync.operations[i]=="destroy") {
						// il faut supprimer au cas ou il soit deja coté serveur
						for(i=0;i<jsonSync.operations[j].data.length;i++) {
							console.log("remove off "+jsonSync.operations[j].data[i].first_name);
							this.remove(jsonSync.operations[j].data[i]);
						}
					}
				}	
			}
			
			console.log("fin du chargement des synchro dans le store actuel");
			
			this.eraseSync();
			console.log(this);
			
		}
		
      console.log("---- EO load() event on main store ---");
    },
    update: function(usersStore, record) {
		console.log("---- update() event on main store ---");
      console.log("---- EO update() event on main store ---");
    },
    beforesync: function(options) {
      
      console.log("---- beforesync() event on main store ---");
		console.log(options);
		
		if(this.isOnline()) {
			
			this.syncToLocalStorage();
			this.eraseSync();
			
		} else {
			
			// envoie de données au store local
			var globalSync = { operations: [] };
			if (options.create) {
				var jsonSync = { data:[], type:"create" };
				for(i=0;i<options.create.length;i++) {
					jsonSync.data.push(options.create[i].data);
				}
				globalSync.operations.push(jsonSync);
			}
			if (options.destroy) {
				var jsonSync = { data:[], type:"destroy" };
				for(i=0;i<options.destroy.length;i++) {
					jsonSync.data.push(options.destroy[i].data);
				}
				globalSync.operations.push(jsonSync);
			}
			
			localStorage.setItem('sync', JSON.stringify(globalSync));
			
			//this.syncToLocalStorage();
			
			// Pour ne pas faire l'appel au service rest
			return false;
		}
		
      console.log("---- EO beforesync() event on main store ---");
    }
  },
  
  proxy: {
    url: '/users',
    type: 'rest',
    format: 'json',
	 noCache:false,
    reader: {
      root: 'users',
      record: 'user',
      successProperty: 'success'
    }
  }
});
