export interface UserData {
  name: string;
  workouts: { workoutName: string; duration: number }[];
}

export interface ProcessedUserData {
  position: number;
  name: string;
  workouts: string;
  NoWorkouts: number;
  duration: number;
}
