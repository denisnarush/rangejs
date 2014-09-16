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
        RangeIt = new Range('body');

        expect(RangeIt.container).toBeDefined();
    });

        it("1.2.1 Create default element if query by it is empty", function() {
            RangeIt = new Range('query');

            expect(RangeIt.container).toBeDefined();
        });

    it("1.3 Element parameter can be queried DOM Element or new DOM Element", function() {
        RangeIt = new Range(document.querySelector('body'));
        expect(RangeIt.container).toBeDefined();

        RangeIt = new Range(document.createElement('div'));
        expect(RangeIt.container).toBeDefined();
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

        it("3.1 When parameter is empty it returns false", function() {
            RangeIt = new Range();

            expect(RangeIt.append()).toBeFalsy();
        });

        it("3.1 Parameter can be a String", function() {
            RangeIt = new Range();

            expect(RangeIt.append('body')).toBeTruthy();
        });

        it("3.2 Parameter can be a DOM element", function() {
            RangeIt = new Range();

            expect(RangeIt.append(document.createElement('div'))).toBeTruthy();
        });

        it("3.3 If parameter not String and not Element it returns false", function() {
            RangeIt = new Range();

            expect(RangeIt.append([])).toBeFalsy();
        });

        it("3.4 We can't append twice", function() {
            RangeIt = new Range();

            expect(RangeIt.append('body')).toBeTruthy();
            expect(RangeIt.append('body')).toBeFalsy();
        });

        it("3.4 When instance created with new Element parameter we can append", function() {
            var el = document.createElement('div');
            RangeIt = new Range(el);

            expect(RangeIt.append('body')).toBeTruthy();
        });

        it("3.4 When instance created with queried Element parameter we can append", function() {
            var el = document.querySelector('body');
            RangeIt = new Range(el);

            expect(RangeIt.append('body')).toBeFalsy();
        });

        it("3.4 When instance created with String parameter we can't append", function() {
            RangeIt = new Range('body');

            expect(RangeIt.append('body')).toBeFalsy();
        });
});






