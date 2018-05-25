import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ToastrService } from 'ngx-toastr';
import { Service } from '../service';
import { ServiceService } from '../service.service';
import { PermissionService } from '../../permission/permission.service';
import { Permission } from '../../permission/permission';

@Component({
  selector: 'app-service',
  templateUrl: './service.detail.component.html',
  styleUrls: ['../service.component.css'],
  providers: [ServiceService, PermissionService]
})
export class ServiceDetailComponent implements OnInit {

  public service: Service;
  public permissions: Permission[];

  constructor(private route: ActivatedRoute, private serviceService: ServiceService, private permissionService: PermissionService, private toastr: ToastrService, private router: Router) { 
    this.service = new Service();
    combineLatest(this.permissionService.getAllNoPagination(), this.route.params).subscribe(([permissions, params]) => {
      this.permissions = permissions;
      this.getService(params['id']);
    });
  }

  ngOnInit() {
  }

  getService(id) {
    if(id && id === 'edit') {
      return;
    }
    this.serviceService.getService(id).subscribe(
      (response) => {
        this.service = response;
        this.permissions.forEach((permission) => {
          this.service.permissions.forEach((userPermission) => {
            if(permission._id === userPermission._id) {
              permission.selected = true 
            }
          }
        )});
      }
    );
  }

  clickedOnRow(permission:Permission){
    this.permissions.forEach(servicePermission => { if(servicePermission._id === permission._id) permission.selected = !permission.selected });
  }

  save(service) {
    this.service.permissions = [];
    this.permissions.forEach((permission) => {
      if(permission.selected) {
        this.service.permissions.push(permission);
      }
    });
    if(this.service._id) {
      this.serviceService.edit(this.service).subscribe(() => {
        this.router.navigate(['service'])
        this.toastr.success('Service', 'Service Saved!');
      }, () => {
        this.toastr.error('Service', 'An error occurred, try again.');
      });
    } else {
      this.serviceService.save(this.service).subscribe(() => {
        this.router.navigate(['service'])
        this.toastr.success('Service', 'Service Saved!');
      }, () => {
        this.toastr.error('Service', 'An error occurred, try again.');
      });
    }
  }
}
