import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from './user.action';
import * as _ from 'lodash';
import {User} from '../model/user.model';

export interface UserState {
  users: User[];
  user: User;
  errors: any;
}

export const initialState: UserState = {
  users: [],
  user: null,
  errors: null
};

const userReducer = createReducer(
  initialState,

  /***************** Load products ****************/
  on(userActions.loadUsersList, state => ({
    ...state,
    users: [],
    errors: null
  })),

  on(userActions.loadUsersListSuccess, (state, { users}) => ({
    ...state,
    users: users,
    errors: null
  })),

  on(userActions.loadUsersListFailed, (state, { errors}) => ({
    ...state,
    errors: errors
  })),
  /***************** End: Load products ****************/

  /***************** Load product ****************/
  on(userActions.loadUser, state => ({
    ...state,
    user: null,
    errors: null
  })),

  on(userActions.loadUserSuccess, (state, { user}) => ({
    ...state,
    user: user,
    errors: null
  })),

  on(userActions.loadUserFailed, (state, { errors}) => ({
    ...state,
    errors: errors
  })),
  /***************** End: Load product ****************/

  /***************** Create product ****************/
  on(userActions.createUser, state => ({
    ...state,
    errors: null
  })),

  on(userActions.createUserSuccess, (state, { user}) => ({
    ...state,
    users: [...state.users, user],
    errors: null
  })),

  on(userActions.createUserFailed, (state, { errors}) => ({
    ...state,
    errors: errors
  })),
  /***************** End: Create product ****************/

  /***************** Update product ****************/
  on(userActions.updateUser, state => ({
    ...state,
    errors: null
  })),

  on(userActions.updateUserSuccess, (state, { user}) => ({
    ...state,
    // products: Object.assign(
    //   [],
    //   state.products.splice(_.findIndex(state.products, {id: product.id}), 1, product)),
    errors: null
  })),

  on(userActions.updateUserFailed, (state, { errors}) => ({
    ...state,
    errors: errors
  })),
  /***************** End: Update product ****************/

);

export function usersReducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
