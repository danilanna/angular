import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

import { Permission } from './permission';
import { PermissionService } from './permission.service';

import { Dialog } from '../components/dialog/dialog.component';
import { Paginator } from '../components/paginator/paginator.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  public permissions: Permission[];
  public displayedColumns = ['name', 'description', 'edit', 'delete'];
  public dataSource = this.permissions;
  public paginator = {};

  constructor(private permissionService: PermissionService, private toastr: ToastrService, public dialog: MatDialog) { 
  }

  openDialog(permission): void {
    let dialogRef = this.dialog.open(Dialog, {
      data: { model: permission, field: 'name' }
    });

    dialogRef.afterClosed().subscribe(permission => {
      if(permission) {
        this.permissionService.delete(permission).then(() => {
          this.getAll(null);
          this.toastr.success('Permission', 'Permission Deleted!');
        }).catch(() => {
          this.toastr.error('Permission', 'An error occurred, try again.');
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
    const response = await this.permissionService.getAll(paginator)
    this.permissions = response.docs;
    this.paginator = {
      length: response.total,
      pageIndex: response.page -1
    };
  }

  async getAllNoPagination() {
    return await this.permissionService.getAllNoPagination()
  }

}
