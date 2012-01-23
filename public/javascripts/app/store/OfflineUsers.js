
Ext.define('AM.store.OfflineUsers', {
  extend: 'Ext.data.Store',

  model: 'AM.model.User',
  storeId: 'offlineUsers',

  proxy: {
        type: 'localstorage',
        id: "offlineUsersProxy"
    },
    
listeners: {
    load: function() {
      console.log("---- load() event on OFFLINE store ---");
      console.log("---- EO load() event on OFFLINE store ---");
    },
    update: function() {
      
      console.log("---- update() event on OFFLINE store ---");
      console.log(arguments);
      console.log("---- EO update() event on OFFLINE store ---");
    },
    beforesync: function() {
      
      console.log("---- beforesync() event on OFFLINE store ---");
      console.log(arguments);
      console.log("---- EO beforesync() event on OFFLINE store ---");
    }
  }
    
});
