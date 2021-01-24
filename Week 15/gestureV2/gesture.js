

export class Dispatcher {
    constructor(element) {
        this.element = element;
    }
    
    dispatch(type, properties) {
        let event = new Event(type);
        console.log(event);

        for (let name in properties) {
            event[name] = properties[name];
        }
        this.element.dispatchEvent(event);
    }

}



class Listener {
    constructor(element, recognizer) {
        let contexts = new Map();
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
    }
}

class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    star (point, context) {
        console.log('start', point.clientX, point.clientY);
        context.startX = point.clientX, context.startY = point.clientY;
    
        context.points = [{
            t: Date.now(),
            x: point.clicentX,
            y: point.clientY
    
        }];
    
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
    
        context.handler = setTimeout(() => {
            console.log("press");
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            context.handle = null;

            this.dispatcher.dispatch('press', {});
        }, 500);
    }
    
     move(point, context){
        console.log('move', point.clientX, point.clientY);
        let dx = point.clientX - startX, 
            dy = point.clientY - startY;
    
        if (dx ** 2 + dy ** 2 > 100) {
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy) ;

            this.dispatcher.dispatch('panstart', {
                startX: context.startX,
                startY: context.startY,
                clicentX: point.clicentX,
                clicentY: point.clicentY,
                isVertical: context.isVertical
            });
            clearTimeout(context.handler);
        }
    
        if (context.isPan) {
            console.log('pan');
            this.dispatcher.dispatch('pan', {
                startX: context.startX,
                startY: context.startY,
                clicentX: point.clicentX,
                clicentY: point.clicentY,
                isVertical: context.isVertical
            });
        }
        console.log('move', point.clientX, point.clientY);
    
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        context.points.push({
            t: Date.now(),
            x: point.clicentX,
            y: point.clientY
        });
    }
    
    end (point, context) {
        console.log('end', point.clientX, point.clientY);
    
        if (context.isTap) {
            console.log('tap');
            dispatch('tap', {})
            clearTimeout(context.handler)
        }
    
        if (context.isPress) {
            console.log('pressend');
            dispatch('pressend', {})
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
            this.dispatcher.dispatch('panend', {
                startX: context.startX,
                startY: context.startY,
                clicentX: point.clicentX,
                clicentY: point.clicentY,
                isVertical: context.isVertical,
                velocity: v
            });
            context.isFlick = true;
        } else {
            context.isFlick = false;
        }

        if (context.isPan) {
            console.log('panend');

            this.dispatcher.dispatch('panend', {
                startX: context.startX,
                startY: context.startY,
                clicentX: point.clicentX,
                clicentY: point.clicentY,
                isVertical: context.isVertical,
                isFlick: context.isFlick 
            });
        }
    
        console.log('v:', v);
    }
    
     cancel(point, context)  {
        clearTimeout(context.handler);
        console.log('cancel', point.clientX, point.clientY);
        this.dispatcher.dispatch('cancel', { });
    }
    
}

export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatcher(element)))
}