import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IonItem, IonTextarea } from '@ionic/react';
import Page from 'Lib/Page';
import Header from 'Lib/Header';
import Main from 'Lib/Main';
import { observer } from 'mobx-react';

@observer
class EditOccurrence extends Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
  };

  onChange = e => {
    const { sample } = this.props;

    sample.attrs.comment = e.target.value;
    sample.save();
  };

  render() {
    const { sample } = this.props;
    const { comment } = sample.attrs;

    return (
      <Page id="area-count-occurrence-edit-comment">
        <Header title={t('Comment')} />
        <Main>
          <div className="info-message">
            <p>{t('Please add any extra info about this record.')}</p>
          </div>
          <IonItem>
            <IonTextarea
              placeholder={t('Enter more information here...')}
              value={comment}
              onIonChange={this.onChange}
              debounce={200}
              rows={8}
            />
          </IonItem>
        </Main>
      </Page>
    );
  }
}
export default EditOccurrence;
