import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardServices} from '../services/auth-guard.services';

import {PageNotFoundComponent} from '../components/errors/page-not-found/page-not-found.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {SwapComponent} from '../components/swap/swap.component';
import {TransactionsComponent} from '../components/transactions/transactions.component';
import {BonusesComponent} from '../components/bonuses/bonuses.component';
import {RoadmapComponent} from '../components/roadmap/roadmap.component';
import {SignInComponent} from '../components/sign-in/sign-in.component';
import {SignUpComponent} from '../components/sign-up/sign-up.component';
import {BugsComponent} from '../components/bugs/bugs.component';
import {BugsCreateComponent} from '../components/bugs/bugs-create/bugs-create.component';
import {BugsListComponent} from '../components/bugs/bugs-list/bugs-list.component';
import {SettingsComponent} from '../components/settings/settings.component';
import {ChangeEmailComponent} from '../components/change-email/change-email/change-email.component';
import {ChangeEmailConfirmComponent} from '../components/change-email/change-email-confirm/change-email-confirm.component';
import {BugComponent} from '../components/bugs/bug/bug.component';
import {FeedbackComponent} from '../components/feedback/feedback.component';
import {PasswordRecoveryComponent} from '../components/password-recovery/password-recovery.component';

const Routes: Routes = [
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardServices]},
  {path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuardServices]},
  {path: 'swap', component: SwapComponent, canActivate: [AuthGuardServices]},
  {path: 'bugs', component: BugsComponent, canActivate: [AuthGuardServices], children: [
      {path: '', component: BugsListComponent, canActivate: [AuthGuardServices]},
      {path: 'filing', component: BugsCreateComponent, pathMatch: 'full', canActivate: [AuthGuardServices]},
      {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuardServices]},
      {path: ':id', component: BugComponent, canActivate: [AuthGuardServices]}
    ]},
  {path: 'bonuses', component: BonusesComponent, canActivate: [AuthGuardServices]},
  {path: 'roadmap', component: RoadmapComponent, canActivate: [AuthGuardServices]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuardServices]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-up/:hash', component: SignUpComponent},
  {path: 'change-email/:token', component: ChangeEmailComponent},
  {path: 'email-confirmation/:token', component: ChangeEmailConfirmComponent},
  {path: 'password-recovery', component: PasswordRecoveryComponent},
  {path: 'password-recovery/:hash', component: PasswordRecoveryComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(Routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardServices
  ]
})
export class MainRouterModule {  }
