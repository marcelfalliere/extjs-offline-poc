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
  
  listeners: {
    load: function() {
      console.log("---- load() event on main store ---");
      
		if(this.isOnline()) {
		
			jsonUsers = { data: [] };
			this.each(function(record) {
				jsonUsers.data.push(record.data);
			});
			localStorage.setItem('users', JSON.stringify(jsonUsers));
			
		} else {
		
			this.removeAll();
			jsonUsers = JSON.parse(localStorage.getItem('users'));
			for (i=0;i<jsonUsers.data.length;i++) {
				record = jsonUsers.data[i];
				this.add(record);
			}
		}
		
      console.log("---- EO load() event on main store ---");
    },
    update: function(usersStore, record) {
      console.log("---- update() event on main store ---");
      
      if(this.isOnline()) {
			
		} else {
		
		}
		
      console.log("---- EO update() event on main store ---");
    },
    beforesync: function(options) {
      
      console.log("---- beforesync() event on main store ---");
      
		if(this.isOnline()) {
			
		} else {
			return false;
		}
		
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
