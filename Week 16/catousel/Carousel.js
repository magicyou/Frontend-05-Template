
import { ATTRIBUTE, Component, createElement, STATE } from './framework'
import { EnableGestrue } from './gesture.js'
import { Timeline, Animation } from './animation.js'
import { ease } from './ease.js'

class Carousel extends Component {
    constructor() {
        super();
    }
    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');

        for (let record of this.attributes.src) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        EnableGestrue(this.root);

        let timeline = new Timwline;
        timeline.start();

        let handler = null;

        let children = this.root.children;

        let position = 0;  //组件当前状态

        let t = 0;
        let ax = 0;
        this.root.addEventListener("start", (event) => {
            timeline.pause();
            clearInterval(handler);

            if (Date.now() - t < 1500) {
                let progress = (Date.now() - t) / 1500;
                ax = ease(progress) * 500 - 500;
            } else {
                ax = 0;
            }
        });

        this.root.addEventListener("tap", (event) => {
            this.triggerEvent('click', {
                data: this[ATTRIBUTE].src[this[STATE].position],
                position: this[STATE].position
            });
        });

        this.root.addEventListener("pan", (event) => {
            let x = eventclientX = event.startX - ax;
            let current = position - ((x - x % 500) / 500);

            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (post % children.length + children.length) % children.length
                children[pos].style.transition = "none";
                children[pos].style.transform = `translateX(${- pos * 500(x % 500) + offset * 500}px)`
            }

        });


        this.root.addEventListener("end", (event) => {
            timeline.reset();
            timeline.start();

            handler = setInterval(nextPicture, 3000);
            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - (x - (x % 500)) / 500;
            let direction = Math.round((x % 500) / 500);

            if (event.isFlick) {
                console.log('isFlick');
                if ((x % 500) / 500 > 0) {
                    direction = Math.ceil((x % 500) / 500);
                } else {
                    direction = Math.floor((x % 500) / 500);
                }
            }

            for (const offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = ((pos % children.length) + children.length) % children.length;
                timeline.add(
                    new Animation(
                        children[pos].style,
                        "transform",
                        -pos * 500 + (x % 500) + offset * 500,
                        -pos * 500 + direction * 500 + offset * 500,
                        800,
                        ease,
                        0,
                        (v) => `translateX(${v}px)`
                    )
                );
            }

            this[STATE].position =
                this[STATE].position - (x - (x % 500)) / 500 - direction;
            this[STATE].position = ((this[STATE].position % children.length) + children.length) % children.length;

            this.triggerEvent("change", {
                position: this[STATE].position,
            });
        });

        // 自动播放
        let nextPicture = () => {
            let current = children[this[STATE].position];
            let nextPosition = (this[STATE].position + 1) % children.length;
            let next = children[nextPosition];
            t = Date.now();
            timeline.add(
                new Animation(
                    current.style,
                    "transform",
                    -this[STATE].position * 500,
                    -500 - this[STATE].position * 500,
                    800,
                    ease,
                    0,
                    (v) => {
                        return `translateX(${v}px)`;
                    }
                )
            );
            timeline.add(
                new Animation(
                    next.style,
                    "transform",
                    500 - nextPosition * 500,
                    -nextPosition * 500,
                    800,
                    ease,
                    0,
                    (v) => {
                        return `translateX(${v}px)`;
                    }
                )
            );

            this[STATE].position = nextPosition;
            this.triggerEvent("change", {
                position: this[STATE].position,
            });

            // 浏览器刷新一帧的时间 16ms
        };

        return this.root;
    }
}