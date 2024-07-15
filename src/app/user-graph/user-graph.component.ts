// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Chart, registerables } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';
// import { Observable, Subscription } from 'rxjs';
// import { ProcessedUserData } from '../user-data.model';
// import { DataService } from '../data.service';

// Chart.register(...registerables);

// @Component({
//   selector: 'app-user-graph',
//   standalone: true,
//   imports: [BaseChartDirective],
//   templateUrl: './user-graph.component.html',
//   styleUrl: './user-graph.component.css',
// })
// export class UserGraphComponent implements OnInit {
//   userData: ProcessedUserData[] = [];
//   userNameArray: string[] = [];
//   workoutsArray: string[] = [];
//   durationArray: number[] = [];
//   constructor(private dataService: DataService) {}

//   ngOnInit(): void {
//     this.dataService.userData$.subscribe((data: ProcessedUserData[]) => {
//       this.userData = data;
//     });
//     this.chart = new Chart('myChart', this.config);
//     this.userNameArray = this.userData.map((user) => user.name);
//     this.workoutsArray = this.userData.map((user) => user.workouts);
//     this.durationArray = this.userData.map((user) => user.duration);

//     this.chart.data.labels = this.userNameArray;
//     this.chart.data.datasets.data = this.durationArray;

//     console.log(this.durationArray);
//     console.log(this.chart.data.datasets.data);
//     this.chart.update();
//   }

//   public config: any = {
//     type: 'bar',
//     data: {
//       labels: [],
//       datasets: [
//         {
//           label: 'Total Workouts Duration',
//           data: this.durationArray,
//           backgroundColor: 'blue',
//         },
//       ],
//     },
//     options: {
//       aspectRatio: 1,
//     },
//   };
//   chart: any;
// }

import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataService } from '../data.service';
import { ProcessedUserData } from '../user-data.model';

Chart.register(...registerables);

@Component({
  selector: 'app-user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css'],
})
export class UserGraphComponent implements OnInit {
  userData: ProcessedUserData[] = [];
  userNameArray: string[] = [];
  durationArray: number[] = [];

  chart: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.userData$.subscribe((data: ProcessedUserData[]) => {
      this.userData = data;
      this.updateChartData();
    });
  }

  private updateChartData(): void {
    this.userNameArray = this.userData.map((user) => user.name);
    this.durationArray = this.userData.map((user) => user.duration);

    if (this.chart) {
      this.chart.data.labels = this.userNameArray;
      this.chart.data.datasets[0].data = this.durationArray;
      this.chart.update();
    } else {
      this.initializeChart();
    }
  }

  private initializeChart(): void {
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.userNameArray,
        datasets: [
          {
            label: 'Total Workouts Duration',
            data: this.durationArray,
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 1,
      },
    });
  }
}
