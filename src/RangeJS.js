/*
 * RangeJS
 * TODO: KeyBoardInput
 * TODO: IE8+
 * TODO: touch
 * TODO: changing DOM position of Labels
*/

(function () {
  "use strict";

  // private
  var selectedElement = null;
  var startState = {};

  var init = function (){
    var opt = this.options;

    this.labelPosition = [];
    for (var i = 0; i<=opt.value.length - 1; i += 1) {
      this.labelPosition[i] = calcPosition.call(this, opt.value[i]);
    }

    render.call(this);
    bindEvents.call(this);
  };

  var makeOptions = function (options, defaults) {
    var opt = extend({}, defaults, options);

    if (typeof opt.value === 'number') {
      opt.value = [opt.value];
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
    var l = this.labelPosition[0];
    var r = this.labelPosition[1];

    if ( l>r ) {
      l = this.labelPosition[1];
      r = this.labelPosition[0];  
    }

    l = parseInt(l, 10);
    r = parseInt(r, 10);

    this.nodes.indicator.style.left = l + "px";
    this.nodes.indicator.style.width = r - l + "px";
  };

  var updateLabelPosition = function (element, value) {
    if (element) {
      var index = element.getAttribute("data-index");
      if (typeof value === "number") {
        var position = calcPosition.call(this, value);
        this.labelPosition[index] = position;
        element.style.left = position + "px";
        element.innerHTML = value;
      }
    }
    return false;
  };

  // render html
  var render = function () {
    var root = create({
      className: "RangeJS-container",
      css: {
        width: this.options.width + "px"
      }
    });

    if (this.options.inverse) {
      root.className += " __inverse";
    }
    console.log(this)
    root.range = this;

    this.nodes = {
      root: root,
      label: [],
      indicator: []
    };

    // indicators
    if (this.options.type === "interval") {
      this.nodes.indicator = create({
        css:{
          left: this.labelPosition[0] + "px",
          width: this.labelPosition[1] - this.labelPosition[0] + "px"
        },
        className: "RangeJS-indicator __i"
      });

      this.nodes.root.appendChild(this.nodes.indicator);
    } else {
      if (this.options.type === "dynamic") {
        var classIndex = "__i";
        for (var i = -1; i< this.options.value.length; i += 1 ) {
          var l = this.labelPosition[i] || 0;
          var r = this.labelPosition[i + 1] || this.options.width;
          var w = r - l;
          this.nodes.indicator = create({
            css:{
              left: l + "px",
              width: w + "px"
            },
            className: "RangeJS-indicator " + classIndex
          });

          this.nodes.root.appendChild(this.nodes.indicator);
          classIndex += "i";
        }
      }
    }

    // labels
    for (var i=0;i<=this.options.value.length - 1; i += 1) {
      this.nodes.label[i] = create({
        text: "" + this.options.value[i],
        css: {
          left: calcPosition.call(this, this.options.value[i]) + "px"
        },
        className: "RangeJS-label __left",
        data: {index:i}
      });

      this.nodes.label[i].setAttribute("contenteditable",true);

      if (this.options.type === "interval" && i === this.options.value.length - 1) {
        this.nodes.label[i].className = "RangeJS-label __right";
      }

      this.nodes.root.appendChild(this.nodes.label[i]);
    }

    this.container.appendChild(this.nodes.root);
  };

  // handlers
  var onRootMouseDown = function (e) {
    e = e || window.event;
    e.which = e.which || e.button;
    e.target = e.target || e.srcElement;

    if (e.which !== 1) {return;}

    if(e.target.classList.contains("RangeJS-label")) {
      var inst = e.target.parentNode.range;
      selectedElement = e.target;

      startState.startMouseX = e.clientX;
      startState.index = selectedElement.getAttribute("data-index");
      startState.startPosition = parseInt(inst.labelPosition[startState.index], 10);
      startState.type = "label";

      if (document.addEventListener) {
        document.addEventListener("mousemove", onDocumentMouseMove); 
      } else if (document.attachEvent) {
        document.attachEvent("onmousemove", onDocumentMouseMove);
      }
    }

    return false;
  };

  var onRootMouseUp = function (e) {
    if (selectedElement) {
      if (document.removeEventListener) {
        document.removeEventListener("mousemove", onDocumentMouseMove); 
      } else if (document.attachEvent)  {
        document.detachEvent("onmousemove", onDocumentMouseMove);
      }
    }
    return false;
  };

  var onRootKeyDown = function (e) {
    e = e || window.event;
    e.which = e.which || e.keyCode;
    e.target = e.target || e.srcElement;

    var element = e.target;

    if(element.classList.contains("RangeJS-label")) {
      var inst = element.parentNode.range;

        var value = parseInt(e.target.innerHTML, 10) || 0;

        if (value > inst.options.max) {value = inst.options.max;}
        if (value < inst.options.min) {value = inst.options.min;}

      if (e.which === 13) {
        // enter key
        updateLabelPosition.call(inst, element, value);
        updateIndicator.call(inst);
        return false;
      }
      if (e.which === 38) {
        // up key
        value += 1;

        if (value > inst.options.max) {value = inst.options.max;}
        if (value < inst.options.min) {value = inst.options.min;}

        updateLabelPosition.call(inst, element, value);
        return false;
      }
      if (e.which === 40) {
        // down key
        value -= 1;

        if (value > inst.options.max) {value = inst.options.max;}
        if (value < inst.options.min) {value = inst.options.min;}

        updateLabelPosition.call(inst, element, value);
        return false;
      }
      if (e.which === 9) {
        // tab key
      }
    }
  };

  var onRootDblClick = function (e) {
    if(e.target.classList.contains("RangeJS-label")) {
      selectedElement = e.target;
      e.target.focus();
    }

    return false;
  };

  var onDocumentMouseMove = function (e) {
    e = e || window.event;
    e.which = e.which || e.button;
    if (e.which !== 1) {return;}

    if (selectedElement) {
      //dragging label
      if (startState.type === "label") {
        var root = selectedElement.parentNode;
        var inst = root.range;
        var mouseDelta = e.clientX - startState.startMouseX;
        var oldPosition = inst.labelPosition[startState.index];
        var oldValue = inst.options.value[startState.index];

        inst.labelPosition[startState.index] = startState.startPosition + mouseDelta;

        if (inst.labelPosition[startState.index] <= 0) {
          inst.labelPosition[startState.index] = "0px";
        }

        if (inst.labelPosition[startState.index] >= inst.options.width) {
          inst.labelPosition[startState.index] = inst.options.width;
        }
        
        if (inst.labelPosition[startState.index] !== oldPosition) {
          selectedElement.style.left = inst.labelPosition[startState.index] + "px";
        }

        inst.options.value[startState.index] = calcValue.call(inst, inst.labelPosition[startState.index]);

        if (inst.options.value[startState.index] !== oldValue) {
          selectedElement.innerHTML = "" + inst.options.value[startState.index];
        }

        if (inst.options.type === "interval") {
          updateIndicator.call(inst);
        }
      }
    }
    return false;
  };
  
  var onDocumentMouseUp = function (e) {
    selectedElement = null;
    return false;
  };


  // add event listeners
  var bindEvents = function () {
    if (document.addEventListener) {
      this.nodes.root.onmousedown = onRootMouseDown;
      this.nodes.root.onmouseup = onRootMouseUp;
      this.nodes.root.onkeydown = onRootKeyDown;
      this.nodes.root.ondblclick = onRootDblClick;
      document.addEventListener("mouseup", onDocumentMouseUp); 
    } else if (document.attachEvent)  {
      this.nodes.root.attachEvent("onmousedown",onRootMouseDown);
      this.nodes.root.attachEvent("onmouseup", onRootMouseUp);
      this.nodes.root.attachEvent("onkeydown", onRootKeyDown);
      this.nodes.root.attachEvent("ondblclick", onRootDblClick);
      document.attachEvent("onmouseup", onDocumentMouseUp);
    }
  };

  // constructor
  var RangeJS = function (target, options) {
    if ( typeof target === "string" ) {
      this.container = document.querySelector(target);
      this.options = makeOptions.call(this, options, RangeJS.defaults);
      init.call(this);
    }
  };

  // default options
  RangeJS.defaults = {
   min: 0,
   max: 100,
   value: [10, 20],
   type: "interval",
   inverse: false,
   width: 500
  };

  // public
  RangeJS.prototype = {
    getValue: function () {
      return this.options.value;
    },
    destroy: function () {}
  };

  window.RangeJS = RangeJS;
}());
