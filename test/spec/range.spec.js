(function () {
  describe('RangeJS', function () {
    var r;
    beforeEach(function () {
      r = new Range();
    })
    // constructor

    describe('constructor', function () {

      it('class', function () {
        expect(window.Range).toBeDefined();
      });

      it('instanceof', function () {
        expect(r instanceof Range).toBe(true);
      });

    });
  })
}());