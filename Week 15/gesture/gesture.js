let element = document.documentElement;
let isListeningMouse = false;

element.addEventListener('mousedown', event => {

    let context = Object.create(null);
    contexts.set("mouse" + (1 << event.button), context);

    start(event, context);

    let mousemove = event => {
        let button = 1;

        while(button <= event.buttons) {
            if (button & event.buttons) {
                let context = contexts.get('mouse' + button);
                move(event, context);
            }
           
            button = button << 1;
        }
        // console.log(event.clientX, event.clientY);
        // context.get("mouse" + event.button);
        // move(event)
    }

    let mouseup = event => {
        let context = contexts.get('mouse' + (1 << event.button))
        end(event, context);
        contexts.delete('mouse' + (1 << event.button))


        if (event.buttons === 0) {
            element.removeEventListener('mousemove', mousemove);
            element.removeEventListener('mouseup', mouseup);
            isListeningMouse = false;
        }
    }

    if (!isListeningMouse) {
        element.addEventListener('mousemove', mousemove);
        element.addEventListener('mouseup', mouseup);
        isListeningMouse = true;
    }
    
});


let contexts = new Map();
element.addEventListener('touchstart', event => {
    for (let touch of event.changeTouches) {
        let context = contexts.get(touch.identifier)
        start(touch)
    }
});

element.addEventListener('touchmove', event => {
    for (let touch of event.changeTouches) {
        let context = contexts.get(touch.identifier)
        move(touch)
    }
});

element.addEventListener('touchend', event => {
    for (let touch of event.changeTouches) {
        let context = contexts.get(touch.identifier)
        end(touch)
        contexts.delete(touch.identifier)
    }
});


element.addEventListener('touchcancel', event => {
    for (let touch of event.changeTouches) {
        let context = contexts.get(touch.identifier)
        cancel(touch)
        contexts.delete(touch.identifier)
    }
});



let handler;
let startX, startY;
let isPan = false;
let isTap = true;
let isPress = false;

let start = (point, context) => {
    console.log('start', point.clientX, point.clientY);
    context.startX = point.clientX, context.startY = point.clientY;

    context.points = [{
        t: Date.now(),
        x: point.clicentX,
        y: point.clientY

    }];

    context.isPan = false;
    context.isPress = false;
    context.isTap = true;

    handler = setTimeout(() => {
        console.log("press");
        context.isPan = false;
        context.isPress = true;
        context.isTap = false;
    }, 500);
}

let move = (point, context) => {
    console.log('move', point.clientX, point.clientY);
    let dx = point.clientX - startX, dy = point.clientY - startY;

    if (dx ** 2 + dy ** 2 > 100) {
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        clearTimeout(context.handler);
    }

    if (context.isPan) {
        console.log('pan');
    }
    console.log('move', point.clientX, point.clientY);

    context.points = context.points.filter(point => Date.now() - point.t < 500);
    context.points.push({
        t: Date.now(),
        x: point.clicentX,
        y: point.clientY

    });
}

let end = (point, context) => {
    console.log('end', point.clientX, point.clientY);

    if (context.isTap) {
        console.log('tap');
        dispatch('tap', {})
        clearTimeout(handler)
    }

    if (context.isPan) {
        console.log('panend');
    }

    if (context.isPress) {
        console.log('pressend');
    }

    context.points = context.points.filter(point => Date.now() - point.t < 500);
    let d, v;
    if (!context.points.length) {   
        v = 0;
    } else {
        d = Math.sqrt((point.clicentX - context.points[0].x) ** 2 + (point.clicentY - context.points[0].y) ** 2); 
        v = d / (Date.now() - context.points[0].t);
    }
    if (v > 1.5) {
        context.isFlick = true;
    } else {
        context.isFlick = false;
    }

    console.log('v:', v);
}

let cancel = (point, context) => {
    clearTimeout(context.handler);
    console.log('cancel', point.clientX, point.clientY);
}

function dispatch(type, properties) {
    let event = new Event(type);
    console.log(event);

    for (let name in properties) {
        event[name] = properties[name];
    }
    element.dispatchEvent(event);
}