interface MultiplyValues {
    value1: number;
    value2: number;
}

interface ExerciseValues {
    target: number;
    dailyExercises: number[];
}

const parseMultiplyArguments = (args: string[]): MultiplyValues => {
    if (args.length !== 4) {
        throw new Error('Multiply requires exactly 2 numbers');
    }

    const value1 = Number(args[2]);
    const value2 = Number(args[3]);

    if (isNaN(value1) || isNaN(value2)) {
        throw new Error('Provided values were not numbers!');
    }

    return {
        value1,
        value2
    };
};

const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }

    const target = Number(args[2]);

    const dailyExercises = args.slice(3).map(value => Number(value));

    if (isNaN(target) || dailyExercises.some(value => isNaN(value))) {
        throw new Error('Provided values were not numbers!');
    }

    return {
        target,
        dailyExercises
    };
};

export {
    parseMultiplyArguments,
    parseExerciseArguments
};