Ext.define('AM.controller.Users', {
  extend: 'Ext.app.Controller',

  stores: ['Users'],
  models: ['User'],

  views: [
    'user.List',
    'user.Form'
  ],

  refs: [{
    ref: 'list',
    selector: 'userlist'
  }],

  init: function() {
    this.control({
      'userlist': {
        selectionchange: this.selectionChange
      },
      'userform button[action=save]': {
        click: this.updateUser
      },
      'button[action=addUser]': {
        click: this.addUser
      },
      'button[action=deleteUser]': {
        click: this.deleteUser
      }
    });
  },

  addUser: function() {
    var view = Ext.widget('userform');
    view.show();
  },

  updateUser: function(button) {
    var win = button.up('window');
    var form = win.down('form');

    var store = this.getUsersStore();
    //var store = this.getOfflineUsersStore();
    var record = form.getRecord();
    var values = form.getValues();

    if (record) { 
		// should be an update... ;>
    } else { // perform create
      store.add(values);
      store.sync();
      win.close();
    }

  },

  deleteUser: function() {
    var record = this.getList().getSelectedUser();

    if (record) {
      var store = this.getUsersStore();
      store.remove(record);
		
      store.sync();
    }

  },

  selectionChange: function(selectionModel, selections) {
    var grid = this.getList();

    if (selections.length > 0) {
      grid.enableRecordRelatedButtons();
    } else {
      grid.disableRecordRelatedButtons();
    }
  }

});

