const {
    withNativeFederation,
    shareAll,
  } = require('@angular-architects/native-federation/config');
  
  module.exports = withNativeFederation({
    name: 'phobos-maptopol',
  
    exposes: {
      './Component': './src/app/app.component.ts',
      './Routes': './src/app/app.routes.ts',
    },
  
    shared: {
      ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto', }),
    '@phobos/core': { requiredVersion: 'auto', import: '@phobos/core', singleton: true },
    },
  
    skip: [
      'rxjs/ajax',
      'rxjs/fetch',
      'rxjs/testing',
      // 'rxjs/webSocket',
      '@phobos/elements',
      '@phobos-maptool/dto',
      '@phobos-maptool/protocol',
      '@phobos-maptool/models',
      '@trx/map',
      // Add further packages you don't need at runtime
    ],
  });