import { test, moduleForModel } from 'ember-qunit';

moduleForModel('permission', 'Permission Model', {
  needs: []
});

test('check attributes', function(assert){
  assert.expect(1);
  var model = this.subject();
  var name = Object.keys(model.toJSON()).indexOf('name') > -1;

  assert.ok(name);
});
