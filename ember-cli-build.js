/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var webRelease = process.env.EMBER_CLI_CORDOVA === '0' && ['production', 'staging'].indexOf(process.env.EMBER_ENV) !== -1;

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sourcemaps: ['js', 'css'],
    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map'],
      enabled: webRelease
    },
    gzip: {
      keepUncompressed: true,
      extensions: ['js', 'css', 'map', 'ttf', 'ott', 'eot', 'svg'],
      enabled: webRelease
    },
    sassOptions: {
      extension: 'scss'
    }
  });

  app.import('bower_components/foundation/js/foundation/foundation.js');
  app.import("bower_components/font-awesome/css/font-awesome.css");
  app.import("bower_components/font-awesome/fonts/fontawesome-webfont.eot", { destDir: "fonts" });
  app.import("bower_components/font-awesome/fonts/fontawesome-webfont.svg", { destDir: "fonts" });
  app.import("bower_components/font-awesome/fonts/fontawesome-webfont.ttf", { destDir: "fonts" });
  app.import("bower_components/font-awesome/fonts/fontawesome-webfont.woff", { destDir: "fonts" });
  app.import("bower_components/font-awesome/fonts/fontawesome-webfont.woff2", { destDir: "fonts" });
  app.import("bower_components/font-awesome/fonts/FontAwesome.otf", { destDir: "fonts" });

  app.import('bower_components/airbrake-js/dist/client.js');
  app.import('bower_components/moment/moment.js');

  app.import('bower_components/slick-carousel/slick/ajax-loader.gif');
  app.import('bower_components/slick-carousel/slick/slick-theme.css');
  app.import('bower_components/slick-carousel/slick/slick.css');
  app.import('bower_components/slick-carousel/slick/slick.js');
  app.import('bower_components/slick-carousel/slick/fonts/slick.eot', { destDir: "fonts" });
  app.import('bower_components/slick-carousel/slick/fonts/slick.svg', { destDir: "fonts" });
  app.import('bower_components/slick-carousel/slick/fonts/slick.ttf', { destDir: "fonts" });
  app.import('bower_components/slick-carousel/slick/fonts/slick.woff', { destDir: "fonts" });

  app.import('bower_components/lightgallery/src/css/lightgallery.css');
  app.import('bower_components/lightgallery/src/css/lg-transitions.css');
  app.import('bower_components/lightgallery/src/js/lightgallery.js');
  app.import('bower_components/lightgallery/src/js/lg-zoom.js');
  app.import('bower_components/lightgallery/src/fonts/lg.eot', { destDir: "fonts" });
  app.import('bower_components/lightgallery/src/fonts/lg.svg', { destDir: "fonts" });
  app.import('bower_components/lightgallery/src/fonts/lg.ttf', { destDir: "fonts" });
  app.import('bower_components/lightgallery/src/fonts/lg.woff', { destDir: "fonts" });
  app.import('bower_components/lightgallery/src/img/loading.gif', {
    destDir: '/img'
  });

  return app.toTree();
};
