import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import {
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonLabel,
} from '@ionic/react';
import { Page, Main, Header } from '@apps';
import surveys from 'common/config/surveys';

function SelectCountry({ appModel }) {
  const currentValue = appModel.attrs.primarySurvey;

  function onSelect(e) {
    const survey = e.target.value;
    appModel.attrs.primarySurvey = survey; // eslint-disable-line no-param-reassign
    appModel.save();
  }

  const translate = ({ name, label }) => [name, t(label)];

  const surveyOptions = Object.values(surveys)
    .map(translate)
    .map(([value, label]) => {
      if (value === 'area') return null; // for backwards compatible

      return (
        <React.Fragment key={value}>
          <IonItem>
            <IonLabel>{label}</IonLabel>
            <IonRadio value={value} checked={currentValue === value} />
          </IonItem>
        </React.Fragment>
      );
    });

  return (
    <Page id="primary-survey">
      <Header title="All Surveys" />

      <Main>
        <IonList>
          <IonRadioGroup onIonChange={onSelect}>{surveyOptions}</IonRadioGroup>
        </IonList>
      </Main>
    </Page>
  );
}

SelectCountry.propTypes = {
  appModel: PropTypes.object.isRequired,
};

export default observer(SelectCountry);
