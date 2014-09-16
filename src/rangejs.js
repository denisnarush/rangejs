//(function () {

    // constructor
    var RangeJS = function (element, options) {

        /* --------
         * if passed one argument
         * check is it an options
        */
        if (arguments.length === 1) {
            if (typeof arguments[0] === 'object') {
                options = arguments[0];
            }
        }

        /* --------
         * instance options
        */
        this.options = this.extend({}, RangeJS.defaults);

        /* --------
         * instance container
        */
        this.container = document.createElement('div');

        /* --------
         * instance container
         * is appended to the DOM
        */
        this.appended = false;

        /* --------
         * if element is String
        */
        if (typeof element === 'string') {
            try {
                element = document.querySelector(element);
            }
            catch(err) {
                console.error(err);
            }
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

        if (typeof options === 'object') {
            this.options = this.extend(this.options, options);
        }

        /* --------
         * set attribute for container
        */
        this.container.setAttribute('data-rangejs', '');

        /* --------
         * set css for instance
         * if container not appended
        */
        if(!this.appended) {
            this.container.style.height = this.options.height + 'px';
            this.container.style.backgroundColor = 'orange';
            this.container.style.position = 'relative';
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
        max: 10,
        height: 2,
        value: [3]
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
        },
        /* --------
         * Extend of object
        */
        extend: function () {
            var target = arguments[0];

            if (typeof target !== 'object') {
                return;
            }

            for (var i = 1; i < arguments.length; i++) {
                for(var name in arguments[i]) {
                    target[name] = arguments[i][name];
                }
            }

            return target;
        },
        /* --------
         * Add value
        */
        addValue: function (value) {
            if (value < this.options.min || value > this.options.max) {
                return false;
            }

            var l = this.options.value.length;
            while (l){
                if (this.options.value[--l] === value) {

                    return false;
                }
            }

            this.options.value.push(value);

            return true;
        }
        // refresh: function () {
            // remove all carrets elements
            // create create new carrets elements
        // },
        // getValue: function () {
        //     return this.options.value;
        // },
        // destroy: function () {
            // destroy all events, html
        // }
    };

    Range = RangeJS;

// })()