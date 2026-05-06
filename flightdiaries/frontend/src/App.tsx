import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { type NonSensitiveDiaryEntry } from './types';
function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>("http://localhost:4000/api/diaries")
      .then(response => setDiaries(response.data));
  }, []);

  return (
    <>
      {diaries.map(diary => (
        <ul key={diary.id}>
          <li>{diary.weather}</li>
          <li>{diary.date}</li>
          <li>{diary.visibility}</li>
        </ul>
      ))}
    </>
  );
}
export default App;
