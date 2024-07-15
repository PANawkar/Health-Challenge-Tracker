import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGraphComponent } from './user-graph.component';
import { DataService } from '../data.service';
import { ProcessedUserData } from '../user-data.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserGraphComponent', () => {
  let component: UserGraphComponent;
  let fixture: ComponentFixture<UserGraphComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;

  const mockProcessedData: ProcessedUserData[] = [
    {
      position: 1,
      name: 'John Doe',
      workouts: 'Running',
      NoWorkouts: 1,
      duration: 10
    },
    {
      position: 2,
      name: 'Jane Doe',
      workouts: 'Cycling, Swimming',
      NoWorkouts: 2,
      duration: 50
    }
  ];

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['userData$']);
    mockDataService.userData$ = of(mockProcessedData);

    await TestBed.configureTestingModule({
      declarations: [UserGraphComponent],
      providers: [
        { provide: DataService, useValue: mockDataService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chart with user data', () => {
    expect(component.chart).toBeTruthy();
    expect(component.chart.data.labels).toEqual(['John Doe', 'Jane Doe']);
    expect(component.chart.data.datasets[0].data).toEqual([10, 50]);
  });

  it('should have a chart element in the template', () => {
    const chartElement = fixture.debugElement.query(By.css('#myChart'));
    expect(chartElement).toBeTruthy();
  });

  it('should set chart options correctly', () => {
    expect(component.chart.options.aspectRatio).toBe(1);
  });


  it('should set chart dataset background color correctly', () => {
    expect(component.chart.data.datasets[0].backgroundColor).toBe('blue');
  });
});