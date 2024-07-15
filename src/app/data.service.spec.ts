// import { TestBed } from '@angular/core/testing';
// import { BehaviorSubject } from 'rxjs';
// import { DataService } from './data.service';
// import { UserData, ProcessedUserData } from './user-data.model'; // Adjust the path as necessary

// describe('DataService', () => {
//   let service: DataService;

//   const mockUserData: UserData[] = [
//     {
//       name: 'john',
//       workouts: [
//         { workoutName: 'Run', duration: 3600 },
//         { workoutName: 'Bike', duration: 1800 }
//       ]
//     },
//     {
//       name: 'jane',
//       workouts: [
//         { workoutName: 'Swim', duration: 1200 }
//       ]
//     }
//   ];

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(DataService);
//     localStorage.setItem('userData', JSON.stringify(mockUserData));
//     service['loadUserData'](); // manually call to load data from localStorage
//   });

//   afterEach(() => {
//     localStorage.removeItem('userData');
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should load and process user data correctly', () => {
//     const expectedProcessedData: ProcessedUserData[] = [
//       {
//         position: 1,
//         name: 'John',
//         workouts: 'Run, Bike',
//         NoWorkouts: 2,
//         duration: 5400
//       },
//       {
//         position: 2,
//         name: 'Jane',
//         workouts: 'Swim',
//         NoWorkouts: 1,
//         duration: 1200
//       }
//     ];

//     service.userData$.subscribe(data => {
//       expect(data).toEqual(expectedProcessedData);
//     });
//   });
// });

import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { UserData, ProcessedUserData } from './user-data.model';
import { take } from 'rxjs/operators';

describe('DataService', () => {
  let service: DataService;

  const mockUserData: UserData[] = [
    {
      name: 'john doe',
      workouts: [{ workoutName: 'Running', duration: 10 }]
    },
    {
      name: 'jane doe',
      workouts: [
        { workoutName: 'Cycling', duration: 20 },
        { workoutName: 'Swimming', duration: 30 }
      ]
    }
  ];

  const expectedProcessedData: ProcessedUserData[] = [
    {
      position: 1,
      name: 'John doe',
      workouts: 'Running',
      NoWorkouts: 1,
      duration: 10
    },
    {
      position: 2,
      name: 'Jane doe',
      workouts: 'Cycling, Swimming',
      NoWorkouts: 2,
      duration: 50
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  afterEach(() => {
    localStorage.removeItem('userData');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load user data from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUserData));
    service = new DataService();
    service.userData$.pipe(take(1)).subscribe((data) => {
      expect(data).toEqual(expectedProcessedData);
    });
  });

  it('should handle empty localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service = new DataService();
    service.userData$.pipe(take(1)).subscribe((data) => {
      expect(data).toEqual([]);
    });
  });

  it('should process user data correctly', () => {
    const processedData = service['processUserData'](mockUserData);
    expect(processedData).toEqual(expectedProcessedData);
  });

  it('should handle no workouts gracefully', () => {
    const userData: UserData[] = [{ name: 'john doe', workouts: [] }];
    const expectedData: ProcessedUserData[] = [
      {
        position: 1,
        name: 'John doe',
        workouts: '',
        NoWorkouts: 0,
        duration: 0
      }
    ];
    const processedData = service['processUserData'](userData);
    expect(processedData).toEqual(expectedData);
  });

  it('should handle multiple users with multiple workouts', () => {
    const userData: UserData[] = [
      { name: 'john doe', workouts: [{ workoutName: 'Running', duration: 10 }] },
      { name: 'jane doe', workouts: [{ workoutName: 'Cycling', duration: 20 }] }
    ];
    const expectedData: ProcessedUserData[] = [
      {
        position: 1,
        name: 'John doe',
        workouts: 'Running',
        NoWorkouts: 1,
        duration: 10
      },
      {
        position: 2,
        name: 'Jane doe',
        workouts: 'Cycling',
        NoWorkouts: 1,
        duration: 20
      }
    ];
    const processedData = service['processUserData'](userData);
    expect(processedData).toEqual(expectedData);
  });

  it('should capitalize the first letter of the user name', () => {
    const userData: UserData[] = [
      { name: 'john doe', workouts: [{ workoutName: 'Running', duration: 10 }] }
    ];
    const expectedData: ProcessedUserData[] = [
      {
        position: 1,
        name: 'John doe',
        workouts: 'Running',
        NoWorkouts: 1,
        duration: 10
      }
    ];
    const processedData = service['processUserData'](userData);
    expect(processedData[0].name).toBe('John doe');
  });

  it('should calculate total duration correctly', () => {
    const userData: UserData[] = [
      { name: 'john doe', workouts: [{ workoutName: 'Running', duration: 10 }] },
      { name: 'jane doe', workouts: [{ workoutName: 'Cycling', duration: 20 }] }
    ];
    const processedData = service['processUserData'](userData);
    expect(processedData[0].duration).toBe(10);
    expect(processedData[1].duration).toBe(20);
  });

  it('should set position correctly for multiple users', () => {
    const userData: UserData[] = [
      { name: 'john doe', workouts: [{ workoutName: 'Running', duration: 10 }] },
      { name: 'jane doe', workouts: [{ workoutName: 'Cycling', duration: 20 }] }
    ];
    const processedData = service['processUserData'](userData);
    expect(processedData[0].position).toBe(1);
    expect(processedData[1].position).toBe(2);
  });

  it('should join workout names correctly', () => {
    const userData: UserData[] = [
      { name: 'jane doe', workouts: [{ workoutName: 'Cycling', duration: 20 }, { workoutName: 'Swimming', duration: 30 }] }
    ];
    const processedData = service['processUserData'](userData);
    expect(processedData[0].workouts).toBe('Cycling, Swimming');
  });
});