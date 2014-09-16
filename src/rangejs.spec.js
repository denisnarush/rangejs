describe("Instance", function() {
    it("RangeIt is instanceof Range", function() {
        var RangeIt = new Range();
        expect(RangeIt instanceof Range).toBeTruthy();
    });

    // it("RangeIt is instanceof Range", function() {
    //     var RangeIt = new Range(document.createElement('div'));
    //     expect(RangeIt instanceof Range).toBeTruthy();
    // });
});

describe("Constructor default options", function() {
    it("Range must have default options", function() {
        expect(RangeJS.defaults).not.toEqual(undefined);
    });

    it("Range default must be an Object", function() {
        expect(typeof RangeJS.defaults).toEqual('object');
    });

    it("Range default can't be empty", function() {
        expect(RangeJS.defaults).not.toEqual({});
    });

    it("Range default MIN value can't be empty", function() {
        expect(RangeJS.defaults.min).not.toEqual(undefined);
    });

    it("Range default MIN value must be a Number", function() {
        expect(typeof RangeJS.defaults.min).toEqual('number');
    });

    it("Range default MAX value can't be empty", function() {
        expect(RangeJS.defaults.max).not.toEqual(undefined);
    });

    it("Range default MAX value must be a Number", function() {
        expect(typeof RangeJS.defaults.max).toEqual('number');
    });

    it("Range default MIN value must be less then MAX value", function() {
        expect(RangeJS.defaults.min < RangeJS.defaults.max).toBeTruthy();
    });

    // it("Range default destroy", function() {
    //     expect(typeof RangeJS.prototype.destroy).toEqual('function');
    // });

    // it("Range default getValue", function() {
    //     expect(typeof RangeJS.prototype.getValue).toEqual('function');
    // });

    // it("Range default destroy", function() {
    //     RangeJS.prototype.destroy();
    // });
});