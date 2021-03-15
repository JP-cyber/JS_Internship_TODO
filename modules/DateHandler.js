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
}