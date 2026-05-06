import type { ErrorMessage } from "../types";

export default function Notify({ error }: { error: ErrorMessage | null; }) {
    if (!error) {
        return null;
    }
    console.log(error);
    return (
        <>
            <div>{error.error.map(err => (
                <li style={{ color: 'red' }}>{err.message}</li>
            ))}</div>
        </>
    );
}