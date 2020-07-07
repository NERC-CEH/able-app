import React from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Page, toast, loader, device } from '@apps';
import Header from './Header';
import Main from './Main';

const { success, error, warn } = toast;

@observer
class index extends React.Component {
  static propTypes = {
    sample: PropTypes.object.isRequired,
    onTransectSelect: PropTypes.func.isRequired,
    appModel: PropTypes.object.isRequired,
    userModel: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  refreshUserTransects = async () => {
    const { userModel, appModel } = this.props;

    if (!device.isOnline()) {
      warn(t("Sorry, looks like you're offline."));
      return;
    }

    await loader.show({
      message: t('Please wait...'),
    });

    try {
      await appModel.updateUserTransects(userModel);

      success(t('Transect list was successfully updated.'));
    } catch (e) {
      error(e.message);
    }
    await loader.hide();
  };

  onTransectSelect = transect => {
    const { sample, onTransectSelect: onTransectSelectParent } = this.props;

    const location = toJS(transect);
    sample.attrs.location = location;
    onTransectSelectParent();
  };

  componentDidMount = () => {
    const { appModel } = this.props;
    if (!appModel.attrs.transects.length && device.isOnline()) {
      this.refreshUserTransects();
    }
  };

  render() {
    const { sample, appModel, match } = this.props;
    const transect = sample.attrs.location;

    return (
      <Page id="transect-sections-list">
        <Header
          showRefreshButton={!transect}
          onRefresh={() => this.refreshUserTransects()}
        />
        <Main
          sample={sample}
          appModel={appModel}
          onTransectSelect={this.onTransectSelect}
          match={match}
        />
      </Page>
    );
  }
}

export default index;
