
import type { NewDiaryEntry, } from "../types";

export default function Diary({ diaries }: { diaries: NewDiaryEntry[]; }) {

    return (
        <>
            <h2>Diary Entries</h2>
            {diaries.map(diary => (

                <ul key={diary.id}>
                    <h3>{diary.date}</h3>
                    <li>visibility: {diary.visibility}</li>
                    <li>weather: {diary.weather}</li>


                </ul>
            ))}
        </>
    );
}