import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProcessedUserData } from '../user-data.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterOutlet,
    RouterLink
  ],  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  displayedColumns: string[] = [
    'position',
    'name',
    'workouts',
    'NoWorkouts',
    'duration',
  ];
  dataSource = new MatTableDataSource<ProcessedUserData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga']; //Select component
  selectedWorkoutType: string | undefined; // Property to store selected workout type

  constructor(public _dialog: MatDialog, private dataService: DataService) {
    this.dataService.userData$.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase(); // Ensure input value is lowercased
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.name.toLowerCase().startsWith(filter); // Check if data.name starts with filter
    };
    this.dataSource.filter = inputValue;
    console.log(this.dataSource.filter);
  }

  applyFilterByWorkoutType(): void {
    console.log(this.dataSource.filter);
    if (this.selectedWorkoutType) {
      this.dataSource.filter = this.selectedWorkoutType.trim().toLowerCase();
    }
    console.log(this.dataSource.filter);
  }
}
