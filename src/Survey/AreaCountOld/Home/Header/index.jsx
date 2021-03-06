import React from 'react';
import PropTypes from 'prop-types';
import { IonButton } from '@ionic/react';
import { Header } from '@apps';
import { Trans as T } from 'react-i18next';
import './styles.scss';

function getFinishButton(onSubmit, isEditing) {
  const label = isEditing ? <T>Upload</T> : <T>Finish</T>;
  return <IonButton onClick={onSubmit}>{label}</IonButton>;
}

const HeaderComponent = ({ onSubmit, isTraining, isEditing, isDisabled }) => {
  const trainingModeSubheader = isTraining && (
    <div className="training-survey">
      <T>Training Mode</T>
    </div>
  );

  return (
    <Header
      title="15min Count"
      rightSlot={!isDisabled && getFinishButton(onSubmit, isEditing)}
      subheader={trainingModeSubheader}
      defaultHref="/home/user-surveys"
    />
  );
};

HeaderComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isTraining: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default HeaderComponent;
