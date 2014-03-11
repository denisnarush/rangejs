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

    if (selectedElement.newVal !== selectedElement.val) {
        if (!self.options.step) {
            selectedElement.val = selectedElement.newVal;
            isValueChange = true;
        } else {
            if (selectedElement.newVal >= selectedElement.val + self.options.step ||
                selectedElement.newVal === self.options.max ||
                selectedElement.newVal <= selectedElement.val - self.options.step ||
                selectedElement.newVal === self.options.min) {

                selectedElement.val = Math.round(selectedElement.newVal);
                isValueChange = true;
            }
        }
        self.options.value[selectedElement.id] = selectedElement.val;
    }

    var pos = (self.options.step ? calcPosition.call(self, selectedElement.val) : calcPosition.call(self, selectedElement.newX, true));

    window.webkitRequestAnimationFrame(translateX.bind(self, selectedElement.el, pos));

    if (isValueChange) { self.onValueChange(); }
};

var onRootMouseDown = function (e) {
    if (e.which !== 1) { return; }

    var self = this.range,
        target = e.target,
        targetClass = target.getAttribute('class'),
        targetId = parseInt(target.getAttribute('data-id'), 10);

    if (targetClass.indexOf(self.options.labelsClassName) !== -1) {
        var selectedElementPositionX = target.offsetLeft + target.offsetWidth / 2;

        selectedElement = {
            el: target,
            id: targetId,
            x: selectedElementPositionX,
            prev: selectedElementPositionX,
            val: self.options.value[targetId]
        };

        startState = {
            startMouseX: e.clientX,
            containerWidth: self.container.clientWidth
        };

        document.addEventListener('mousemove', onDocumentMouseMove);
    }
};

var onDocumentMouseUp = function () {
    if (!selectedElement) { return; }
    var self = selectedElement.el.parentNode.range;
    var val = selectedElement.val;

    selectedElement.el.setAttribute('data-value', val);

    if (self.options.step) {
        var id = selectedElement.id;
        var pos = calcPosition.call(self, val);
        var label = self.nodes.labels[selectedElement.id];
        translateX.call(self, label, pos);
        self.labelsPosition[id] = pos;
    }

    selectedElement = null;
    startState = null;

    document.removeEventListener('mousemove', onDocumentMouseMove);
};