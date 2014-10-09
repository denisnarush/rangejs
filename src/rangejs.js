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
         * extend default options
        */
        if (typeof options === 'object') {
            this.options = this.extend({}, RangeJS.defaults, options);
        }


        /* --------
         * instance container
        /* --------
         * instance container
         * is not appended to the DOM
        */
        this.appended = false;

        /* --------
         * default DOM element
         * if 'element' attribute not
        */
        this.container = document.createElement('div');

        /* --------
         * if 'element' is String
        */
        if (typeof element === 'string') {
            try {
                element = document.querySelector(element) || this.container;
            }
            catch(error) {
                console.error('Wrong argument for query element.');
                return {};
            }
        }

        /* --------
         * if 'element' is DOM Element
        */
        if (element instanceof Element) {

            if (element.tagName === 'HTML' || element.tagName === 'BODY') {
                console.error('Element ' + element.tagName + ' can\'t be a container.');
                return {};
            }

            this.appended = !!(element.parentNode || element.parentElement);
        }

        this.container = element || this.container;

        /* --------
         * set attribute for container
        */
        this.container.setAttribute('data-rangejs', '');

        /* --------
         * set css for instance
        */
        this.container.style.height = this.options.height + 'px';
        this.container.style.backgroundColor = 'orange';
        this.container.style.position = 'relative';


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

                    if (arguments[i][name] instanceof Array) {
                        target[name] = [];
                        for (var j = 0; j < arguments[i][name].length; j++){
                            target[name].push(arguments[i][name][j]);
                        }
                    }
                }
            }

            return target;
        },
        /* --------
         * Add value
        */
        addValue: function (value) {
            if (typeof value !== 'number') {
                return false;
            }

            if (value < this.options.min || value > this.options.max) {
                return false;
            }

            var count = this.options.value.length;

            while (count){
                if (this.options.value[--count] === value) {
                    return false;
                }
            }

            this.options.value.push(value);

            return true;
        }
        // getValue: function () {
        //     return this.options.value;
        // },
        // refresh: function () {
            // remove all carrets elements
            // create create new carrets elements
        // },
        // destroy: function () {
            // destroy all events, html
        // }
    };

    Range = RangeJS;

// })()