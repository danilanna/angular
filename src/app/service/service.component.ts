import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { Service } from './service';
import { ServiceService } from './service.service';
import { Paginator } from '../components/paginator/paginator.component';

import { Dialog } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public services: Service[];
  public displayedColumns = ['method', 'api', 'edit', 'delete'];
  public dataSource = this.services;
  public paginator = {};

  constructor(private serviceService: ServiceService, private toastr: ToastrService, public dialog: MatDialog) { 
  }

  openDialog(service): void {
    let dialogRef = this.dialog.open(Dialog, {
      data: { model: service, field: 'api' }
    });

    dialogRef.afterClosed().subscribe(service => {
      if(service) {
        this.serviceService.delete(service).then(() => {
          this.getAll(null);
          this.toastr.success('Service', 'Service Deleted!');
        }).catch(() => {
          this.toastr.error('Service', 'An error occurred, try again.');
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
    const response = await this.serviceService.getAll(paginator)
    this.services = response.docs;
    this.paginator = {
      length: response.total,
      pageIndex: response.page -1
    };
  }


}
