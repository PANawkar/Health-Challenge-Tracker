import { Routes } from '@angular/router';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
  { path: 'graph', component: UserGraphComponent },
  { path: 'add', component: UserAddEditComponent },
  { path: '', component: UserDashboardComponent },
  { path: 'dashboard', redirectTo: '' },
];
