/** ****************************************************************************
 * Main app configuration file.
 **************************************************************************** */
import Indicia from 'indicia';
import DateHelp from 'helpers/date';
import Wkt from 'wicket';
import { toJS } from 'mobx';
import L from 'leaflet';

function transformToMeters(coordinates) {
  return coordinates.map(([lng, lat]) => {
    const { x, y } = L.Projection.SphericalMercator.project({ lat, lng });
    return [x, y];
  });
}
function getGeomString(shape) {
  const geoJSON = toJS(shape);
  if (geoJSON.type === 'Polygon') {
    geoJSON.coordinates[0] = transformToMeters(geoJSON.coordinates[0]);
  } else {
    geoJSON.coordinates = transformToMeters(geoJSON.coordinates);
  }

  const wkt = new Wkt.Wkt(geoJSON);
  return wkt.write();
}

const dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: 'numeric',
  minute: 'numeric',
});

const HOST =
  process.env.APP_INDICIA_API_HOST || 'https://butterfly-monitoring.net/';

const CONFIG = {
  // variables replaced on build
  version: process.env.APP_VERSION,
  build: process.env.APP_BUILD,
  name: process.env.APP_NAME,

  environment: __ENV__,
  experiments: process.env.APP_EXPERIMENTS,
  training: process.env.APP_TRAINING,

  gps_accuracy_limit: 100,

  site_url: HOST,

  // use prod logging if testing otherwise full log
  log: !__TEST__,

  // error analytics
  sentry: {
    key: !__TEST__ && process.env.APP_SENTRY_KEY,
    project: '1448211',
  },

  users: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER}/users/`,
    timeout: 80000,
  },

  reports: {
    url: `${HOST +
      Indicia.API_BASE +
      Indicia.API_VER +
      Indicia.API_REPORTS_PATH}`,
    timeout: 80000,
  },

  // mapping
  map: {
    mapbox_api_key: process.env.APP_MAPBOX_MAP_KEY,
    mapbox_osm_id: 'cehapps.0fenl1fe',
    mapbox_satellite_id: 'cehapps.0femh3mh',
  },

  DEFAULT_SURVEY_TIME: 15 * 60 * 1000, // 15 mins
  DEFAULT_TRANSECT_BUFFER: 10, // 5x2 meters

  // indicia configuration
  indicia: {
    host: HOST,
    api_key: process.env.APP_INDICIA_API_KEY,
    website_id: 118,
    id: 565,
    webForm: 'enter-app-record',
    attrs: {
      smp: {
        location: {
          values(location, submission) {
            const areaId = CONFIG.indicia.attrs.smp.area.id;

            const geomAndArea = {
              [areaId]: location.area,
              geom: getGeomString(location.shape),
            };

            // eslint-disable-next-line
            submission.fields = {
              ...submission.fields,
              ...geomAndArea,
            };

            return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
              location.longitude
            ).toFixed(7)}`;
          },
        },
        device: {
          id: 922,
          values: {
            iOS: 2398,
            Android: 2399,
          },
        },
        device_version: { id: 759 },
        app_version: { id: 1139 },

        date: {
          values(date) {
            return DateHelp.print(date);
          },
          isValid: val => val && val.toString() !== 'Invalid Date',
          type: 'date',
          max: () => new Date(),
        },

        surveyStartTime: {
          id: 1385,
          values: date => dateTimeFormat.format(new Date(date)),
        },
        surveyEndime: {
          id: 1386,
          values: date => dateTimeFormat.format(new Date(date)),
        },

        area: { id: 723 },
      },
      occ: {
        training: {
          id: 'training',
        },

        taxon: {
          values(taxon) {
            return taxon.warehouse_id;
          },
        },
        count: { id: 780 },
        stage: {
          id: 293,
          label: 'Stage',
          type: 'radio',
          default: 'Not Recorded',

          values: {
            Adults: 3929,
            Larvae: 3931,
            Eggs: 3932,
            Pupae: 3930,
            'Larval webs': 14079,
          },
        },
      },
    },
  },
};

export default CONFIG;
