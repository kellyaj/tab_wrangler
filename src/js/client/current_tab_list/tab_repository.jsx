module.exports = {
  repository: function() {
    return localStorage;
  },

  get: function(key) {
    return JSON.parse(this.repository().getItem(key));
  },

  set: function(key, data) {
    this.repository().setItem(key, JSON.stringify(data));
  },

  missingKey: function(key) {
    return this.repository().getItem(key);
  }
}
