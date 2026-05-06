
import useForm from "../useForm";
import type { DiaryProps } from "../types";

export default function NewDiary(props: DiaryProps) {
    const {
        setComment,
        setDate,
        setWeather,
        setVisibility,
        diaryCreation,
        weather, comment, visibility, date
    } = useForm(props);
    return (
        <>
            <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '200px' }} onSubmit={diaryCreation} >
            

                <label htmlFor="visibility">visibility:</label>
                <input onChange={(e) => setVisibility(e.target.value)} value={visibility} type="text" />

                <label htmlFor="weather">Weather:</label>
                <input onChange={(e) => setWeather(e.target.value)} value={weather} type="text" />



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