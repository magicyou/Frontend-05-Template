
import {Component, createElement} from './framework'

class Carousel extends Component {
    constructor () {
       super();
       this.attributes = Object.create(null)
    }

    setAttribute (name, value) {
        this.attributes[name] = value;
    }
    render () {
        console.log(this.attributes.src);
        this.root = document.createElement('div');
        for (let record of this.attributes.src) {
            let child = dcouemnt.createElement('div');
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        let currentIndex = 0;

        setInterval(() => {
            let children = this.root .children;
            let nextIndex = (currentIndex + 1) % children.length;

            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = `none`
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`

            setTimeout(() => {
                next.style.transition = "";
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
                next.style.transform = `translateX(${-nextIndex * 100}%)`
                currentIndex = nextIndex;
            }, 16);
        },3000);
        return this.root;
    }

    mountTo (parent) {
        parent.appendChild(this.render());
    }
}

let d = [
    'https://img4.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
    'https://img4.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
    'https://img4.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
    'https://img4.mukewang.com/szimg/5dc9047a09bae31e12000676-360-202.png',
];

let a = <Carousel src={d} />

a.mountTo(document.body);