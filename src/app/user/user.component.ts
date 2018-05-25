import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from './user';
import { UserService } from './user.service';
import { Paginator } from '../components/paginator/paginator.component';
import { DialogComponent } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  public users: User[];
  public displayedColumns = ['name', 'email', 'admin', 'edit', 'delete'];
  public dataSource = this.users;
  public paginator = {};

  constructor(private userService: UserService, private toastr: ToastrService, public dialog: MatDialog) {
    this.getAll(null);
  }

  openDialog(user): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { model: user, field: 'name' }
    });

    dialogRef.afterClosed().subscribe(user => {
      if(user) {
        this.userService.delete(user).subscribe(
          () => {
            this.getAll(null);
            this.toastr.success('User', 'User Deleted!');
          }, 
          () => {
          this.toastr.error('User', 'An error occurred, try again.');
        });
      }
    });
  }

  ngOnInit() {
  }

  getAll(event) {
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
    this.userService.getAll(paginator).subscribe(
      (response) => {
        this.users = response.docs;
        this.paginator = {
          length: response.total,
          pageIndex: response.page -1
        };
      }
    );
  }
}
