import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  selectedUser: User;
  users: User[];

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().then(users =>
      this.users = users);
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.create(name)
      .then(user => {
        this.users.push(user);
        this.selectedUser = null;
      });
  }

  delete(user: User): void {
    this.userService
      .delete(user.id)
      .then(() => {
        this.users = this.users.filter(h => h !== user);
        if (this.selectedUser === user) {
          this.selectedUser = null;
        }
      });
  }

  gotoDetail(): void {
    this.router.navigate(['/user', this.selectedUser.id]);
  }

}
