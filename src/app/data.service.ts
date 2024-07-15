import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData, ProcessedUserData } from './user-data.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private userDataSubject = new BehaviorSubject<ProcessedUserData[]>([]);
  userData$: Observable<ProcessedUserData[]> = this.userDataSubject.asObservable();

  constructor() {
    this.loadUserData();
  }

private loadUserData(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const parsedData = JSON.parse(storedData) as UserData[];
        const processedData = this.processUserData(parsedData);
        this.userDataSubject.next(processedData);
      }
    }
  }
  

  private processUserData(userData: UserData[]): ProcessedUserData[] {
    return userData.map((user, index) => {
      const totalDurationInSeconds = user.workouts.reduce(
        (total, workout) => total + workout.duration,
        0
      );

      return {
        position: index + 1,
        name: user.name.charAt(0).toUpperCase() + user.name.slice(1),
        workouts: user.workouts.map((w) => w.workoutName).join(', '),
        NoWorkouts: user.workouts.length,
        duration: totalDurationInSeconds,
      };
    });
  }
}
