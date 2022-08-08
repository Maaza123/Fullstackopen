const calculateBmi = (height: number, weight: number): string => {
    console.log(height,' ', weight)
    const bmi: number = weight / height / height * 10000;
    console.log(bmi);
    if( bmi < 18.5){
        return 'underweight';
    }else if(18.5 <= bmi && bmi <= 24.9){
        return 'normal weight';
    }else if(25 <= bmi && bmi <= 29.9){
        return 'overweight';
    }
    return 'obese';
}
interface Values {
    height: number,
    weight: number
}
const parseArguments = (args: Array<string>): Values => {
    console.log('yolo')
    if(args.length !== 4) {throw new Error('wrong amount of arguments')};

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return{
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else{
        throw new Error('Provided values were not numbers')
    }
}
    try{
        const {height, weight} = parseArguments(process.argv)
        calculateBmi(height, weight)
    } catch(error: unknown){
        let errorMessage = 'something happened. '
        if(error instanceof Error){
            errorMessage += 'Error: ' + error.message
        }
        console.log(errorMessage)
    }

