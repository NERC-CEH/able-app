import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import Page from 'Lib/Page';
import Main from 'Lib/Main';
import Header from 'Lib/Header';
import species from 'common/data/species.profiles.data';
import './sponsors.png';
import './styles.scss';

export default () => (
  <Page id="credits">
    <Header title={t('Credits')} />
    <Main class="ion-padding">
      <IonList lines="none">
        <IonItem>
          <img src="/images/sponsors.png" alt="" />
        </IonItem>
      </IonList>

      <IonList lines="none">
        <IonItem lines="inset">
          <IonLabel>
            <b>
              {t(
                'We are very grateful for all the people that helped to create this app:'
              )}
            </b>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <b>David Roy</b> (UK Centre for Ecology & Hydrology)
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Karolis Kazlauskis</b> (Flumens)
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Cristina Sevilleja</b> (Dutch Butterfly Conservation)
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Chris van Swaay</b> (Dutch Butterfly Conservation, Butterfly
            Conservation Europe)
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Irma Wynhoff</b> (Dutch Butterfly Conservation, Butterfly
            Conservation Europe)
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Martin Warren</b> (Butterfly Conservation Europe)
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Biren Rathod</b> (the UK Centre for Ecology & Hydrology)
          </IonLabel>
        </IonItem>
      </IonList>

      <IonList>
        <IonItem lines="none">
          <IonLabel>
            {t(
              `ABLE is funded by a service contract from the European Union Directorate for the Environment, for an initial period of two years from 2019-20.`
            )}
          </IonLabel>
        </IonItem>
      </IonList>
      <IonList lines="none">
        <IonItem lines="inset">
          <IonLabel>
            <b>{t(`ABLE partners:`)}</b>
          </IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>
            <b>Butterfly Conservation Europe</b> – Sue Collins, Martin Warren
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>UK Centre for Ecology and Hydrology (UKCEH, UK)</b> – David Roy,
            Reto Schmucki
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Sub-contracts to UKCEH</b>: Karolis Kazlauskis (App development),
            Gary van Breda (Website development), John van Breda (Website
            development)
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>
              Dutch Butterfly Conservation, De Vlinderstichting (Netherlands)
            </b>
            – Chris van Swaay, Cristina Sevilleja, Irma Wynhoff
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Helmholtz Centre for Environmental Research (UFZ, Germany)</b>–
            Josef Settele, Oliver Schweiger
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Butterfly Conservation UK</b> – Nigel Bourn, Emily Dennis
          </IonLabel>
        </IonItem>
      </IonList>

      <IonList lines="none">
        <IonItem lines="inset">
          <b>
            {t(
              `In June 2019, the following organisations are partners in eBMS:`
            )}
          </b>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>UKCEH</b>, David Roy
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Butterfly Conservation, UK </b>, BC UK, Ian Middlebrook
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Helmholtz-Zentrum für Umweltforschung GmbH - UFZ</b>, UFZ, Josef
            Settele
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>De Vlinderstichting</b>, Dutch BC, Chris van Swaay
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Catalonia BMS</b>, Catalonia BMS, Constanti Stefanescu
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Finnish Environment Institute</b>, SYKE, Mikko Kuussaari
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Butterfly Conservation Europe</b>, BCE, Chris van Swaay
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Flanders Butterfly Monitoring Scheme</b>, Flanders BMS, Dirk Maes
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Centre des Sciences de la Conservation</b>, French BMS, Benoît
            Fontaine
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>National Biodiversity Data Centre</b>, Ireland BMS, Tomás Murray
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Swedish Butterfly Monitoring Scheme</b>, SEBMS, Lars Pettersson
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Luxembourg Institute of Science and Technology</b>, Luxembourg
            BMS, Xavier Mestdagh
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>ZERYNTHIA Association</b>, ZERYNTHIA-Spain BMS, Yeray León
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Butterfly Monitoring Scheme</b>, Spain BMS, España Miguel
            Munguira
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>Društvo za Proučevanje in Ohranjanje Metuljev Slovenije</b>,
            Slovenia BMS, Rudi Verovnik
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>
              Hungarian Lepidoptera Monitoring Network as part of the Jozsef
              Szalkay Hungarian Lepidopterists&apos; Society
            </b>
            , Hungary BMS, András Szabadfalvi
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>
              Zoolab Department of Life Sciences and Systems Biology University
              of Turin
            </b>
            , Italy BMS, Simona Bonelli
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <b>TAGIS - Centro de Conservacao des Borboletas de Portugal</b>,
            Portugal BMS, Eva Monteiro
          </IonLabel>
        </IonItem>
      </IonList>

      <IonList>
        <IonItem>
          <IonLabel>
            <b>{t('Species descriptions')}:</b>
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>
            {t(
              'Species descriptions included as part of the guide are based on those produced for the Climatic Risk Atlas of European Butterflies. We thank Josef Settele for making these available.'
            )}
          </IonLabel>
        </IonItem>
      </IonList>

      <IonList>
        <IonItem>
          <IonLabel>
            <b>{t('Photo credits')}:</b>
          </IonLabel>
        </IonItem>
        {species
          .filter(s => s.image_copyright)
          .map(s => (
            <IonItem key={s.id} lines="none">
              <IonLabel>
                <i>{`${s.taxon}: `}</i>
                <span dangerouslySetInnerHTML={{ __html: s.image_copyright }} />
              </IonLabel>
            </IonItem>
          ))}
      </IonList>
    </Main>
  </Page>
);
