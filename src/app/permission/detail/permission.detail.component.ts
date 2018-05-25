import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Permission } from '../permission';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.detail.component.html',
  styleUrls: ['../permission.component.css'],
  providers: [PermissionService]
})
export class PermissionDetailComponent implements OnInit {

  public permission: Permission;

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private toastr: ToastrService, private router: Router) { 
    this.permission = new Permission();
    this.route.params.subscribe(params => this.getPermission(params['id']));
  }

  ngOnInit() {
  }

  getPermission(id) {
    if(id && id === 'edit') {
      return;
    }
    this.permissionService.getPermission(id).subscribe(
      (response) => {
        this.permission = response;
      }
    );
  }

  save(permission) {
    if(this.permission._id) {
      this.permissionService.edit(this.permission).subscribe(() => {
        this.router.navigate(['permission'])
        this.toastr.success('Permission', 'Permission Saved!');
      }, () => {
        this.toastr.error('Permission', 'An error occurred, try again.');
      });
    } else {
      this.permissionService.save(this.permission).subscribe(() => {
        this.router.navigate(['permission'])
        this.toastr.success('Permission', 'Permission Saved!');
      }, () => {
        this.toastr.error('Permission', 'An error occurred, try again.');
      });
    }
  }
}
