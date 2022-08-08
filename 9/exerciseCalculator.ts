interface returnObject {
    numberOfDays: number;
    numberOfTrainingDays: number;
    originalTargetValue: number;
    calculatedAverageTime: number;
    targetReachBoolean: boolean;
    ratingNumber: number;
    ratingText: string;
}

interface ValuesExercise {
    hours: Array<number>,
    target: number
}
const parseHours = (args: Array<string>): ValuesExercise => {
    const splicedArgs = args.splice(2);
    splicedArgs.forEach(element => {
        if(isNaN(Number(element))){
            throw new Error('Arguments arent numbers')
        }
    });
    const numberedArgs = splicedArgs.map(element => {
        return Number(element)
    })
    return{
        target: numberedArgs[0],
        hours: numberedArgs.splice(1)
    }
}

const calculateAverage = (hours: Array<number>)=> {
    let totalHours: number = 0;
    hours.forEach(element => {
        totalHours += element;
    });
    return totalHours / hours.length;
}
const getSuccess = (averageHours: number, target: number) => {
    if(averageHours > target){
        return true;
    }
    return false;
}
const getRating = (averageHours: number, target: number) => {
    if(averageHours > target){
        return 3
    }
    if(averageHours/2 > target){
        return 2
    }
    return 1
}
const getMessage = (rating: number) =>  {
    if(rating >= 3){
        return 'Very good'
    }
    if(rating === 2){
        return 'Its ok, try harder next time';
    }
    return 'Terrible job'
}
const calculateExcercises = (hours: Array<number>, target: number): returnObject => {
    const numberOfDays = hours.length;
    let numberOfTrainingDays: number = 0;
    hours.forEach(element =>{
        if(element !== 0){
            numberOfTrainingDays += 1;
        }
    })
    const averageHours: number = calculateAverage(hours);
    const success: boolean = getSuccess(averageHours, target);
    const rating: number = getRating(averageHours, target);
    const message: string = getMessage(rating);
    return{
        numberOfDays: Number(numberOfDays),
        numberOfTrainingDays: Number(numberOfTrainingDays),
        originalTargetValue: Number(target),
        calculatedAverageTime: Number(averageHours),
        targetReachBoolean: Boolean(success),
        ratingNumber: Number(rating),
        ratingText: String(message)
    }
}
try{
    const {target, hours} = parseHours(process.argv)
    console.log(calculateExcercises(hours, target))
} catch(error: unknown){
    let errorMessage = 'something happened. '
    if(error instanceof Error){
        errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
}
