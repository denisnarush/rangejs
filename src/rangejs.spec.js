describe("Instance", function() {

    it("1. RangeIt is instanceof Range", function() {
        var RangeIt = new Range();

        expect(RangeIt instanceof Range).toBe(true);
    });

    it("1.1 Element parameter can be empty", function() {
        var RangeIt = new Range();

        expect(RangeIt instanceof Range).toBe(true);
    });

        it("1.1.1 When element is empty create default container", function() {
            var RangeIt = new Range();

            expect(RangeIt.container).toBeDefined();
        });

    it("1.2 Element parameter can be String", function() {
        var el = document.createElement('div');
        document.body.appendChild(el);

        var RangeIt = new Range('div');
        expect(RangeIt.container).toBeDefined();
    });

        it("1.2.1 Create default element if query by it is empty", function() {
            var RangeIt = new Range('query');

            expect(RangeIt.container).toBeDefined();
        });

        it("1.2.2 Don't create instance if query throw error", function() {
            var RangeIt = new Range('.');

            expect(RangeIt instanceof Range).toBe(false);
        });

        it("1.2.3 Don't create instance if HTML or BODY tag passed", function() {
            var RangeIt,
                bodyEl = document.querySelector('body'),
                htmlEl = document.querySelector('html');

            RangeIt = new Range('body');
            expect(RangeIt instanceof Range).toBe(false);

            RangeIt = new Range('html');
            expect(RangeIt instanceof Range).toBe(false);

            RangeIt = new Range(bodyEl);
            expect(RangeIt instanceof Range).toBe(false);

            RangeIt = new Range(htmlEl);
            expect(RangeIt instanceof Range).toBe(false);
        });

    it("1.3 Element parameter can be new DOM Element", function() {
        var el = document.createElement('div');
        document.body.appendChild(el);

        var RangeIt = new Range(el);

        expect(RangeIt.container).toBeDefined();
    });

    it("1.4 Options parameter must be Object", function() {
        var RangeIt = new Range(document.createElement('div'), {});
        expect(RangeIt.options).toBeDefined();
    });

});

describe("Constructor default options", function() {
    it("2.1 Range must have default options", function() {
        expect(RangeJS.defaults).toBeDefined();
    });

    it("2.2 Range default must be an Object", function() {
        expect(typeof RangeJS.defaults).toEqual('object');
    });

    it("2.3 Range default can't be empty", function() {
        expect(RangeJS.defaults).not.toEqual({});
    });

    it("2.4 Range default must contains MIN value", function() {
        expect(RangeJS.defaults.min).toBeDefined();
    });

    it("2.5 Range default MIN value must be a Number", function() {
        expect(typeof RangeJS.defaults.min).toEqual('number');
    });

    it("2.6 Range default must contains MAX value", function() {
        expect(RangeJS.defaults.max).toBeDefined();
    });

    it("2.7 Range default MAX value must be a Number", function() {
        expect(typeof RangeJS.defaults.max).toEqual('number');
    });

    it("2.8 Range default MIN value must be less then MAX value", function() {
        expect(RangeJS.defaults.min < RangeJS.defaults.max).toBe(true);
    });
});

describe("Instance methods", function() {
    it("3.1 Append container method", function() {
        var RangeIt = new Range();

        expect(RangeIt.appendContainer).toBeDefined();
    });

        it("3.1.1 When parameter is empty it returns false", function() {
            var RangeIt = new Range();

            expect(RangeIt.appendContainer()).toBe(false);
        });

        it("3.1.2 Parameter can be a String", function() {
            var RangeIt = new Range();

            expect(RangeIt.appendContainer('body')).toBe(true);
        });

        it("3.1.3 Parameter can be a DOM element", function() {
            var el = document.createElement('div');
            document.body.appendChild(el);

            var RangeIt = new Range();

            expect(RangeIt.appendContainer(el)).toBe(true);
        });

        it("3.1.4 If parameter not String and not Element it returns false", function() {
            var RangeIt = new Range();

            expect(RangeIt.appendContainer([])).toBe(false);
            expect(RangeIt.appendContainer({})).toBe(false);
        });

        it("3.1.5 We can't append twice", function() {
            var RangeIt = new Range();

            expect(RangeIt.appendContainer('body')).toBe(true);
            expect(RangeIt.appendContainer('body')).toBe(false);
        });

        it("3.1.6 When instance created with new Element parameter we can append", function() {
            var el = document.createElement('div');

            var RangeIt = new Range(el);

            expect(RangeIt.appended).toBe(false);
            expect(RangeIt.appendContainer('body')).toBe(true);
        });

        it("3.1.7 When instance created with queried Element parameter we can't append", function() {
            var el = document.createElement('div');
            document.body.appendChild(el);

            var RangeIt = new Range(el);

            expect(RangeIt.appended).toBe(true);
            expect(RangeIt.appendContainer('body')).toBe(false);
        });

        it("3.1.8 When instance created with String parameter we can't append if queried by it", function() {
            var el = document.createElement('div');
            document.body.appendChild(el);

            var RangeIt = new Range('div');

            expect(RangeIt.appended).toBe(true);
            expect(RangeIt.appendContainer('body')).toBe(false);
        });

    it("3.2 Extend method", function() {
        var RangeIt = new Range();

        expect(RangeIt.extend).toBeDefined();
    });
        it("3.2.1 Argument must be an Object", function() {
            var RangeIt = new Range();

            expect(RangeIt.extend('s')).toBeUndefined();
            expect(RangeIt.extend(1)).toBeUndefined();
        });

        it("3.2.2 Must return an Object", function() {
            var RangeIt = new Range();

            expect(typeof RangeIt.extend({})).toEqual('object');
        });

        it("3.2.3 Returned object can't be equal of any argument", function() {
            var RangeIt = new Range();
            var obj = {a: 1};

            expect(typeof RangeIt.extend({a: 1}, obj)).not.toEqual(obj);
            expect(typeof RangeIt.extend(obj, {a: 1})).not.toEqual(obj);
            expect(typeof RangeIt.extend(obj, obj)).not.toEqual(obj);
        });

    it("3.3 Add value method", function() {
        var RangeIt = new Range();

        expect(RangeIt.addValue).toBeDefined();
    });
        it("3.3.1 Argument must be a Number", function() {
            var RangeIt = new Range();

            expect(RangeIt.addValue(1)).toBe(true);
            expect(RangeIt.addValue("1")).toBe(false);
            expect(RangeIt.addValue({value: 1})).toBe(false);
        });

        it("3.3.2 Can't be less then Min or more then Max", function() {
            var RangeIt = new Range();

            expect(RangeIt.addValue(1)).toBe(true);
            expect(RangeIt.addValue(0)).toBe(true);
            expect(RangeIt.addValue(10)).toBe(true);
            expect(RangeIt.addValue(-1)).toBe(false);
            expect(RangeIt.addValue(11)).toBe(false);
        });

        it("3.3.3 Don't add new value if this value is exist", function() {
            var RangeIt = new Range();

            expect(RangeIt.addValue(1)).toBe(true);
            expect(RangeIt.addValue(1)).toBe(false);
        });
});






