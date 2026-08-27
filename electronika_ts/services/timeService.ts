export class TimerService {
  
        day!: number;
        month!: number;
        hour!:number;
        min!:number;
        sec!:number;
        msec!:number;
  
   constructor() {
        this.update(); // Инициализируем данные при создании
    }

    update() {
        const currTime = new Date();

        this.day  = currTime.getDay();
        this.month = currTime.getMonth();
        this.hour = currTime.getHours();
        this.min = currTime.getMinutes();
        this.sec = currTime.getSeconds();
        this.msec = currTime.getMilliseconds()/1000;
        }

    getGameSecond() : number {
        let roundedMsec = this.msec;
        if(roundedMsec < 0.26)
            return this.sec + 0.25;
        else if(roundedMsec > 0.25 && roundedMsec < 0.51)
            return this.sec +  0.5;
        else if(roundedMsec > 0.5 && roundedMsec < 0.76)
            return this.sec + 0.75;
        else if(roundedMsec > 0.75)
            return this.sec + 0;
        else return 0;
        //return this.sec + roundedMsec;    
    }    

    formatWithZero(val : number, len: number = 2) : string {
        return String(val).padStart(len, '0');
    }

    getFormattedTime() : string {
        const h = this.formatWithZero(this.hour);
        const m = this.formatWithZero(this.min);
        const s = this.formatWithZero(this.sec);
        return `${h}:${m}:${s}`;
  }


    
}