require('babel-register');

require.extensions['.css'] = function () { return; };
require.extensions['.scss'] = function () { return; };
