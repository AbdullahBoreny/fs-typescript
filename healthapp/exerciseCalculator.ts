import { parseExerciseArguments } from './utils.ts';
interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number | undefined,
    ratingDescription: string | undefined,
    target: number,
    average: number;
}
function calculateExercises(hours: number[], target: number): Result {
    const periodLength = hours.length;
    const trainingDays = hours.filter(hour => hour !== 0).length;

    const average = hours.reduce((acc, curr) => acc + curr, 0) / hours.length;
    const success = average >= target;
    let ratingDescription;
    let rating;

    if (average >= target) {
        rating = 3;
        ratingDescription = "greet job";
    }
    else if (average > target - 1) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    else {
        rating = 0;
        ratingDescription = 'you need to work harder';
    }
    const result: Result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,



    };
    console.log(result);
    return result;

}

try {
    const { target, dailyExercises } = parseExerciseArguments(process.argv);
    calculateExercises(dailyExercises, target);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

