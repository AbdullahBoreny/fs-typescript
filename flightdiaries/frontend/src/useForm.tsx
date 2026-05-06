import { useState } from "react";
import service from "./service";
import axios from "axios";
import type { DiaryProps } from "./types";
export default function useForm(props: DiaryProps) {

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
    return { diaryCreation, setComment, setDate, setVisibility, setWeather, weather, comment, date, visibility };
}