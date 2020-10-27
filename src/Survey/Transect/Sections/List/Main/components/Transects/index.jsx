import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { Main } from '@apps';
import { Trans as T } from 'react-i18next';
import transformToLatLon from 'helpers/location';
import SVG from '../SVG';
import './styles.scss';

function showNoTransects() {
  return (
    <IonList lines="full">
      <IonItem className="empty">
        <span>
          <T>
            You don&#39;t have any transects. Please try to refresh the list.
          </T>
        </span>
      </IonItem>
    </IonList>
  );
}

function getTransectItem(transect, onTransectSelect) {
  const geometries = transect.sections.map(section => {
    const geometry = toJS(section.geom);
    geometry.coordinates = transformToLatLon(geometry);
    return geometry;
  });

  const geom = {
    type: 'GeometryCollection',
    geometries,
  };

  return (
    <IonItem
      key={transect.id}
      className="transect"
      onClick={() => onTransectSelect(transect)}
      detail
    >
      <IonLabel slot="start">{transect.name || transect.id}</IonLabel>
      <IonLabel slot="end">{transect.sections.length}</IonLabel>
      <SVG geom={geom} />
    </IonItem>
  );
}

function Transects({ appModel, onTransectSelect }) {
  const { transects } = appModel.attrs;

  const hasTransects = !!transects.length;
  const transectsList = hasTransects
    ? transects.map(transect => getTransectItem(transect, onTransectSelect))
    : showNoTransects();

  return (
    <Main id="transect-list">
      <div className="info-message">
        <p>
          <T>Please select your transect first.</T>
        </p>
      </div>
      <IonList lines="full">{transectsList}</IonList>
    </Main>
  );
}

Transects.propTypes = {
  appModel: PropTypes.object.isRequired,
  onTransectSelect: PropTypes.func.isRequired,
};

export default observer(Transects);