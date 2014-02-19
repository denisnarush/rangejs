/*
 * Extend;
*/
var extend = function (target) {
    for (var i = 1, len = arguments.length; i < len; i++) {
        var source = arguments[i];
        if (source) {
            for (var prop in source) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
};

/*
 * range
 * Denis Narush
*/


// private
var selectedElement = null;
var startState = null;

var makeOptions = function (options, defaults) {
    var opt = extend({}, defaults, options);

    this.isWebkitTransform = document.body.style.hasOwnProperty('webkitTransform');

    if (typeof opt.value === 'number') {
        opt.value = [opt.value];
        opt.type = 'single';
    }
  
    if (opt.value.length > 2) {
        opt.inverse = false;
        opt.type = "dynamic";
    }

    if (typeof opt.onValueChange === 'function') {
        this.onValueChange = opt.onValueChange;
    }

    return opt;
};

var getRootWidth = function () {
    return (startState ? startState.containerWidth : this.nodes.root.clientWidth);
};

//from value to label position
var calcPosition = function (value, px) {
    var opt = this.options;
    var delta = opt.max - opt.min;
    var fact = opt.width / delta;

    if (startState && px) {
        console.log(value);
        return (value) / (getRootWidth.call(this) / 100);
    }
    return (value - opt.min) / (delta / 100);

    // return Math.round((value - opt.min) * fact, 10);
};

//from label position to value
var calcValue = function (position) {
    var pos = parseInt(position, 10);
    var opt = this.options;
    var delta = opt.max - opt.min;
    var fact = opt.width / delta;

    return pos / fact + opt.min;
};

var updateIndicator = function () {
};

var TranslateX = function (element, value) {
    // if (this.isWebkitTransform) {
    //     return element.style.webkitTransform = ['translate(', value, 'px)'].join('');
    // }
    return element.style.left = value + '%';
};

var updateLabelsPosition = function () {
    var c = this.nodes.labels.length;
    for (var i = 0; i < c; i += 1) {
        var val = this.options.value[i];
        var pos = calcPosition.call(this, val);
        var label = this.nodes.labels[i];
        this.labelsPosition[i] = pos;
        TranslateX.call(this, label, pos);
    }
};

// render
var render = function () {
    var container = this.container;

    var root = document.createElement('div');
    root.className = 'RangeJS-container';
    root.style.width = this.options.width + 'px';

    root.range = this;

    this.nodes = {
        root: root,
        labels: []
    };

    container.appendChild(this.nodes.root);
    this.options.width = this.nodes.root.clientWidth;

    // render labels
    for (var i = 0, c = this.options.value.length; i < c; i += 1) {
        var label = document.createElement('div');
        var labelPositionX = calcPosition.call(this, this.options.value[i]);

        label.className = this.options.labelsClassName;
        label.setAttribute('data-id', i);
        label.setAttribute('data-value', this.options.value[i]);

        //label.style.left = labelPositionX + 'px';
        TranslateX.call(this, label, labelPositionX);

        this.nodes.labels[i] = label;
        this.labelsPosition[i] = labelPositionX;

        this.nodes.root.appendChild(this.nodes.labels[i]);
    }
};

// handlers
var onDocumentMouseMove = function (e) {
    if (selectedElement === null) { return; }

    var self = selectedElement.el.parentNode.range;
    var mouseD = e.clientX - startState.startMouseX;
    var isValueChange = false;

    selectedElement.newX = selectedElement.x + mouseD;

    if (selectedElement.newX === selectedElement.prevX) { return; }

    if (selectedElement.newX > self.options.width ||
        selectedElement.newX < 0) { return; }

    selectedElement.prevX = selectedElement.newX;
    selectedElement.newVal = calcValue.call(self, selectedElement.newX);
    self.labelsPosition[selectedElement.id] = selectedElement.newX;

    isValueChange = false;

    if (selectedElement.newVal !== selectedElement.val) {
        if (!self.options.step) {
            selectedElement.val = selectedElement.newVal;
            isValueChange = true;
        } else {
            if (selectedElement.newVal >= selectedElement.val + self.options.step ||
                selectedElement.newVal === self.options.max ||
                selectedElement.newVal <= selectedElement.val - self.options.step ||
                selectedElement.newVal === self.options.min) {

                selectedElement.val = Math.round(selectedElement.newVal, 10);
                isValueChange = true;
            }
        }
        self.options.value[selectedElement.id] = selectedElement.val;
    }

    var pos = (self.options.step ? calcPosition.call(self, selectedElement.val) : calcPosition.call(self, selectedElement.newX, true));

    TranslateX.call(self, selectedElement.el, pos);

    if (isValueChange) { self.onValueChange(); }
};

var onRootMouseUp = function (e) {
    console.log('onRootMouseUp:');
};

var onRootMouseDown = function (e) {
    var self = this.range;
    var target = e.target;
    var targetClass = e.target.getAttribute('class');
    var targetId = parseInt(target.getAttribute('data-id'));

    if (targetClass.indexOf(self.options.labelsClassName) !== -1) {
        console.log('onRootMouseDown: label is clicked');

        selectedElement = {
            el: target,
            id: targetId,
            x: e.clientX,
            prev: e.clientX,
            val: self.options.value[targetId]
        };

        startState = {
            startMouseX: e.clientX,
            containerWidth: self.container.clientWidth
        };

        document.addEventListener('mousemove', onDocumentMouseMove);
        return;
    }
    console.log('onRootMouseDown');
};

var onRootKeyDown = function (e) {
};

var onRootDblClick = function (e) {
};

var onDocumentMouseUp = function (e) {
    if (!selectedElement) { return; }
    var self = selectedElement.el.parentNode.range;
    var val = selectedElement.val;
    selectedElement.el.setAttribute('data-value', val);

    if (self.options.step) {
        var id = selectedElement.id;
        var pos = calcPosition.call(self, val);
        var label = self.nodes.labels[selectedElement.id];
        TranslateX.call(self, label, pos);
        self.labelsPosition[id] = pos;
    }

    selectedElement = null;
    startState = null;
    document.removeEventListener('mousemove', onDocumentMouseMove);
    console.log('onDocumentMouseUp:');
};

// add event listeners
var bindEvents = function () {
    var self = this;
    this.nodes.root.addEventListener('mousedown', onRootMouseDown);
    this.nodes.root.addEventListener('mouseup', onRootMouseUp);
    document.addEventListener('mouseup', onDocumentMouseUp);
};


// init
var init = function () {
    this.labelsPosition = [];

    render.call(this);
    bindEvents.call(this);
};

// constructor
var RangeJS = function (target, options) {
    this.container = target;

    if (typeof target === 'string') {
        this.container = document.querySelector(target);
        this.options = makeOptions.call(this, options, RangeJS.defaults);
        init.call(this);
    }
};

// default options
RangeJS.defaults = {
    min: 3,
    max: 13,
    value: 5,
    step: false,
    labelsClassName: 'RangeJS-label',
    onValueChange: function () { console.log('value is changed'); }
};

// public
RangeJS.prototype = {
    getValue: function () {
        return this.options.value;
    },
    onValueChange: function () {},
    destroy: function () {
        this.nodes.root.removeEventListener('mousedown', onRootMouseDown);
        this.nodes.root.removeEventListener('mouseup', onRootMouseUp);
        this.nodes.root.parentNode.removeChild(this.nodes.root);
    },
    extend: extend
};

window.Range = RangeJS;