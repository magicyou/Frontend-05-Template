
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
        this.root.classList = "carousel";

        for (let record of this.attributes.src) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        let position = 0;
        this.root.addEventListener("mousedown", (event) => {
            this.children = this.root.children;
            let startX = event.clientX;
            let move = event => {
                let x = event.clientX - startX;
     
                let current = position - ((x-x%500)/500)
                for(let offset of [-1,0,1]){
                  let pos = current + offset
                  pos = (pos + this.children.length) % this.children.length
                  this.children[pos].style.transition = 'none'
                  this.children[pos].style.transform = `translate(${-pos * 500 + offset*500 + x%500}px)`
                }
            }
            let up = event => {
                let x = event.clientX - startX;
                position = position - Math.round(x/500);
                for(let offset of [0,Math.sign(x-250*Math.sign(x))]){
                  let pos = position + offset
                  pos = (pos + this.children.length) % this.children.length
                  this.children[pos].style.transition = ''
                  this.children[pos].style.transform = `translate(${-pos * 500 + offset*500}px)`
                }
                document.removeEventListener("mousemove",move);
                document.removeEventListener("mouseup",up);
            }

            document.addEventListener("mousemove",move);
            document.addEventListener("mouseup",up);

        });
        

        // let currentIndex = 0;

        // setInterval(() => {
        //     let children = this.root.children;
        //     let nextIndex = (currentIndex + 1) % children.length;

        //     let current = children[currentIndex];
        //     let next = children[nextIndex];

        //     next.style.transition = `none`
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`

        //     setTimeout(() => {
        //         next.style.transition = "";
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        //         next.style.transform = `translateX(${-nextIndex * 100}%)`
        //         currentIndex = nextIndex;
        //     }, 16);
        // },3000);
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