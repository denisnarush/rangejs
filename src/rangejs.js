//(function () {

    // constructor
    var RangeJS = function (element, options) {

        /* --------
         * element is appended to the DOM
        */
        this.appended = false;

        /* --------
         * Range container element
        */
        this.container = document.createElement('div');

        /* --------
         * if element is String
        */
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }

        /* --------
         * if element is DOM Element
        */
        if (element instanceof Element) {

            if (element.parentNode || element.parentElement) {
                this.appended = true;
            }

            this.container = element;
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
        max: 10
    };

    // public
    RangeJS.prototype = {
        /* --------
         * Append container to the DOM
        */
        append: function (element) {

            /* --------
             * Don't append twice
            */
            if (this.appended) {
                return false;
            }

            /* --------
             * if element is String
            */
            if (typeof element === 'string'){
                element = document.querySelector(element);
            }

            /* --------
             * if element is DOM Element
            */
            if (element instanceof Element) {
                element.appendChild(this.container);
                this.appended = true;
            }

            return this.appended;
        }
        // getValue: function () {
        //     return this.options.value;
        // },
        // destroy: function () {
            // destroy all events, html
        // }
    };

    Range = RangeJS;

// })()