/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 **************************************************************************** */
import Analytics from 'helpers/analytics';
import Log from 'helpers/log';
import { observable, set as setMobXAttrs } from 'mobx';
import { getStore } from 'common/store';

const getDefaultAttrs = () => ({
  isLoggedIn: false,
  drupalID: null,
  name: null,
  firstname: null,
  secondname: null,
  email: null,
  password: null,
});

class UserModel {
  @observable attrs = getDefaultAttrs();

  constructor() {
    Log('UserModel: initializing');

    this._init = getStore()
      .then(store => store.getItem('user'))
      .then(userStr => {
        const user = JSON.parse(userStr);
        if (!user) {
          Log('UserModel: persisting for the first time');
          this._initDone = true;
          this.save();
          return;
        }

        setMobXAttrs(this.attrs, user.attrs);
        this._initDone = true;
      });
  }

  get(name) {
    return this.attrs[name];
  }

  set(name, value) {
    this.attrs[name] = value;
    return this;
  }

  save() {
    if (!this._initDone) {
      throw new Error(`User Model can't be saved before initialisation`);
    }
    const userStr = JSON.stringify({
      attrs: this.attrs,
    });
    return getStore().then(store => store.setItem('user', userStr));
  }

  /**
   * Resets the user login information.
   */
  logOut() {
    setMobXAttrs(this.attrs, getDefaultAttrs());
    return this.save();
  }

  /**
   * Sets the app login state of the user account.
   * Saves the user account details into storage for permanent availability.
   *
   * @param user User object or empty object
   */
  logIn(user) {
    Log('UserModel: logging in.');

    this.set('drupalID', user.id || '');
    this.set('password', user.password || '');
    this.set('email', user.email || '');
    this.set('name', user.name || '');
    this.set('firstname', user.firstname || '');
    this.set('secondname', user.secondname || '');
    this.set('isLoggedIn', true);

    Analytics.trackEvent('User', 'login');

    return this.save();
  }

  /**
   * Returns user contact information.
   */
  hasLogIn() {
    return this.attrs.isLoggedIn;
  }

  getUser() {
    return this.get('email');
  }

  getPassword() {
    return this.get('password');
  }

  resetDefaults() {
    return this.logOut();
  }
}

const userModel = new UserModel();
export { userModel as default, UserModel };
