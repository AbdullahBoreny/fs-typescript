import { useState } from "react";
import service from "../service";
import axios from "axios";
import type { ErrorMessage, NewDiaryEntry } from "../types";

type DiaryProps = {
    setDiaries: React.Dispatch<React.SetStateAction<NewDiaryEntry[]>>;
    diaries: NewDiaryEntry[];
    setError: (errorMessage: ErrorMessage) => void;
};
export default function NewDiary(props: DiaryProps) {

    const [weather, setWeather] = useState<string>();
    const [visibility, setVisibility] = useState<string>();
    const [date, setDate] = useState<string>();
    const [comment, setComment] = useState<string>();
    function diaryCreation(event: React.SyntheticEvent) {
        event.preventDefault();

        service.create({
            date,
            visibility,
            comment,
            weather
        })
            .then(response => {
                props.setDiaries(prev => prev.concat(response));

                setWeather("");
                setVisibility("");
                setComment("");
                setDate("");
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    console.log(error.response?.data);
                    props.setError(error.response?.data);
                }
            });
    }

    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }} onSubmit={diaryCreation} >
                <label htmlFor="weather">Weather:</label>
                <input
                    onChange={(e) => setWeather(e.target.value)}
                    value={weather} type="text" />
                <label htmlFor="visibility">visibility:</label>
                <input
                    onChange={(e) => setVisibility(e.target.value)}
                    value={visibility} type="text" />
                <label htmlFor="comment">comment:</label>
                <input
                    onChange={(e) => setComment(e.target.value)}
                    value={comment} type="text" />
                <label htmlFor="weather">date:</label>
                <input
                    onChange={(e) => setDate(e.target.value)}
                    value={date} type="text" />
                <input type="submit" value='add' />
            </form>
        </>
    );
}