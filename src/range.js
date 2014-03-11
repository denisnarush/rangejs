// constructor
var RangeJS = function (element, options) {
    this.labelsPosition = [];
    this.container = document.querySelector(element);

    //set options
    makeOptions.call(this, options, RangeJS.defaults);
    //render elements
    render.call(this);
    //bind handlers for elements
    this.nodes.root.addEventListener('mousedown', onRootMouseDown);
    document.addEventListener('mouseup', onDocumentMouseUp);

    this.getValue = RangeJS.prototype.getValue;
    this.destroy = RangeJS.prototype.destroy;
    this.onValueChange = function () {};
};

// default options
RangeJS.defaults = {
    min: 3,
    max: 13,
    value: 5,
    step: false,
    labelsClassName: 'RangeJS-label',
    onValueChange: function () { }
};

// public
RangeJS.prototype = {
    getValue: function () {
        return this.options.value;
    },
    destroy: function () {
        this.nodes.root.removeEventListener('mousedown', onRootMouseDown);
        this.nodes.root.parentNode.removeChild(this.nodes.root);
    }
};

window.Range = RangeJS;