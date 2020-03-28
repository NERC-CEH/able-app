import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonRouterOutlet,
  IonFabButton,
  IonFabList,
} from '@ionic/react';
import { person, add, book, menu, home } from 'ionicons/icons';
import savedSamples from 'saved_samples';
import appModel from 'app_model';
import userModel from 'user_model';
import LongPressFabButton from 'Lib/LongPressFabButton';
import PrivateRoute from 'Lib/PrivateRoute';
import Report from './Report';
import Species from './Species';
import UserSurveys from './Surveys';
import './styles.scss';

const Component = ({ history }) => {
  const navigateTo15MinSurvey = () => history.push(`/survey/area/new/edit`);

  return (
    <>
      <LongPressFabButton onClick={navigateTo15MinSurvey} icon={add}>
        <IonFabList side="top">
          <IonFabButton
            class="fab-button-label"
            routerLink="/survey/transect/new/edit"
          >
            <IonLabel>{t('eBMS Transect')}</IonLabel>
          </IonFabButton>

          <div className="long-press-surveys-label">
            {t('Other recording options')}
          </div>
        </IonFabList>
      </LongPressFabButton>

      <IonTabs>
        <IonRouterOutlet>
          <Route
            path="/home/report"
            render={props => <Report appModel={appModel} {...props} />}
            exact
          />
          <Route
            path="/home/species"
            render={() => (
              <Species appModel={appModel} savedSamples={savedSamples} />
            )}
            exact
          />
          <PrivateRoute
            path="/home/user-surveys"
            userModel={userModel}
            component={() => <UserSurveys savedSamples={savedSamples} />}
            exact
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home/report" href="/home/report">
            <IonIcon icon={home} />
            <IonLabel>{t('Home')}</IonLabel>
          </IonTabButton>

          <IonTabButton tab="home/species" href="/home/species">
            <IonIcon icon={book} />
            <IonLabel>{t('Guide')}</IonLabel>
          </IonTabButton>

          <IonTabButton>{/* placeholder */}</IonTabButton>

          <IonTabButton tab="/home/user-surveys" href="/home/user-surveys">
            <IonIcon icon={person} />
            <IonLabel>{t('Surveys')}</IonLabel>
          </IonTabButton>

          <IonTabButton tab="menu" href="/info/menu">
            <IonIcon icon={menu} />
            <IonLabel>{t('Menu')}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

Component.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Component;
