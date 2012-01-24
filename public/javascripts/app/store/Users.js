// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('AM.store.Users', {
  extend: 'Ext.data.Store',

  model: 'AM.model.User',
  autoLoad: true,
  autoSync: false,

  listeners: {
    load: function() {
      console.log("---- load() event on main store ---");
      
		// chargement des utilisateurs dans le storage local
      var offlineUsers = Ext.data.StoreManager.getByKey('OfflineUsers');
		offlineUsers.load();
		this.each(function(record){
      	offlineUsers.add(record.data);
      });	
      offlineUsers.sync();
      
      console.log("---- EO load() event on main store ---");
    },
    update: function(usersStore, record) {
      console.log("---- update() event on main store ---");
      
      var offlineUsers = Ext.data.StoreManager.getByKey('OfflineUsers');
		var possibleRecord = offlineUsers.findRecord("id", record.data.id);
		if (possibleRecord) {
			// perform offline store update
			possibleRecord.set(record.data);
			offlineUsers.sync();
		} else {
			// perform create
			offlineUsers.add(record.data);
			offlineUsers.sync();
		}
		
      console.log("---- EO update() event on main store ---");
    },
    beforesync: function(options) {
      
      console.log("---- beforesync() event on main store ---");
      
		return false;
		
      console.log("---- EO beforesync() event on main store ---");
    }
  },
  
  proxy: {
    url: '/users',
    type: 'rest',
    format: 'json',

    reader: {
      root: 'users',
      record: 'user',
      successProperty: 'success'
    }
  }
});
