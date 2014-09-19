describe('Module', function () {
	defineFactoryGirl();

	describe('#define()', function () {
		it('throw error when lack function', function () {
			(function() {
				FactoryGirl.define('user');
			}).should.throw();
		});

		it('define mquy', function () {
			FactoryGirl.define('mquy', function() {});
			expect(FactoryGirl.defined('mquy')).to.be.true;
		});

		it('generates a primary key "id" by default', function() {
			FactoryGirl.define('mquy', function() {});
			mquy1 = libAPI.datum.createFactory('mquy');
			mquy2 = libAPI.datum.createFactory('mquy');
			mquy3 = libAPI.datum.createFactory('mquy');

			expect(mquy1.id).to.equal(1);
			expect(mquy2.id).to.equal(2);
			expect(mquy3.id).to.equal(3);
		});
		
		it('does not generate a primary key when the option is set to false', function() {
			FactoryGirl.define('mquy', {primaryKey: false}, function() {});
			mquy1 = libAPI.datum.createFactory('mquy');
			mquy2 = libAPI.datum.createFactory('mquy');
			mquy3 = libAPI.datum.createFactory('mquy');

			expect(mquy1.id).to.be.undefined;
			expect(mquy2.id).to.be.undefined;
			expect(mquy3.id).to.be.undefined;
		});

		it('uses the primary key config setting as a primary key attribute name', function() {
			FactoryGirl.define('mquy', {primaryKey: 'mquy_id'}, function() {});
			mquy1 = libAPI.datum.createFactory('mquy');
			mquy2 = libAPI.datum.createFactory('mquy');
			mquy3 = libAPI.datum.createFactory('mquy');

			expect(mquy1.mquy_id).to.equal(1);
			expect(mquy2.mquy_id).to.equal(2);
			expect(mquy3.mquy_id).to.equal(3);
		});

		it('sets the primaryKey if it is given to a constant value', function() {
			FactoryGirl.define('mquy', {primaryKey: 'mquy_id'}, function() {});
			mquy1 = libAPI.datum.createFactory('mquy', {mquy_id: 55});
			mquy2 = libAPI.datum.createFactory('mquy', {mquy_id: 56});
			mquy3 = libAPI.datum.createFactory('mquy', {mquy_id: 57});

			expect(mquy1.mquy_id).to.equal(55);
			expect(mquy2.mquy_id).to.equal(56);
			expect(mquy3.mquy_id).to.equal(57);
		})

		it('throws an error if the constant primary key already exists', function() {
			FactoryGirl.define('mquy', function() {});
			mquy1 = libAPI.datum.createFactory('mquy');
			mquy2 = function() {
				libAPI.datum.createFactory('mquy', {id: 1});
			}

			expect(mquy2).to.throw('Primary Key "1" for factory "mquy" already exists');
		});

		it('does not allow to define a primary key in the factories definition function', function() {
			FactoryGirl.define('mquy1', function() { this.id = 1 });

			expect(function() {
				FactoryGirl.create('mquy1');
			}).to.throw('You may not define a value for the primary key attribute "id"');
			FactoryGirl.define('mquy2', {primaryKey: 'mquy_id'}, function() { this.mquy_id = 1 });

			expect(function() {
				FactoryGirl.create('mquy2');
			}).to.throw('You may not define a value for the primary key attribute "mquy_id"');
		});

		it('generates auto incrementing ids without duplicates', function() {
			FactoryGirl.define('mquy', function() {});

			mquy1 = FactoryGirl.create('mquy', {id: 1});
			mquy2 = FactoryGirl.create('mquy', {id: 2});
			mquy3 = FactoryGirl.create('mquy', {id: 3});
			mquy4 = FactoryGirl.create('mquy');

			expect(mquy1.id).to.equal(1);
			expect(mquy2.id).to.equal(2);
			expect(mquy3.id).to.equal(3);
			expect(mquy4.id).to.equal(4);
		});
	});

	describe('#defined()', function () {
		it('should have user', function () {
			expect(FactoryGirl.defined('user')).to.be.true;
		});

		it('should not have mquy', function () {
			expect(FactoryGirl.defined('mquy')).to.be.false;
		});
	});

	describe('#create()', function () {
		it('should create user', function () {
			user = FactoryGirl.create('user')
			expect(user).to.exist;
		});
	});

	describe('#createLists()', function () {
		it('should have 2 user', function () {
			users = FactoryGirl.createLists('user', 2);
			expect(users).to.have.length(2);
		});
	});

	describe('#attributesFor()', function () {
		it('user should have ... attributes', function () {
			user = FactoryGirl.attributesFor('user');
			expect(user).to.eql({id: 1, name: 'Minh Quy'});
		});
	});
});
