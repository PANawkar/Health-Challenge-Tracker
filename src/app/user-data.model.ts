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

export const defaultUserData : UserData[]= [ {

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
},]