
export function order_created_handler(cart_token: string | number) {
    handlers.find(ele => {
        return ele.cart_token == cart_token
    })?.clearTimer();
    console.log('cleared timer');

}


const handlers: cartAbondmentHandler[] = []
export function handleAbaondment(params: handleAbaondmentBody) {
    // Actual intervals 
    // T1 = t+30 minutes
    // T2 = t + 1 day
    // T3 = t+3 days
    // const t1 = params.time_of_abandonment + (30 * 60 * 1000)

    // Simulation intervals 
    // T1 = t+3 seconds
    // T2 = t + 15 seconds
    // T3 = t+3 45 seconds

    const handle = new cartAbondmentHandler(params)
    handlers.push(handle)
    return handle;
}




function sendMessage(message: string, handler: cartAbondmentHandler) {
    console.log(`\n😎[ SERVER is sending message to ${ handler.phone  } & ${ handler.email }   : (time sent at : ${new Date()} ) ] = > ${ message }\n`)
}



export type handleAbaondmentBody = {
    c_name: string;
    id: number;
    phone: string;
    email: string;
    cart_token: string;
    time_of_abandonment: number;
}

export interface cartAbondmentHandlerInterface extends handleAbaondmentBody {
    intervals: number[];
    // handler: () => void
    timerRef: ReturnType<typeof setTimeout>
    clearTimer: () => void
}
export class cartAbondmentHandler implements cartAbondmentHandlerInterface {

    c_name!: string;
    id!: number;
    phone!: string;
    email!: string;
    cart_token!: string;
    time_of_abandonment!: number;

    intervals: number[] = [];
    timerRef!: ReturnType<typeof setTimeout>


    constructor(params: handleAbaondmentBody) {
        this.c_name = params.c_name;
        this.cart_token = params.cart_token;
        this.phone = params.phone;
        this.email = params.email;
        this.time_of_abandonment = params.time_of_abandonment;
        this.id = params.id;

        const t = this.time_of_abandonment
        console.log({ t })
        const t1 = t + (3000)
        const t2 = t + (15000)
        const t3 = t + (45000)
        // Actual intervals 
        // T1 = t+30 minutes
        // T2 = t + 1 day
        // T3 = t+3 days
        // const t1 = params.time_of_abandonment + (30 * 60 * 1000)

        // Simulation intervals 
        // T1 = t+3 seconds
        // T2 = t + 15 seconds
        // T3 = t+3 45 seconds
        this.intervals = [t1, t2, t3]

        this.handler()

    }

    private handler() {

        if (this.intervals.length > 0) {
            const t = this.intervals[0]
            const t_now = Date.now()
            const time_left = t - t_now;
            console.log({ time_left, t_now })
            clearTimeout(this.timerRef)

            this.timerRef = setTimeout(() => {
                sendMessage('your cart is empty!!', this);
                this.handler()
            }, time_left);

            this.intervals.splice(0, 1)
        }
        else {
            console.log('intervals are over now!!')
        }
    }

    clearTimer() {
        clearTimeout(this.timerRef)
    }
}