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
*/


// private
var selectedElement = null;
var startState = {};

var makeOptions = function (options, defaults) {
    var opt = extend({}, defaults, options);

    if (typeof opt.value === 'number') {
        opt.value = [opt.value];
        opt.type = 'single';
    }
  
    if (opt.value.length > 2) {
        opt.inverse = false;
        opt.type = "dynamic";
    }

    return opt;
};

var calcPosition = function (value) {
    var opt = this.options;
    var delta = opt.max - opt.min;
    var fact = opt.width / delta;

    return (value - opt.min) * fact;
};

var calcValue = function (position) {
    var pos = parseInt(position, 10);
    var opt = this.options;
    var delta = opt.max - opt.min;
    var fact = opt.width / delta;

    return Math.round(pos / fact + opt.min);
};

var updateIndicator = function () {
};

var updateLabelPosition = function (element, value) {
    if (element) {
        var index = element.getAttribute('data-id');
        if (typeof value === 'number') {
            var position = calcPosition.call(this, value);
            this.labelsPosition[index] = position;
            element.style.left = position + 'px';
            element.innerHTML = value;
        }
    }
    return false;
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

    // render labels
    for (var i = 0, c = this.options.value.length; i < c; i += 1) {
        var label = document.createElement('div');
        label.className = this.options.labelsClassName;
        label.style.left = calcPosition.call(this, this.options.value[i]) + 'px';
        label.setAttribute('data-id', i);
        label.setAttribute('data-value', this.options.value[i]);

        this.nodes.labels[i] = label;

        this.nodes.root.appendChild(this.nodes.labels[i]);
    }

    container.appendChild(this.nodes.root);
};

// handlers
var onDocumentMouseMove = function (e) {
    if (selectedElement === null) { return; }

    var self = selectedElement.el.parentNode.range;
    var mouseD = e.clientX - startState.startMouseX;

    selectedElement.newX = selectedElement.x + mouseD;
    selectedElement.newVal = calcValue.call(self, selectedElement.newX);

    if (selectedElement.newVal !== selectedElement.val &&
        selectedElement.newVal <= self.options.max &&
        selectedElement.newVal >= self.options.min) {

        selectedElement.val = selectedElement.newVal;
        selectedElement.el.style.left = calcPosition.call(self, selectedElement.val) + 'px';

        self.labelsPosition[selectedElement.id] = selectedElement.newX;
        self.options.value[selectedElement.id] = selectedElement.val;
    }
};

var onRootMouseDown = function (e) {
    console.log('onRootMouseDown:');
    var self = this.range;
    var target = e.target;
    var targetClass = e.target.getAttribute('class');
    var targetId = parseInt(target.getAttribute('data-id'));

    if (targetClass.indexOf(self.options.labelsClassName) !== -1) {
        console.log('label is clicked');

        selectedElement = {
            el: target,
            id: targetId,
            x: self.labelsPosition[targetId],
            val: self.options.value[targetId]
        };

        startState = {
            startMouseX: e.clientX
        };

        document.addEventListener('mousemove', onDocumentMouseMove);
    }
};

var onRootMouseUp = function (e) {
};

var onRootKeyDown = function (e) {
};

var onRootDblClick = function (e) {
};


var onDocumentMouseUp = function (e) {
    console.log('onDocumentMouseUp:');
    selectedElement = null;
    startState = null;
    return document.removeEventListener('mousemove', onDocumentMouseMove);
};


// add event listeners
var bindEvents = function () {
    this.nodes.root.addEventListener('mousedown', onRootMouseDown);
    document.addEventListener('mouseup', onDocumentMouseUp);
};


// init
var init = function () {
    var opt = this.options;

    this.labelsPosition = [];
    for (var i = 0; i <= opt.value.length - 1; i += 1) {
        this.labelsPosition[i] = calcPosition.call(this, opt.value[i]);
    }

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
    min: 0,
    max: 10,
    value: 3,
    width: 500,
    labelsClassName: 'RangeJS-label'
};

// public
RangeJS.prototype = {
    getValue: function () {
        return this.options.value;
    },
    destroy: function () {}
};

window.Range = RangeJS;