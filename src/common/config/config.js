/** ****************************************************************************
 * Main app configuration file.
 **************************************************************************** */
import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { isPlatform } from '@ionic/react';
import Indicia from '@indicia-js/core';

const HOST =
  process.env.APP_INDICIA_API_HOST || 'https://butterfly-monitoring.net/';

const config = {
  // variables replaced on build
  version: process.env.APP_VERSION,
  build: process.env.APP_BUILD,
  name: process.env.APP_NAME,

  environment: __ENV__,
  experiments: process.env.APP_EXPERIMENTS,
  training: process.env.APP_TRAINING,

  gps_accuracy_limit: 100,

  site_url: HOST,

  weatherSiteApiKey: process.env.APP_WEATHER_SITE_API_KEY,
  weatherSiteUrl: 'https://api.openweathermap.org/data/2.5/weather',

  // use prod logging if testing otherwise full log
  log: !__TEST__,

  // error analytics
  sentry: !__TEST__ && process.env.APP_SENTRY_KEY,

  feedbackEmail: 'apps%40ceh.ac.uk',

  users: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER}/users/`,
    timeout: 80000,
  },

  reports: {
    url: `${
      HOST + Indicia.API_BASE + Indicia.API_VER + Indicia.API_REPORTS_PATH
    }`,
    timeout: 80000,
  },

  // mapping
  map: {
    mapboxApiKey: process.env.APP_MAPBOX_MAP_KEY,
    mapboxSatelliteId: 'cehapps/cipqvo0c0000jcknge1z28ejp',
  },

  DEFAULT_SURVEY_TIME: 15 * 60 * 1000, // 15 mins
  DEFAULT_TRANSECT_BUFFER: 10, // 5x2 meters

  // indicia configuration
  indicia: {
    host: HOST,
    api_key: process.env.APP_INDICIA_API_KEY,
    website_id: 118,
    webForm: 'enter-app-record',
  },
};

(async function getMediaDirectory() {
  if (isPlatform('hybrid')) {
    const { uri } = await Plugins.Filesystem.getUri({
      path: '',
      directory: FilesystemDirectory.Data,
    });
    config.dataPath = uri;
  }
})();

export default config;
