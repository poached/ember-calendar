/* eslint-env node*/
'use strict';

const path = require('path');

module.exports = {
  name: 'ember-calendar',

  included: function(app) {
    this._super.included(app);

    var options = app.options.emberCalendar || {};

    if (!('includeFontAwesomeAssets' in options)) {
      options.includeFontAwesomeAssets = true;
    }

    if (options.includeFontAwesomeAssets) {
      app.import('node_modules/font-awesome/fonts/fontawesome-webfont.ttf', {
        destDir: 'fonts'
      });

      app.import('node_modules/font-awesome/fonts/fontawesome-webfont.woff', {
        destDir: 'fonts'
      });

      app.import('node_modules/font-awesome/fonts/fontawesome-webfont.woff2', {
        destDir: 'fonts'
      });

      app.import('node_modules/font-awesome/fonts/fontawesome-webfont.svg', {
        destDir: 'fonts'
      });

      app.import('node_modules/font-awesome/fonts/fontawesome-webfont.eot', {
        destDir: 'fonts'
      });
    }

    app.import('node_modules/interactjs/dist/interact.js');
    app.import('vendor/shims/interact.js');

    app.import('vendor/jstz.js');
    app.import('vendor/shims/jstz.js');

    if (app.env === 'test') {
      app.import('node_modules/jquery-simulate/jquery.simulate.js', {
        type: 'test'
      });
    }
  }
};
