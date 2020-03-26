import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonPage } from '@ionic/react';
import alert from 'common/helpers/alert';
import showInvalidsMessage from 'helpers/invalidsMessage';
import Header from './Header';
import Main from './Main';

function increaseCount(occ) {
  const { count } = occ.attrs;
  occ.attrs.count = count + 1;
  occ.save();
}

function deleteOccurrence(occ) {
  const taxon = occ.attrs.taxon.scientific_name;
  alert({
    header: t('Delete'),
    message: `${t('Are you sure you want to delete')} ${taxon}?`,
    buttons: [
      {
        text: t('Cancel'),
        role: 'cancel',
        cssClass: 'primary',
      },
      {
        text: t('Delete'),
        cssClass: 'secondary',
        handler: () => {
          occ.destroy();
        },
      },
    ],
  });
}

function setSurveyEndTime(sample) {
  sample.attrs.surveyEndime = new Date(); // eslint-disable-line no-param-reassign
  return sample.save();
}

/* eslint-disable no-param-reassign */
function toggleTimer(sample) {
  if (sample.timerPausedTime.time) {
    const pausedTime =
      Date.now() - new Date(sample.timerPausedTime.time).getTime();
    sample.metadata.pausedTime += pausedTime;
    sample.timerPausedTime.time = null;
    sample.save();
    return;
  }
  sample.timerPausedTime.time = new Date();
}
/* eslint-enable no-param-reassign */

@observer
class Container extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    match: PropTypes.object,
    history: PropTypes.object,
    appModel: PropTypes.object.isRequired,
  };

  _processSubmission = () => {
    const { history, sample } = this.props;

    const invalids = sample.validateRemote();
    if (invalids) {
      showInvalidsMessage(invalids);
      return;
    }

    sample.toggleGPStracking(false);
    sample.saveRemote();

    history.replace(`/home/user-surveys`);
  };

  _processDraft = async () => {
    const { history, appModel, sample } = this.props;

    appModel.attrs.areaCountDraftId = null;
    await appModel.save();

    const saveAndReturn = () => {
      setSurveyEndTime(sample);
      sample.toggleGPStracking(false);
      sample.stopVibrateCounter();

      sample.save();
      history.replace(`/home/user-surveys`);
    };

    const invalids = sample.validateRemote();
    if (invalids) {
      showInvalidsMessage(invalids, saveAndReturn);
      return;
    }

    sample.metadata.saved = true;
    saveAndReturn();
  };

  onSubmit = async () => {
    const { sample } = this.props;

    if (!sample.metadata.saved) {
      await this._processDraft();
      return;
    }

    await this._processSubmission();
  };

  navigateToOccurrence = occ => {
    const { match, history } = this.props;
    const sampleID = match.params.id;

    history.push(`/survey/area/${sampleID}/edit/occ/${occ.cid}`);
  };

  toggleSpeciesSort = () => {
    const { appModel } = this.props;
    const { areaSurveyListSortedByTime } = appModel.attrs;
    appModel.attrs.areaSurveyListSortedByTime = !areaSurveyListSortedByTime;
    appModel.save();
  };

  render() {
    const { sample, appModel, history } = this.props;

    if (!sample) {
      return null;
    }

    const { areaSurveyListSortedByTime } = appModel.attrs;
    const isTraining = sample.metadata.training;
    const isEditing = sample.metadata.saved;
    const isDisabled = !!sample.metadata.synced_on;

    return (
      <IonPage>
        <Header
          onSubmit={this.onSubmit}
          isTraining={isTraining}
          isEditing={isEditing}
          isDisabled={isDisabled}
        />
        <Main
          sample={sample}
          deleteOccurrence={deleteOccurrence}
          increaseCount={increaseCount}
          toggleTimer={toggleTimer}
          navigateToOccurrence={this.navigateToOccurrence}
          areaSurveyListSortedByTime={areaSurveyListSortedByTime}
          onToggleSpeciesSort={this.toggleSpeciesSort}
          history={history}
          isDisabled={isDisabled}
        />
      </IonPage>
    );
  }
}

export default Container;
