import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { User } from './user';
import { UserService } from './user.service';
import { Paginator } from '../components/paginator/paginator.component';

import { Dialog } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: User[];
  public displayedColumns = ['name', 'email', 'admin', 'edit', 'delete'];
  public dataSource = this.users;
  public paginator = {};

  constructor(private userService: UserService, private toastr: ToastrService, public dialog: MatDialog) { 
  }

  openDialog(user): void {
    let dialogRef = this.dialog.open(Dialog, {
      data: { model: user, field: 'name' }
    });

    dialogRef.afterClosed().subscribe(user => {
      if(user) {
        this.userService.delete(user).then(() => {
          this.getAll(null);
          this.toastr.success('User', 'User Deleted!');
        }).catch(() => {
          this.toastr.error('User', 'An error occurred, try again.');
        });
      }
    });
  }

  ngOnInit() {
    this.getAll(null);
  }

  async getAll(event) {
    let paginator;
    if(event) {
      paginator = {
        page: event.pageIndex + 1 || 1,
        limit: event.pageSize || 5
      }
    } else {
      paginator = {
        page: 1,
        limit: 5
      }
    }
    const response = await this.userService.getAll(paginator)
    this.users = response.docs;
    this.paginator = {
      length: response.total,
      pageIndex: response.page -1
    };
  }

}
