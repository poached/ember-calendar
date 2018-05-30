(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['jstz'],
      __esModule: true,
    };
  }

  define('jstz', [], vendorModule);
})();
