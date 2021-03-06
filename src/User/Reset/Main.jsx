import React from 'react';
import PropTypes from 'prop-types';
import { IonButton, IonList } from '@ionic/react';
import { Main, InputWithValidation, InfoMessage } from '@apps';
import { Trans as T } from 'react-i18next';
import { informationCircle, mailOutline } from 'ionicons/icons';
import { Formik, Form } from 'formik';
import './styles.scss';

const Component = ({ onSubmit, schema }) => {
  return (
    <Main>
      <InfoMessage className="blue" icon={informationCircle}>
        Enter your email address to request a password reset.
      </InfoMessage>

      <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{}}>
        {props => (
          <Form>
            <IonList lines="full">
              <div className="rounded">
                <InputWithValidation
                  name="email"
                  placeholder="Email"
                  icon={mailOutline}
                  type="email"
                  {...props}
                />
              </div>
            </IonList>

            <IonButton color="primary" type="submit" expand="block">
              <T>Reset</T>
            </IonButton>
          </Form>
        )}
      </Formik>
    </Main>
  );
};

Component.propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Component;
