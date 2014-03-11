// private
var selectedElement = null,
    startState = null;

function extend(target) {
    for (var i = 1, len = arguments.length; i < len; i++) {
        var source = arguments[i],
            prop;
        if (source) {
            for (prop in source) {
                target[prop] = source[prop];
            }
        }
    }
    return target;
}

function makeOptions(options, defaults) {
    var opt = extend({}, defaults, options);

    if (typeof opt.value === 'number') {
        opt.value = [opt.value];
        opt.type = 'single';
    }
  
    if (opt.value.length > 2) {
        opt.inverse = false;
        opt.type = 'dynamic';
    }

    if (typeof opt.onValueChange === 'function') {
        this.onValueChange = opt.onValueChange;
    }

    this.options = opt;
}

function getRootWidth() {
    return (startState ? startState.containerWidth : this.nodes.root.clientWidth);
}

function calcPosition(value, px) {
    var opt = this.options;
    var delta = opt.max - opt.min;

    if (startState && px) {
        return (value) / (getRootWidth.call(this) / 100);
    }

    return (value - opt.min) / (delta / 100);
}

function calcValue(position) {
    var pos = parseInt(position, 10);
    var opt = this.options;
    var delta = opt.max - opt.min;
    var fact = getRootWidth.call(this) / delta;

    return pos / fact + opt.min;
}

function translateX(element, value) {
    var val = value.toFixed(2);
    return element.style.left = val + '%';
}

function render() {
    var container = this.container;

    var root = document.createElement('div');
    root.range = this;
    root.className = 'RangeJS-container';

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

        // set position
        label.style.left = labelPositionX + "%";

        this.nodes.labels[i] = label;
        this.labelsPosition[i] = labelPositionX;

        this.nodes.root.appendChild(this.nodes.labels[i]);
    }
}