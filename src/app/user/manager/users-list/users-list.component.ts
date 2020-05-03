import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import {loadUsersList, selectUserErrors, selectUsersList} from '../../../user/store';
import {select, Store} from '@ngrx/store';
import {UserState} from '../../store';

@Component({
  selector: 'fis-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  userList$: Observable<User[]>;
  errors$: Observable<any>;
  constructor( private userStore: Store<UserState>) { }
  title = 'Danh sach nguoi dung';
  ngOnInit() {
    this.onGetUserList();
  }
  onGetUserList(){
    // this.userList$ = this.userService.getUsersList();
    this.userStore.dispatch(loadUsersList());

    // Get users from store
    this.userList$ = this.userStore.pipe(select(selectUsersList));
    this.errors$ = this.userStore.pipe(select(selectUserErrors));
  }
}
