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

export class Component{
    constructor () {
        // this.root = this.render();
    }
    setAttribute (name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(child) {
        child.mountTo(this.root);
    }

    mountTo(parent) {
        parent.appendChild(this.render())
    }
}

class ElementWrapper extends Component{
    constructor (type = "") {
        super();
        this._type = type;
        // this.root = document.createElement(type);
    }

    render () {
        return document.createElement(this._type)
    }

}

class TextWrapper extends Component{
    constructor (content = "") {
        super();
        this._content = content;
        // this.root = document.createTextNode(content)
    }

    render () {
        return document.createTextNode(this._content)
    }

}


export class Fragment extends Component {
    render () {
        return document.createDocumentFragment();
    }
}