import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Service } from './service';
import { ServiceService } from './service.service';
import { DialogComponent } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [ServiceService]
})
export class ServiceComponent implements OnInit {

  public services: Service[];
  public displayedColumns = ['method', 'api', 'edit', 'delete'];
  public dataSource = this.services;
  public paginator = {};

  constructor(private serviceService: ServiceService, private toastr: ToastrService, public dialog: MatDialog) {
    this.getAll(null);
  }

  openDialog(service): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { model: service, field: 'api' }
    });

    dialogRef.afterClosed().subscribe(service => {
      if(service) {
        this.serviceService.delete(service).subscribe(() => {
          this.getAll(null);
          this.toastr.success('Service', 'Service Deleted!');
        }, () => {
          this.toastr.error('Service', 'An error occurred, try again.');
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
    this.serviceService.getAll(paginator).subscribe(
      (response) => {
        this.services = response.docs;
        this.paginator = {
          length: response.total,
          pageIndex: response.page -1
        };
      }
    )
  }
}
