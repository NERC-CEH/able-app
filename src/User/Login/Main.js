import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonButton, IonList, IonItem } from '@ionic/react';
import Main from 'Lib/Main';
import { key, person, eye, eyeOff } from 'ionicons/icons';
import { Formik, Form } from 'formik';
import InputWithValidation from 'Lib/InputWithValidation';

class Component extends React.Component {
  state = {
    showPassword: false,
  };

  togglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const { showPassword } = this.state;
    const { onSubmit, schema } = this.props;

    return (
      <Main>
        <div className="info-message">
          <p>{t('Please sign in with your eBMS account or register.')}</p>
        </div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{}}
        >
          {props => (
            <Form>
              <IonList lines="full">
                <InputWithValidation
                  name="name"
                  placeholder={t('Username or email')}
                  icon={person}
                  type="text"
                  {...props}
                />
                <InputWithValidation
                  name="password"
                  placeholder={t('Password')}
                  icon={key}
                  type={showPassword ? 'text' : 'password'}
                  {...props}
                >
                  <IonButton
                    slot="end"
                    onClick={this.togglePassword}
                    fill="clear"
                  >
                    <IonIcon
                      icon={showPassword ? eye : eyeOff}
                      faint
                      size="small"
                    />
                  </IonButton>
                </InputWithValidation>
              </IonList>

              <IonButton color="primary" type="submit" expand="block">
                {t('Sign in')}
              </IonButton>

              <IonList>
                <IonItem routerLink="/user/register" detail>
                  {t('Register')}
                </IonItem>
                <IonItem routerLink="/user/reset" detail>
                  {t('Forgot password?')}
                </IonItem>
              </IonList>
            </Form>
          )}
        </Formik>
      </Main>
    );
  }
}

Component.propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Component;
