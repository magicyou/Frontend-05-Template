import {TimeLine, Animation} from './animation.js';

let tl = new TimeLine();
tl.start();

tl.add(new Animation(document.querySelector('#el').getElementsByClassName, 'transform', 0, 500, 2000, 0, null, v => `translate(${v}px)`))
document.querySelector('#appuse_btn').addEventListener('click', () => tl.pause())
document.querySelector('#resume_btn').addEventListener('click', () => tl.resume())