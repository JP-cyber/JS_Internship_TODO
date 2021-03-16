export default class DateHandler {
    static getNextDay() {
        const date = new Date();
        const nextDay = new Date( date.setDate(date.getDate() + 1) )
        .toLocaleDateString();

        return nextDay;
    }

    static getCurrentTime() {
        const date = new Date();
        const currentTime = date.toLocaleTimeString();
        return currentTime;
    }

    static getTimeFromStr(str){
        const isStrValid = str.split('.').length === 3;
        if(isStrValid){
            const dateObj = new Date();
            const arr = str.split('.');
            dateObj.setFullYear(
                arr[2],
                arr[1] - 1,
                +arr[0]
            );
            return dateObj.getTime();
        }

        return 0;
        
    }
}