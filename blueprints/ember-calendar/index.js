/* eslint-env node*/
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var self = this;

    return self.addAddonsToProject({
      packages: [{ name: 'ember-moment', target: '7.3.0' }]
    }).then(function() {
      return self.addPackagesToProject([
        { name: 'interactjs', target: '1.2.8' },
        { name: 'jquery-simulate', target: '1.0.1' },
        { name: 'font-awesome', target: '~4.7.0' }
      ]);
    });
  }
};
