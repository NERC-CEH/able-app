import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonBadge,
} from '@ionic/react';
import { alert } from '@apps';
import butterflyIcon from 'common/images/butterfly.svg';
import OnlineStatus from './components/OnlineStatus';
import ErrorMessage from './components/ErrorMessage';
import './styles.scss';

function deleteSurvey(sample) {
  alert({
    header: t('Delete'),
    message: t('Are you sure you want to delete this survey?'),
    buttons: [
      {
        text: t('Cancel'),
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: t('Delete'),
        cssClass: 'secondary',
        handler: () => sample.destroy(),
      },
    ],
  });
}

const Survey = observer(({ sample }) => {
  const date = new Date(sample.metadata.created_on);
  const prettyDate = date.toLocaleDateString();
  const survey = sample.getSurvey();

  let speciesCount = sample.occurrences.length;
  if (survey.name === 'area') {
    const isNotZeroCount = occ => occ.attrs.count;
    speciesCount = sample.occurrences.filter(isNotZeroCount).length;
  }

  if (survey.name === 'precise-area') {
    speciesCount = sample.samples.length;
  }

  const href = !sample.remote.synchronising
    ? `/survey/${survey.name}/${sample.cid}/edit`
    : undefined;

  function getSampleInfo() {
    const label = (
      <>
        <h3>
          <b>
            <T>{survey.label}</T>
          </b>
        </h3>
        <h3>{prettyDate}</h3>
      </>
    );

    if (survey.name === 'transect') {
      return <IonLabel class="ion-text-wrap">{label}</IonLabel>;
    }

    return (
      <IonLabel class="ion-text-wrap">
        {label}
        <IonBadge color="medium">
          <IonIcon icon={butterflyIcon} /> {speciesCount}
        </IonBadge>
      </IonLabel>
    );
  }
  return (
    <IonItemSliding class="survey-list-item">
      <ErrorMessage sample={sample} />
      <IonItem routerLink={href}>
        {getSampleInfo()}
        <OnlineStatus sample={sample} />
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => deleteSurvey(sample)}>
          <T>Delete</T>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
});

Survey.propTypes = {
  sample: PropTypes.object.isRequired,
};

export default Survey;
