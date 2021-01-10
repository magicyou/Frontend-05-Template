export function createElement () {
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
        this.root = this.render();
    }
    setAttribute (name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(child) {
        child.mountTo(this.root);
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class ElementWrapper extends Component{
    constructor (type) {
        this.root = document.createElement(type);
    }

}

class TextWrapper extends Component{
    constructor (content) {
        this.root = document.createTextNode(content)
    }
}