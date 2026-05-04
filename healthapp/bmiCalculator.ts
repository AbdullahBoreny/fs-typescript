import { parseMultiplyArguments } from "./utils.ts";

function calculateBmi(height: number, weight: number): void {

    const bmi = weight / (height * height) * 10000;
    console.log(bmi);
    let message: string = "";
    switch (true) {
        case (bmi < 16.0):
            message = 'Underweight (Severe thinness)';
            break;
        case (bmi > 40.0):
            message = 'Obese (Class III)';
            break;
        case (bmi > 16.0 && bmi < 17.0):
            message = 'Underweight (Moderate thinness)';
            break;
        case (bmi > 17.0 && bmi < 18.5):
            message = 'Underweight (Mild thinness)';
            break;
        case (bmi > 18.5 && bmi < 25.0):
            message = 'Normal Range';
            break;
        case (bmi > 25.0 && bmi < 30.0):
            message = 'Overweight (Pre-obese)';
            break;
        case (bmi > 30.0 && bmi < 35.0):
            message = 'Obese (Class I)';
            break;
        case (bmi > 35.0 && bmi < 40.0):
            message = 'Obese (Class II)';
            break;

    }
    console.log(message);
}

try {
    const { value1, value2 } = parseMultiplyArguments(process.argv);
    calculateBmi(value1, value2);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

