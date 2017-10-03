import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('set_item', 'SetItem model',{
  needs: ['model:code', 'model:item', 'model:designation', 'model:location', 'model:code', 'model:donor_condition', 'model:packages_location', 'model:orders_package', 'model:image', 'model:contact', 'model:organisation', 'model:local-order']
});

test('check attributes', function(assert){
  assert.expect(1);
  var model = this.subject();
  var description = Object.keys(model.toJSON()).indexOf('description') > -1;

  assert.ok(description);
});

test('Relationships with other models', function(assert) {
  assert.expect(4);
  var SetItem = this.store().modelFor('set_item');
  var relationshipWithCode = Ember.get(SetItem, 'relationshipsByName').get('code');
  var relationshipWithItem = Ember.get(SetItem, 'relationshipsByName').get('items');

  assert.equal(relationshipWithCode.key, 'code');
  assert.equal(relationshipWithCode.kind, 'belongsTo');
  assert.equal(relationshipWithItem.key, 'items');
  assert.equal(relationshipWithItem.kind, 'hasMany');
});


test('check multiQuantitySet computed property', function(assert){
  var model, store, item1, item2, item3;
  model = this.subject();
  store = this.store();

  Ember.run(function(){
    item1 = store.createRecord('item', { id: 1, quantity: 2 });
    item2 = store.createRecord('item', { id: 2, quantity: 3 });
    item3 = store.createRecord('item', { id: 3, quantity: 1 });

    model.get('items').pushObjects([item1, item2, item3]);
  });

  assert.equal(model.get('multiQuantitySet'), true);
});

test('check allDesignated, designatedItems copmuted properties', function(assert){
  assert.expect(2);
  var model, store, item1, item2, item3, designation;
  model = this.subject();
  store = this.store();

  Ember.run(function(){
    designation = store.createRecord('designation', {
                id:               5,
                detailType:       'StockitLocalOrder',
                status:           'Active',
                createdAt:        '12/07/2016',
                updatedAt:        '12/07/2016'
              });
    item1 = store.createRecord('item', { id: 1, designation: designation });
    item2 = store.createRecord('item', { id: 2, designation: designation });
    item3 = store.createRecord('item', { id: 3, designation: designation });

    model.get('items').pushObjects([item1, item2, item3]);
  });

  assert.equal(model.get('allDesignated'), true);
  assert.equal(Ember.compare(model.get('designatedItems').getEach('id'),["1", "2", "3"]), 0);
});

test('check sortedItems computed property', function(assert){
  var model, store, item1, item2, item3;
  model = this.subject();
  store = this.store();

  Ember.run(function(){
    item1 = store.createRecord('item', { id: 1, quantity: 1 });
    item2 = store.createRecord('item', { id: 2, quantity: 1 });
    item3 = store.createRecord('item', { id: 3, quantity: 1 });
    model.get('items').pushObjects([item1, item2, item3]);
  });

  assert.equal(Ember.compare(model.get('sortedItems').getEach('id'), ["1", "2", "3"]), 0);
});

test('check allDispatched computed property', function(assert){
  var model, store, item1, item2, item3;
  model = this.subject();
  store = this.store();

  Ember.run(function(){
    item1 = store.createRecord('item', { id: 1, isDispatched: true });
    item2 = store.createRecord('item', { id: 2, isDispatched: true });
    item3 = store.createRecord('item', { id: 3, isDispatched: true });
    model.get('items').pushObjects([item1, item2, item3]);
  });

  assert.equal(model.get('allDispatched'), true);
});

test('check hasZeroQty computed property', function(assert){
  var model, store, item;
  model = this.subject();
  store = this.store();

  Ember.run(function(){
    item = store.createRecord('item', { id: 1, quantity: 0 });
    model.get('items').pushObject(item);
  });

  assert.equal(model.get('hasZeroQty'), false);
});

test('check hasSingleDesignation computed propety', function(assert){
  var model, store, ordersPackage, item;
  model = this.subject();
  store = this.store();

  Ember.run(function(){
    ordersPackage = store.createRecord('orders_package', {id: 1, state: 'designated'});
    item = store.createRecord('item', { id: 1, quantity: 0 });
    item.get('ordersPackages').pushObject(ordersPackage);
    model.get('items').pushObject(item);
  });

  assert.equal(model.get('hasSingleDesignation'), true);
});