﻿import { Component, OnInit } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users = [];
  isLoading = true;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
      if (this.auth.isAdmin) {
          this.userService.getUsers().subscribe(
              data => this.users = data,
              error => console.log(error),
              () => this.isLoading = false
          );
      }
      else {
          this.userService.getUsersOnly().subscribe(
              data => this.users = data,
              error => console.log(error),
              () => this.isLoading = false
          );
      }
  }

  deleteUser(user) {
      if (window.confirm('Are you sure you want to permanently delete this user?')) {
          this.userService.deleteUser(user).subscribe(
              data => this.toast.setMessage('user deleted successfully.', 'success'),
              error => console.log(error),
              () => this.getUsers()
          );
      }
  }

}
