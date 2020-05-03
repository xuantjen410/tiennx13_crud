import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './manager/users-list/users-list.component';
import { UserDetailComponent } from './manager/user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import * as fromPages from './manager';

// compoment
import * as fromComponents from './components';
import {StoreModule} from '@ngrx/store';
import {UsersEffects, usersReducer} from '../user/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    ...fromPages.pages,
      ...fromComponents.components
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
      HttpClientModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
