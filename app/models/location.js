import { computed } from '@ember/object';
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default Model.extend({
  area:     attr('string'),
  building: attr('string'),
  createdAt: attr('date'),
  recentlyUsedAt: attr('date'),

  items: hasMany('item', { async: false }),
  package_locations: hasMany('location', { async: false }),

  name: computed('area', 'building', function() {
    var area = this.get("area");
    var building = this.get("building");
    return area ? `${building}-${area}` : building;
  }),

  displayName: computed('area', 'building', function() {
    var area = this.get("area");
    var building = this.get("building");
    return area ? `${building}${area}` : building;
  })
});
