import {Component} from '@angular/core';

import {SettingsServices} from '../../services/settings.services';
import {PageInfo} from '../../models/page-info.model';
import {emailRegExp, nameRegExp} from '../../shared/vars';


@Component({
  selector: 'settings-component',
  templateUrl: './template.html',
  styleUrls: ['./local.sass']
})

export class SettingsComponent {
  pageInfo: PageInfo = {
    title: 'Settings',
    description:
      `The entire Cardano team is made up of experts around the world, and the core technology team
      consist of Wall Typed, Serokell, Runtime Verification, Predictable Network Solutions and ATIX`
  };
  editStatus = {
    firstname: false,
    lastname: false,
    email: false,
    language: false,
    status: false,
    comments: false
  };  // enable/disable edit fields
  loadersIcons = {
    firstname: false,
    lastname: false,
    email: false,
    status: false,
    comments: false
  };  // enable/disable loaders icons
  validState = {
    firstname: true,
    lastname: true,
    email: true
  };
  account: AccoutModel = {  // account data from backend
    account: {
      hash: '',
      email: '',
      profile: {
        firstname: '',
        language_id: 0,
        lastname: '',
        new_comments: 0,
        status_updates: 0
      }
    }
  };
  languages: LanguagesModel[] = []; // array of available languages from back

  constructor(private _service: SettingsServices) {
    this.getAccount();  // get date about account
    this.getLanguages();  // get all languages
  }

  // controller 'status' checkbox
  setStatusUpdates(): void {
    this.account.account.profile.status_updates = this.account.account.profile.status_updates === 1 ? 0 : 1;
    this.save('status');
  }

  // controller 'comments' checkbox
  setNewComments(): void {
    this.account.account.profile.new_comments = this.account.account.profile.new_comments === 1 ? 0 : 1;
    this.save('comments');
  }

  // // controller 'language' checkbox
  setLanguage(language: LanguagesModel): void {
    this.account.account.profile.language_id = language.id;
    this.save('language');
    this.editStatus.language = false;
  }

  validation(event): void {
    const value = event.target.value;
    const id = event.target.id;
    if (id === 'firstname' || id === 'lastname') {
      this.validState[id] = nameRegExp.test(value);
    } else if (id === 'email') {
      this.validState.email = emailRegExp.test(value);
    }
  }

  // activate edit status of field
  edit(type: string, field: HTMLInputElement): void {
    this.editStatus[type] = true;
    field.disabled = false;
    field.focus();
  }

  // validation
  saveValidation(value: string): boolean {
    if (value === 'firstname' || value === 'lastname') {
      return nameRegExp.test(this.account.account.profile[value]);
    } else if (value === 'email') {
      return emailRegExp.test(this.account.account.profile[value]);
    }
    return true;
  }

  // save data
  save(loader: string): void {
    if (this.account.account.email.length < 255 && this.account.account.profile.firstname.length < 255 && this.account.account.profile.lastname.length < 255) {
      if (this.saveValidation(loader)) {
        this.loadersIcons[loader] = true;
        const data = {};
        if (loader !== 'language_id') {
          data[loader] = this.account.account.profile[loader];
        } else {
          data['language_id'] = this.account.account.profile.language_id;
        }
        this._service.save(data).then(() => {
          this.loadersIcons[loader] = false;
          this.resetStatuses(loader);
        }).catch(err => {
          console.error(err);
        });
      }
    }
  }

  // reset all statuses of edit
  resetStatuses(type: string): void {
    this.editStatus[type] = false;
  }

  // controller of select
  showLanguages(): void {
    this.editStatus.language = !this.editStatus.language;
  }

  // global controller of lang select
  hideLanguages(event) {
    event.target.classList.contains('select_current') || (event.target.id === 'langEdit') || (event.target.id === 'arrow') ? this.editStatus.language = true : this.editStatus.language = false;
  }

  //  find current lang from array lang
  currentLanguage(): string {
    const language = this.languages.find(el => {
      if (el.id === this.account.account.profile.language_id) {
        return true;
      }
    });
    if (language && language.hasOwnProperty('name')) {
      return language.name;
    }
  }

  // get account data from back
  private getAccount(): void {
    this._service.getAccount().then((res: AccoutModel) => {
      this.account = res;
    }).catch(err => {
      console.error(err);
    })
  }

  // get languages from back
  private getLanguages(): void {
    this._service.getLanguages().then((res: LanguagesModel[]) => {
      this.languages = res;
    }).catch(err => {
      console.error(err);
    })
  }
}
