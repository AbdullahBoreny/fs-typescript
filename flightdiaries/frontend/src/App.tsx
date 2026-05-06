import { useEffect, useState } from "react";
import NewDiary from "./components/NewDiary";
import service from "./service";
import type { ErrorMessage, NewDiaryEntry, } from "./types";
import Notify from "./components/Notify";

import Diary from "./components/Diary";
function App() {
  const [diaries, setDiaries] = useState<NewDiaryEntry[]>([]);
  const [error, setError] = useState<ErrorMessage | null>(null);
  useEffect(() => {
    service.getAll().then(data => setDiaries(data));
  }, []);
  function notify(errorMessage: ErrorMessage) {
    setError(errorMessage);

    setTimeout(() => {
      setError(null);
    }, 10000);
  }
  return (
    <>
      <Notify error={error} />
      <NewDiary setError={notify} diaries={diaries} setDiaries={setDiaries} />
      <Diary diaries={diaries} />

    </>
  );
}
export default App;
