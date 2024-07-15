import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserData } from '../user-data.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.css',
})
export class UserAddEditComponent {
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga']; //Select component
  userData: FormGroup; // user data loaded here

  userArray: UserData[] = [
    {
      name: 'John Doe',
      workouts: [
        { workoutName: 'Running', duration: 30 },
        { workoutName: 'Cycling', duration: 45 }
      ]
    },
    {
  
      name: 'Jane Smith',
      workouts: [
        { workoutName: 'Swimming', duration: 60 },
        { workoutName: 'Running', duration: 20 }
      ]
    },
    {
      
      name: 'Mike Johnson',
      workouts: [
        { workoutName: 'Yoga', duration: 50 },
        { workoutName: 'Cycling', duration: 40 }
      ]
    },
  ]; //Array of user data loaded here

  ngOnInit(): void {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserData[];
      this.userArray = parsedData;
    }
  }

  constructor(private fb: FormBuilder) {
    this.userData = this.fb.group({
      name: ['', Validators.required],
      workouts: this.fb.array([]),
    });
  }

  get workouts(): FormArray {
    return this.userData.get('workouts') as FormArray;
  }

  addWorkout() {
    const workoutForm = this.fb.group({
      workoutName: ['', Validators.required],
      duration: ['', Validators.required],
    });
    this.workouts.push(workoutForm);
  }

  removeWorkout(index: number) {
    this.workouts.removeAt(index);
  }

  onSubmit() {
    // localStorage.setItem('userData', JSON.stringify([]));
    if (this.userData.valid) {
      const formData = this.userArray;
      const userNameArray = formData.map((value) => value.name);
      const newUserName = this.userData.value.name;
      if (userNameArray.includes(newUserName)) {
        formData.forEach((user) => {
          if (user.name === newUserName) {
            user.workouts.push(...this.userData.value.workouts);
          }
        });
        localStorage.setItem('userData', JSON.stringify(formData));
      } else {
        this.userArray.push(this.userData.value);
        localStorage.setItem('userData', JSON.stringify(formData));
      }
    }
    this.userData.reset(); // Assuming userData is your Angular form group or form control
  }
}

