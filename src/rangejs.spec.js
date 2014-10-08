describe("Instance", function() {
    var RangeIt;

    it("1. RangeIt is instanceof Range", function() {
        RangeIt = new Range();

        expect(RangeIt instanceof Range).toBeTruthy();
    });

    it("1.1 Element parameter can be empty", function() {
        RangeIt = new Range();

        expect(RangeIt instanceof Range).toBeTruthy();
    });

        it("1.1.1 When element is empty create default container", function() {
            RangeIt = new Range();

            expect(RangeIt.container).toBeDefined();
        });

    it("1.2 Element parameter can be String", function() {
        var el = document.createElement('div');
        document.body.appendChild(el);

        RangeIt = new Range('div');
        expect(RangeIt.container).toBeDefined();
    });

        it("1.2.1 Create default element if query by it is empty", function() {
            RangeIt = new Range('query');

            expect(RangeIt.container).toBeDefined();
        });

        it("1.2.2 Don't create instance if query throw error", function() {
            RangeIt = new Range('.');

            expect(RangeIt instanceof Range).toBe(false);
        });

    it("1.3 Element parameter can be new DOM Element", function() {
        var el = document.createElement('div');
        document.body.appendChild(el);

        RangeIt = new Range(el);

        expect(RangeIt.container).toBeDefined();
    });

    it("1.4 Options parameter must be Object", function() {
        RangeIt = new Range(document.createElement('div'), {});
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
        expect(RangeJS.defaults.min < RangeJS.defaults.max).toBeTruthy();
    });
});

describe("Instance methods", function() {
    it("3.1 Append method", function() {
        RangeIt = new Range();

        expect(RangeIt.append).toBeDefined();
    });

        it("3.1.1 When parameter is empty it returns false", function() {
            RangeIt = new Range();

            expect(RangeIt.append()).toBeFalsy();
        });

        it("3.1.2 Parameter can be a String", function() {
            RangeIt = new Range();

            expect(RangeIt.append('body')).toBe(true);
        });

        it("3.1.3 Parameter can be a DOM element", function() {
            var el = document.createElement('div');
            document.body.appendChild(el);

            RangeIt = new Range();

            expect(RangeIt.append(el)).toBe(true);
        });

        it("3.1.4 If parameter not String and not Element it returns false", function() {
            RangeIt = new Range();

            expect(RangeIt.append([])).toBeFalsy();
        });

        it("3.1.5 We can't append twice", function() {
            RangeIt = new Range();

            expect(RangeIt.append('body')).toBe(true);
            expect(RangeIt.append('body')).toBe(false);
        });

        it("3.1.6 When instance created with new Element parameter we can append", function() {
            var el = document.createElement('div');

            RangeIt = new Range(el);

            expect(RangeIt.appended).toBe(false);
            expect(RangeIt.append('body')).toBe(true);
        });

        it("3.1.7 When instance created with queried Element parameter we can't append", function() {
            var el = document.createElement('div');
            document.body.appendChild(el);

            RangeIt = new Range(el);

            expect(RangeIt.appended).toBe(true);
            expect(RangeIt.append('body')).toBe(false);
        });

        it("3.1.8 When instance created with String parameter we can't append if queried by it", function() {
            var el = document.createElement('div');
            document.body.appendChild(el);

            RangeIt = new Range('div');

            expect(RangeIt.appended).toBe(true);
            expect(RangeIt.append('body')).toBe(false);
        });

    it("3.2 Extend method", function() {
        RangeIt = new Range();

        expect(RangeIt.extend).toBeDefined();
    });
        it("3.2.1 Target must be an Object", function() {
            RangeIt = new Range();

            expect(RangeIt.extend('s')).toBeUndefined();
        });

        it("3.2.2 Must return an Object", function() {
            RangeIt = new Range();

            expect(typeof RangeIt.extend({})).toEqual('object');
        });

        it("3.2.3 Returned object can't be equal of any argument", function() {
            RangeIt = new Range();

            expect(typeof RangeIt.extend({a: 1}, {a: 1})).not.toEqual({a: 1});
        });
});






