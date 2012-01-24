Ext.application({ // create a new instance of Application class
  name: 'AM', // the global namespace

  appFolder: 'javascripts/app',

  controllers: ['Users'],
  
  requires: [
	'Ext.data.proxy.LocalStorage',
	'Ext.data.proxy.Rest',
	'Ext.form.Panel',
	'Ext.form.field.Hidden'
  ]
});

