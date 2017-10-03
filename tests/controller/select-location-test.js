import { test, moduleFor } from 'ember-qunit';
import startApp from '../helpers/start-app';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import Ember from 'ember';
import '../factories/location';
import FactoryGuy from 'ember-data-factory-guy';

var App, lctn;

moduleFor('controller:select_location', 'search_code controller', {
  beforeEach: function() {
    App = startApp({}, 2);
    TestHelper.setup();
    lctn = FactoryGuy.make("location");
  },
  afterEach: function() {
    Ember.run(function() { TestHelper.teardown(); });
    Ember.run(App, 'destroy');
  }
});

test('checking default set properties', function(assert) {
  assert.expect(2);

  // get the controller instance
  var ctrl = this.subject();

  assert.equal(ctrl.get('sortProperties')[0], "createdAt:desc");
  assert.equal(ctrl.get('searchModelName'), 'location');
});
