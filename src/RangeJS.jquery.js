/*
 * RangeJS
 * TODO: methodUpdate
 * TODO: IE8+
 * TODO: touch
*/

(function () {
  "use strict";

  // private
  var selectedElement = null;
  var startState = {};

  var init = function (){
    var opt = this.options;

    this.labelPosition = [];
    for (var i = 0; i <= opt.value.length - 1; i += 1) {
      this.labelPosition[i] = calcPosition.call(this, opt.value[i]);
    }

    render.call(this);
    bindEvents.call(this);
    update.call(this, "label");
  };

  var update = function (task) {
    switch (task)
    {
    case "label":
      for (var i = 0; i < this.nodes.label.length; i += 1) {
        var el = $(this.nodes.label[i]);
        if (el.hasClass("__left")) {
          el.css({"margin-left": -el.outerWidth() || "-35px"})
        }
      }
      break;
    }
  }

  var makeOptions = function (options, defaults) {
    var opt = $.extend({} , defaults, options);
    var optValCount;

    if (typeof opt.value === 'number') {
      opt.value = [opt.value];
    }

    optValCount = opt.value.length;
    opt.value = (optValCount > 0) ? opt.value : [0,100];
    opt.value.sort(function (a,b){
      if (a>b) return 1
      if (a<b) return -1
      if (a==b) return 0
    })

    for (var i = 0; i <= optValCount; i += 1) {
      if (opt.value[i] > opt.max) {
        opt.max = parseInt(opt.value[i] * 1.2);
      }else {
        if (opt.value[i] < 0 && opt.onlyPositive) {
          opt.value[i] == 0;
        }
        if (opt.value[i] < opt.min) {
          opt.min = parseInt(opt.value[i] * 1.2);
        }
      }
    }

    if (optValCount > 2) {
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

    if (this.options.type === "interval" && this.options.inverse === true) {

      $(this.nodes.indicator[0]).css({
        width: this.labelPosition[0]
      })

      $(this.nodes.indicator[1]).css({
        left: this.labelPosition[1],
        width: this.options.width - this.labelPosition[1]
      })

    }else{
      var count = this.options.value.length;
      for (var i = 0; i < count - 1; i += 1){
        var l = this.labelPosition[i];
        var r = this.labelPosition[i + 1];

        if ( l>r ) {
          l = this.labelPosition[i + 1];
          r = this.labelPosition[i];  
        }

        l = parseInt(l, 10);
        r = parseInt(r, 10);

        $(this.nodes.indicator[i]).css({left:l,width: r - l});
      }
    }
  };

  var updateLabelPosition = function (element) {
    if (element) {
      var index = element.getAttribute("data-index");
      var position = calcPosition.call(this, this.options.value[index]);
      this.labelPosition[index] = position;
      element.style.left = position + "px";
      element.innerHTML = this.options.value[index];
    }
  };

  // render html
  var render = function () {
    var container = $(this.container)

    var root = $("<div>")
    .addClass("RangeJS-container")
    .css({width: this.options.width})

    if (this.options.inverse) {
      root.addClass(" __inverse");
    }

    root[0].range = this;
    root = root[0]

    this.nodes = {
      root: root,
      label: [],
      indicator: []
    };


    // units
    if (typeof this.options.units === "string" && this.options.units !== "") {
      var units = $("<span>")
      .addClass("RangeJS-units")
      .text(this.options.units);

      $(this.nodes.root).append(units);
    }

    // minValueShow
    if (this.options.minValueShow === true) {
      var e = $("<span>")
      .addClass("RangeJS-endPoints __left")
      .text(this.options.min);

      this.nodes.minValueLabel = e[0];
      $(this.nodes.root).append(e);
    }

    // maxValueShow
    if (this.options.maxValueShow === true) {
      var e = $("<span>")
      .addClass("RangeJS-endPoints __right")
      .text(this.options.max);

      this.nodes.maxValueLabel = e[0];
      $(this.nodes.root).append(e);
    }

    // indicators
    if (this.options.type === "interval" && this.options.inverse) {
      var l = this.labelPosition[0] || 0;
      var r = this.labelPosition[1] || this.options.width;

      var e = $("<div>")
      .addClass("RangeJS-indicator __i")
      .css({
        left: 0,
        width: l
      });

      this.nodes.indicator.push(e[0]);
      $(this.nodes.root).append(e);

      e = $("<div>")
      .addClass("RangeJS-indicator __i")
      .css({
        left: r,
        width: this.options.width - r
      });

      this.nodes.indicator.push(e[0]);
      $(this.nodes.root).append(e);

      updateIndicator.call(this);
    } else {
      var classIndex = "__i";
      for (var i = 0; i < this.options.value.length -1; i += 1 ) {

        var l = this.labelPosition[i]     || 0;
        var r = this.labelPosition[i + 1] || this.options.width;
        var w = r - l;

        var e = $("<div>")
        .addClass("RangeJS-indicator " + classIndex)
        .css({
              left: l,
              width: w
            })

        this.nodes.indicator.push(e[0]);
        $(this.nodes.root).append(e);
        classIndex += "i";
        updateIndicator.call(this)
      }
    }

    // labels
    for (var i = 0; i <= this.options.value.length - 1; i += 1) {
      var e = $("<div>")
      .addClass("RangeJS-label")
      .attr({"data-index":i,"contenteditable":true})
      .text(this.options.value[i])
      .css({left : calcPosition.call(this, this.options.value[i]) })

      if (this.options.type === "interval" && i === this.options.value.length - 1) {
        e.addClass("__right");
      }else{
        e.addClass("__left");
      }

      this.nodes.label.push(e[0])
      $(this.nodes.root).append(e);
    }

    container.append(root)
  };

  // handlers
  var onRootMouseDown = function (e) {
    e = e || window.event;
    e.which = e.which || e.button;
    e.target = e.target || e.srcElement;

    if (e.which !== 1) {return;}

    if($(e.target).hasClass("RangeJS-label")) {
      var inst = e.target.parentNode.range;
      selectedElement = e.target;

      startState.startMouseX = e.clientX;
      startState.index = parseInt(selectedElement.getAttribute("data-index"));
      startState.startPosition =  parseInt(inst.labelPosition[startState.index], 10);
      startState.type = "label";
      startState.max = (startState.startPosition === inst.options.width) ? true : false;

      $(document).on("mousemove", onDocumentMouseMove);
    }

    return false;
  };

  var onRootMouseUp = function (e) {
    if (selectedElement) {
      var inst = e.target.parentNode.range;
      $(document).off("mousemove");
    }
    return false;
  };

  var onRootKeyDown = function (e) {
    e = e || window.event;
    e.which = e.which || e.keyCode;
    e.target = e.target || e.srcElement;

    var element = e.target;
    var keyString = String.fromCharCode(e.which)

    if($(element).hasClass("RangeJS-label")) {

      if ((/[A-ZА-Яa-zа-я._/]/).test(keyString)) {
        return false;
      }

      var inst = element.parentNode.range;
      var value = parseInt(e.target.innerHTML, 10);
      var index = parseInt(element.getAttribute("data-index"));
      value = (value > 9999) ? 9999 : value;

      if (e.which === 13) {
        // enter key
          if (inst.options.type === "interval" && inst.options.cMax) {
            if (value > inst.options.max && index === 1) {
              inst.options.max = value;
              updateLabelPosition.call(inst,inst.nodes.label[0]);
            }
          }

        if (value < inst.options.min) {value = inst.options.min;}

        if (value < inst.options.value[0] && index === 1) {
          value = inst.options.value[0]
        }

        if (value > inst.options.value[1] && index === 0) {
          value = inst.options.value[1]
        }
        if (inst.options.maxValueShow || inst.options.minValueShow) {
          $(inst.nodes.maxValueLabel).text(inst.options.max);
          $(inst.nodes.minValueLabel).text(inst.options.min);
        }

        inst.options.value[index] = value;
        updateLabelPosition.call(inst, element);
        updateIndicator.call(inst);
        return false;
      }
      if (e.which === 38) {
        // up key
        value = inst.options.value[index];
        value += 1;

        if (value > inst.options.max) {value = inst.options.max;}
        if (value < inst.options.min) {value = inst.options.min;}

        inst.options.value[index] = value;
        updateLabelPosition.call(inst, element);
        updateIndicator.call(inst);
        return false;
      }
      if (e.which === 40) {
        // down key
        value = inst.options.value[index];
        value -= 1;

        if (value > inst.options.max) {value = inst.options.max;}
        if (value < inst.options.min) {value = inst.options.min;}

        inst.options.value[index] = value;
        updateLabelPosition.call(inst, element);
        updateIndicator.call(inst);
        return false;
      }
      if (e.which === 9) {
        // tab key
      }
    }
  };

  var onRootDblClick = function (e) {
    if($(e.target).hasClass("RangeJS-label")) {
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
        var oldMax = inst.options.max;
        var oldMouseDelta = mouseDelta;

        var pos = startState.startPosition + mouseDelta;
        var max = (typeof inst.labelPosition[startState.index + 1] == "number") ? inst.labelPosition[startState.index + 1] : inst.options.width;
        var min = (typeof inst.labelPosition[startState.index - 1] == "number") ? inst.labelPosition[startState.index - 1] : 0;

        if (pos > max) {
          pos = max
        }else {
          if (pos <= min) {
            pos = min
          }
        }

        inst.labelPosition[startState.index] = pos;


        if (startState.max && oldPosition > inst.labelPosition[startState.index]) {
          startState.max = false;
        }

        if (startState.max && inst.options.cMax && mouseDelta > 0) {
          inst.options.max += 1;
          if (inst.options.type === "interval") {
            updateLabelPosition.call(inst,inst.nodes.label[0]);
          }
        }

        
        if (inst.labelPosition[startState.index] !== oldPosition) {
          selectedElement.style.left = inst.labelPosition[startState.index] + "px";
        }

        inst.options.value[startState.index] = calcValue.call(inst, inst.labelPosition[startState.index]);

        if (inst.options.value[startState.index] !== oldValue) {
          selectedElement.innerHTML = inst.options.value[startState.index].toString();

            if ($(selectedElement).hasClass("__left")) {
              $(selectedElement).css({"margin-left" : -$(selectedElement).outerWidth()})
            }
        }

        updateIndicator.call(inst);
        update.call(inst, "label")
      }
    }
    return false;
  };
  
  var onDocumentMouseUp = function (e) {
    if (selectedElement) {
      var inst = selectedElement.parentNode.range;
      if (inst.options.maxValueShow || inst.options.minValueShow) {
        $(inst.nodes.maxValueLabel).text(inst.options.max);
      }
      selectedElement = null;
      $(document).off("mousemove");
      return false;
    }
  };


  // add event listeners
  var bindEvents = function () {
    $(this.nodes.root).on("mousedown", onRootMouseDown);
    $(this.nodes.root).on("mouseup", onRootMouseUp);
    $(this.nodes.root).on("keydown", onRootKeyDown);
    $(this.nodes.root).on("dblclick", onRootDblClick);
    $(document).on("mouseup", onDocumentMouseUp);
  };

  // constructor
  var RangeJS = function (target, options) {
    this.container = target;

    if ( typeof target === "string" ) {
      this.container = document.querySelector(target);
    }
    this.options = makeOptions.call(this, options, RangeJS.defaults);
    init.call(this);
  };

  // default options
  RangeJS.defaults = {
   min: 0,
   max: 1,
   value: [10, 20],
   type: "interval",
   inverse: false,
   width: 523
  };

  // public
  RangeJS.prototype = {
    getValue: function () {
      if (this.options.type === "interval") {
        if (this.options.value[0] > this.options.value[1])
          return [this.options.value[1],this.options.value[0]]
      }
      return this.options.value;
    },
    update: function () {
      return update();
    },
    destroy: function () {}
  };

  window.RangeJS = RangeJS;
}());

(function( $ ){
  $.fn.Range = function (options) {

    var method = (typeof options === "string") ? options : "update";
    var isGetter = (method.indexOf("get") === 0);
    var firstElem = this[0]; 
    var instance;
    var property;

    if (arguments.length > 1) {
      property = arguments[1];
    }


    if (isGetter && firstElem) {
      instance = $.data(firstElem, "plugin_range");
      if (instance) {
        return instance[method]();
      }
    }

    return $.each(this, function () {
      instance = $.data(this, "plugin_range");

      if (instance) {
        return instance[method](property);
      }

      $.data(this, "plugin_range", (new RangeJS(this, options)));
    });
  };
})( jQuery );