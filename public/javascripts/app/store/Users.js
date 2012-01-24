// Models are typically used with a Store, which is basically a collection of Model instances.
Ext.define('AM.store.Users', {
  extend: 'Ext.data.Store',

  model: 'AM.model.User',
  autoLoad: true,
  autoSync: false,

  listeners: {
    load: function() {
      console.log("---- load() event on main store ---");
      
      var offlineUsers = Ext.data.StoreManager.getByKey('OfflineUsers');
      var users = Ext.data.StoreManager.getByKey('Users');
      
      users.each(function(record){
      	console.log("utilisateurs dans le store users:"+record.data.first_name);
      });	
      
      offlineUsers.load();
      offlineUsers.each(function(record){
      	console.log("recherche du l'utilisateur avec l'id => "+record.data.id+" dans le store du"+
      		" serveur side =>"+users.getById(record.data.id));
      	console.log(users.getById(record.data.id));
      	if(null==users.getById(record.data.id)) {
      		users.add(record.data);
      		console.log("ajout au store des utilisateurs distants");
      	}
      });
      this.sync();
      offlineUsers.removeAll();
      
      users.sync();
      
      console.log("---- EO load() event on main store ---");
    },
    update: function() {
      
      console.log("---- update() event on main store ---");
      console.log(arguments);
      console.log("---- EO update() event on main store ---");
    },
    beforesync: function() {
      
      console.log("---- beforesync() event on main store ---");
      console.log(arguments);
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
