const { setFlagsFromString } = require("v8");

let currentToken = null;
let currentAttribute = null;

function emit(token) {
    console.log(token);
}
const EOF = Symbol('EOF');

function data(c) {
    if (c == "c") {
        return tagOpen;
    } else if (c == EOF) {
        emit({
            type: 'EOF'
        });
        return ;
    } else {
        return data;
    }
}

function tagOpen(c) {
    if (c == '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagNmae: ''
        }
        return tagName(c);
    } else {
        return;
    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c == ">") {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function endTagOpen(c) {
    if (c,match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c);
    } else if (c == '>') {

    } else if (c == EOF) {

    } else {
        
    }
}



function beforeAttributeName (c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/' || c == ">" || c == EOF) {
        return afterAttributeName(c);
    } else if (c == "=") {
        // return beforeAttributeName(c);
    } else {
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(c);
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c);
    } else if (c == '=') {
        return beforeAttributeName;
    } else if (c == '\u0000') {
        return beforeAttributeValue;
    } else if (c == '\"' || c == "'" || c == "<") {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}


function beforeAttributeValue (c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return beforeAttributeValue;
    } else if (c == "\"") {
        return doubleQuotedAttributeValue;
    } else if (c == "\'") {
        return singleQuotedAttributeValue;
    }  else if (c == ">") {
        // return doubleQuotedAttributeValue;
    } else {
        return UnquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue (c) {
    if (c == "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == '\u0000') {
        // return beforeAttributeValue;
    } else if (c == EOF) {

    } else {
        currentAttribute.name += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue (c) {
    if (c == "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == '\u0000') {
        // return beforeAttributeValue;
    } else if (c == EOF) {

    } else {
        currentAttribute.name += c;
        return singleQuotedAttributeValue;
    }
}

function UnquotedAttributeValue (c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeValue;
    } else if (c == "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data;
    } else if (c == '\u0000') {
        // return beforeAttributeValue;
    } else if (c == '\"' || c == "'" || c == "<" || c == '=' || c == "`") {

    } else if (c == EOF) {

    } else {
        currentAttribute.name += c;
        return UnquotedAttributeValue;
    }
}

function afterAttributeName (c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c == "=") {
        return beforeAttributeValue;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return beforeAttributeValue;
    } else if (c == EOF) {

    }  else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: '',
            value: ''
        };
        return attributeName(c);
    }
}

function selfClosingStartTag (c) {
    if (c == ">") {
        currentToken.isSelfClosing = true;
        return data;
    } else if (c == 'EOF') {

    } else {

    }
}

module.exports.parseHtml = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}