const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handlder");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");

export class TimeLine {
    constructor () {
        this.state = 'Inited'
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
    }

    start () {
        if (this.state !== 'Inited') {
            return;
        }
        this.state = 'started'
        this[PAUSE_TIME] = 0;
        let startTime = Date.now();
        this[TICK] = () => {
            let now = Date.now();
            for (let animation of this[ANIMATIONS]) {
                let t0;

                if (this[START_TIME].get(animation) < startTime) {
                    t0 = now - startTime;
                } else {
                    t0 = now - this[START_TIME].get(animation)
                }

                if (animation.duration < t0) {
                    this[ANIMATIONS].delete(animation)
                    t0 = animation.duration
                }

                if (t0 > 0) {
                    animation.receive(t0);
                }
            }
            requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }

    pause () {
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);
    }
    resume () {
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[TICK]();
    }

    reset() {
        this.pause();
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
        this[PAUSE_START] = 0;
        this[TICK_HANDLER] = null;
    }

    add(animation, startTime) {
        if (arguments.length < 2) {
            startTime = Date.now();
        }
        this[ANIMATIONS].add(animation)
        this[START_TIME].set(animation, startTime)
    }
}

export class Animation {
    constructor (object, property, startValue, endValue, duration, delay, timingFunction = ( v => v), template = (v => v)) {
        timingFunction =  timingFunction || ( v => v);
        template =  template || ( v => v);
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
        this.template = template;
    }
    receive (time) {
        console.log();
        let range = (this.endValue - this.startValue);
        let progress = this.timingFunction(time / this.duration);
        this.object[this.property] = this.template(this.startValue + range * progress);
    }
}