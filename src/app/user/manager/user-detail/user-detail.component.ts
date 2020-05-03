import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import {Observable, Subject} from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {select, Store} from '@ngrx/store';
import {createUser, loadUser, selectUser, updateUser, UserState} from '../../store';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'fis-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  private unsubcribe$ = new Subject<void>();
  checkExist: boolean;
  title = 'Chi tiet nguoi dung';
  titles:any;
  user$: Observable<User>;

  userForm = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * (100 - 1 + 1)) + 100),
    name: new FormControl(''),
    email: new FormControl(''),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userStore: Store<UserState>
  ) { }

  ngOnInit(): void {
    const id: any = this.route.snapshot.paramMap.get('userId');
    if(id) {
      this.checkExist = true;
      this.titles= 'Update nguoi dung';
      this.userStore.dispatch(loadUser({id: id}));
      this.user$ = this.userStore.pipe(select(selectUser));
      this.user$.pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
        if(res) {
          this.userForm.patchValue(res);
        }
      });

      // const id = this.route.snapshot.paramMap.get('userId');
    // if (id) {
    //   this.checkExist = true;
    //   this.userService.getUserById(Number(id)).subscribe(res => {
    //     if (res) {
    //       this.userForm.patchValue(res);
    //     }
    //   });
    } else {
      this.checkExist = false;
      this.titles= 'Them moi nguoi dung';
    }
  }
  onSave(form: FormGroup) {
    if (this.checkExist) {
      this.onUpdate(form);
    } else {
      this.onCreate(form);
    }
  }

  onCreate(form: FormGroup) {
    const { value } = form;
    this.userStore.dispatch(createUser({user: value}));
    // const { value } = form;
    // const result = this.userService.addNewUser(value);
    // if (result) {
    //   console.log('them moi thanh cong');
    //   this.router.navigateByUrl('/users');
    // } else {
    //   console.log('That bai');
    // }
  }

  onUpdate(form: FormGroup) {
    const { value } = form;
    this.userStore.dispatch(updateUser({user: value}));
    // const { value } = form;
    // const result = this.userService.updateUser(value);
    // if (result) {
    //   console.log('update thanh cong');
    //   this.router.navigateByUrl('/users');
    // } else {
    //   console.log('That bai');
    // }
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }
}
