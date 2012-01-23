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
  }
});
