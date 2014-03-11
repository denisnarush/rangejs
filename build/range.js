;(function (undefined) {
  'use strict';

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
  
      translateX.call(self, selectedElement.el, pos);
  
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
}());
