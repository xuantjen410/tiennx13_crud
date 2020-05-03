import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './manager/users-list/users-list.component';
import { UserDetailComponent } from './manager/user-detail/user-detail.component';


const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'user-list'
  },
  {
    path:'user-list',
    component: UsersListComponent
  },
  {
    path:'user-detail',
    component: UserDetailComponent
  },
  {
    path: 'create',
    component: UserDetailComponent
  },
  {
    path: ':userId',
    component: UserDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
