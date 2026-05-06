


export interface ValidationError {
    message: string;
    errors: Record<string, string[]>;
}
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export interface DiaryEntry extends NewDiaryEntry {
    id: number;
}
export interface NewDiaryEntry {
    id?: number;
    weather?: string,
    visibility?: string;
    date?: string,
    comment?: string;
};
export interface ErrorMessage {
    error: error[];
}
export interface error {
    code: string,
    message: string;

}
export type DiaryProps = {
    setDiaries: React.Dispatch<React.SetStateAction<NewDiaryEntry[]>>;
    diaries: NewDiaryEntry[];
    setError: (errorMessage: ErrorMessage) => void;
};