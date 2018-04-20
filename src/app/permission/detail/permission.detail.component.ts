import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ToastrService } from 'ngx-toastr';

import { Permission } from '../permission';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.detail.component.html',
  styleUrls: ['../permission.component.css']
})
export class PermissionDetailComponent implements OnInit {

  public permission: Permission;

  constructor(private route: ActivatedRoute, private permissionService: PermissionService, private toastr: ToastrService, private router: Router) { 
    this.permission = new Permission();
  }

  async ngOnInit() {
    this.route.params.subscribe(params => this.getPermission(params['id']));
  }

  async getPermission(id) {
    if(id && id === 'edit') {
      return;
    }
    this.permission = await this.permissionService.getPermission(id);
  }

  async save(permission) {
    if(this.permission._id) {
      this.permissionService.edit(this.permission).then(() => {
        this.router.navigate(['permission'])
        this.toastr.success('Permission', 'Permission Saved!');
      }).catch(() => {
        this.toastr.error('Permission', 'An error occurred, try again.');
      });
    } else {
      this.permissionService.save(this.permission).then(() => {
        this.router.navigate(['permission'])
        this.toastr.success('Permission', 'Permission Saved!');
      }).catch(() => {
        this.toastr.error('Permission', 'An error occurred, try again.');
      });
    }
    
  }

}
