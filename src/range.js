//(function () {

    // constructor
    var RangeJS = function (element, options) {

        /* --------
         * if no element passed
         * create new element
        */
        if (!element) {
            element = document.createElement('div');
        }


        // this.labelsPosition = [];
        // this.container = document.querySelector(element);

        //set options
        // makeOptions.call(this, options, RangeJS.defaults);
        //render elements
        // render.call(this);
        //bind handlers for elements
        // this.nodes.root.addEventListener('mousedown', onRootMouseDown);
        // document.addEventListener('mouseup', onDocumentMouseUp);

        // this.getValue = RangeJS.prototype.getValue;
        // this.destroy = RangeJS.prototype.destroy;
        // this.onValueChange = function () {};
    };

    // default options
    RangeJS.defaults = {
        min: 0,
        max: 1
    };

    // public
    RangeJS.prototype = {
        getValue: function () {
            return this.options.value;
        },
        destroy: function () {
            // destroy all events, html
        }
    };

    Range = RangeJS;

// })()