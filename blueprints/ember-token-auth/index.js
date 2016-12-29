module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addPackageToProject('ember-oauth2', '2.0.2-beta');
  },

  afterUninstall: function() {
    return this.removePackageFromProject('ember-oauth2');
  }
};
