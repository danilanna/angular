import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import { UserService } from '../user.service';
import { PermissionService } from '../../permission/permission.service';
import { Permission } from '../../permission/permission';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-user',
  templateUrl: './user.detail.component.html',
  styleUrls: ['../user.component.css'],
  providers: [UserService, PermissionService]
})
export class UserDetailComponent implements OnInit {

  public user: User;
  public permissions: Permission[];

  constructor(private route: ActivatedRoute, private userService: UserService, private permissionService: PermissionService, private toastr: ToastrService, private router: Router) { 
    this.user = new User();
    combineLatest(this.permissionService.getAllNoPagination(), this.route.params).subscribe(([permissions, params]) => {
      this.permissions = permissions;
      this.getUser(params['id']);
    });
  }

  ngOnInit() {
  }

  getUser(id) {
    if(id && id === 'edit') {
      return;
    }
    this.userService.getUser(id).subscribe(
      (response) => {
        this.user = response;
        this.permissions.forEach((permission) => {
          this.user.permissions.forEach((userPermission) => {
            if(permission._id === userPermission._id) {
              permission.selected = true 
            }
          }
        )});
      }
    );
  }

  clickedOnRow(permission:Permission){
    this.permissions.forEach(userPermission => { if(userPermission._id === permission._id) permission.selected = !permission.selected });
  }

  save(user) {
    this.user.permissions = [];
    this.permissions.forEach((permission) => {
      if(permission.selected) {
        this.user.permissions.push(permission);
      }
    });
    if(this.user._id) {
      this.userService.edit(this.user).subscribe(
        () => {
          this.router.navigate(['user'])
          this.toastr.success('User', 'User Saved!');
      },
        () => {
          this.toastr.error('User', 'An error occurred, try again.')
      });
    } else {
      this.userService.save(this.user).subscribe(
        () => {
          this.router.navigate(['user'])
          this.toastr.success('User', 'User Saved!');
      },
        () => {
          this.toastr.error('User', 'An error occurred, try again.')
      });
    }
  }
}
