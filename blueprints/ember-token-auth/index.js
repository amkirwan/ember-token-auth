module.exports = {
  afterInstall: function() {
    return this.addBowerPackageToProject('ember-oauth2', '0.5.3');
  }
};
