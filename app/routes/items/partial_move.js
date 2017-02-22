import AuthorizeRoute from './../authorize';

export default AuthorizeRoute.extend({
  model(params){
    return this.store.peekRecord("item", params.item_id) || this.store.findRecord('item', params.item_id);
  }
});