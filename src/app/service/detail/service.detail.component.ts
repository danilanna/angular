import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ToastrService } from 'ngx-toastr';

import { Service } from '../service';
import { ServiceService } from '../service.service';

import { PermissionService } from '../../permission/permission.service';
import { Permission } from '../../permission/permission';

@Component({
  selector: 'app-service',
  templateUrl: './service.detail.component.html',
  styleUrls: ['../service.component.css']
})
export class ServiceDetailComponent implements OnInit {

  public service: Service;
  public permissions: Permission[];

  constructor(private route: ActivatedRoute, private serviceService: ServiceService, private permissionService: PermissionService, private toastr: ToastrService, private router: Router) { 
    this.service = new Service();
  }

  async ngOnInit() {
    this.route.params.subscribe(params => this.getService(params['id']));
    this.permissions = await this.permissionService.getAllNoPagination();
  }

  async getService(id) {
    if(id && id === 'edit') {
      return;
    }
    this.service = await this.serviceService.getService(id);
    this.permissions.forEach((permission) => {
      this.service.permissions.forEach((servicePermission) => {
        if(permission._id === servicePermission._id) {
          permission.selected = true 
        }
      }
    )});
  }

  clickedOnRow(permission:Permission){
    this.permissions.forEach(servicePermission => { if(servicePermission._id === permission._id) permission.selected = !permission.selected });
  }

  async save(service) {
    this.service.permissions = [];
    this.permissions.forEach((permission) => {
      if(permission.selected) {
        this.service.permissions.push(permission);
      }
    });
    if(this.service._id) {
      this.serviceService.edit(this.service).then(() => {
        this.router.navigate(['service'])
        this.toastr.success('Service', 'Service Saved!');
      }).catch(() => {
        this.toastr.error('Service', 'An error occurred, try again.');
      });
    } else {
      this.serviceService.save(this.service).then(() => {
        this.router.navigate(['service'])
        this.toastr.success('Service', 'Service Saved!');
      }).catch(() => {
        this.toastr.error('Service', 'An error occurred, try again.');
      });
    }
    
  }

}
