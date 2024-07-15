import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { UserAddEditComponent } from './user-add-edit.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserData } from '../user-data.model';

describe('UserAddEditComponent', () => {
  let component: UserAddEditComponent;
  let fixture: ComponentFixture<UserAddEditComponent>;
  let fb: FormBuilder;

  const mockUserData: UserData[] = [
    {
      name: 'john',
      workouts: [
        { workoutName: 'Run', duration: 3600 },
        { workoutName: 'Bike', duration: 1800 },
      ],
    },
    {
      name: 'jane',
      workouts: [{ workoutName: 'Swim', duration: 1200 }],
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserAddEditComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddEditComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with FormGroup and FormArray', () => {
    expect(component.userData).toBeInstanceOf(FormGroup);
    expect(component.userData.get('workouts')).toBeInstanceOf(FormArray);
  });

  it('should add a workout form group to the workouts form array', () => {
    component.addWorkout();
    const workouts = component.userData.get('workouts') as FormArray;
    expect(workouts.length).toBe(1);
    component.addWorkout();
    expect(workouts.length).toBe(2);
  });

  it('should remove a workout form group from the workouts form array', () => {
    component.addWorkout();
    component.addWorkout();
    const workouts = component.userData.get('workouts') as FormArray;
    expect(workouts.length).toBe(2);
    component.removeWorkout(0);
    expect(workouts.length).toBe(1);
  });
});
