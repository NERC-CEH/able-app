import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IonItem, IonTextarea, IonContent, IonPage } from '@ionic/react';
import AppHeader from 'common/Components/Header';
import { observer } from 'mobx-react';

@observer
class EditOccurrence extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    sample: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const { match, sample } = props;

    const occID = match.params.occId;
    this.occ = sample.occurrences.models.find(occ => occ.cid === occID);
  }

  onChange = e => {
    const { sample } = this.props;

    this.occ.set('comment', e.target.value);
    sample.save();
  };

  render() {
    const comment = this.occ.get('comment');

    return (
      <IonPage>
        <AppHeader title={t('Comment')} />
        <IonContent id="area-count-occurrence-edit-comment">
          <IonItem>
            <IonTextarea
              placeholder={t('Enter more information here...')}
              value={comment}
              onIonChange={this.onChange}
              debounce={200}
              rows={8}
            />
          </IonItem>
        </IonContent>
      </IonPage>
    );
  }
}
export default EditOccurrence;
