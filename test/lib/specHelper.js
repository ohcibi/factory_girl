defineFactoryGirl = function(){
  beforeEach(function() {
    FactoryGirl.clear();

    FactoryGirl.sequence('s_id', function(i) {
      return 'id_' + i;
    });

  	FactoryGirl.define('user', {primaryKey: false, alias: 'account'}, function() {
  		this.id = 1;
  		this.name = 'Minh Quy';
  	})

  	FactoryGirl.define('visa', {primaryKey: false, alias: ['master', 'paypal']}, function() {
  		this.id = 3;
  		this.label = 'secret';
  		this.hasOne('user');
  	})

  	FactoryGirl.define('profile', {primaryKey: false}, function() {
  		this.sequence('s_id', 'id');
  		this.emotion = 'Happy';
  		this.belongsTo('user');
  	})

  	FactoryGirl.define('place', {primaryKey: false}, function() {
  		this.id = 4;
  		this.name = 'Earth';
  		this.hasMany('users', 'user', 2);
  	})

  	FactoryGirl.define('plateau', {primaryKey: false, inherit: 'place'}, function() {
  		this.id = 5;
  		this.type = 'plateau';
  	})
  });
};

createNewFactory = function(opts, define) {
  beforeEach(function() {
    libAPI.datum.setDefined('mquy', opts, define);
  })
}
