import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, public dialog: MatDialog){}

  openDialog(user): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { title: 'Logout', text: 'Are you sure do you want to logout?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['login']);
      }
    });
  }
}
