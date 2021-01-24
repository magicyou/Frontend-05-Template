export function createElement (type, attributes, ...children) {
    let element;
    if (typeof type === "string") {
        element = new ElementWrapper(type);
    } else {
        element = new type();
    }

    for (let name in attributes) {
        element.setAttribute(name, attributes[name])
    }
    for (let child of children) {
        if (typeof child === 'string') {
            child = new TextWrapper(child);
        }
        element.appendChild(child)
    }
    return element;
}

export const STATE = Symbol('state');
export const ATTRIBUTE = Symbol('attribute');
export class Component{
    constructor () {
        this[ATTRIBUTE] = Object.create(null);
        this[STATE] = Object.create(null);
    }
    setAttribute (name, value) {
        this[ATTRIBUTE][name] = value;
    }

    appendChild(child) {
      
        if (!this.root) {
            this.render();
        }
        child.mountTo(this.root);
    }

    mountTo(parent) {
        if (!this.root) {
            this.render();
        }
        parent.appendChild(this.root)
    }

    triggerEvent (type, args) {
        this[ATTRIBUTE]["on" + type](new CustomEvent(type, args));
    }
}

class ElementWrapper extends Component{
    constructor (type) {
        super();
        this.root = document.createElement(type);
    }
}

class TextWrapper extends Component{
    constructor (text) {
        super();
        this.root = document.createTextNode(text)
    }

    // render () {
    //     return document.createTextNode(this._content)
    // }

}


export class Fragment extends Component {
    render () {
        return document.createDocumentFragment();
    }
}