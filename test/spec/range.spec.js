(function () {
  describe('Range', function () {
    var r;
    var el;

    beforeEach(function () {
      el = document.createElement('div');
      el.setAttribute('id', 'test');
      document.body.appendChild(el);
      r = new Range('#test');
    })

    afterEach(function() {
      el.parentNode.removeChild(el);
    });

    // constructor
    describe('constructor', function () {

      it('class', function () {
        expect(window.Range).toBeDefined();
      });

      it('instanceof', function () {
        expect(r instanceof Range).toBe(true);
      });

    });

    describe('extend', function () {
      it('must be defined', function () {
        expect(r.extend).toBeDefined();
      });
    });

    // describe('extend', function () {
    //   it('with empty options must return defaults', function () {
    //     var opt;
    //       opt = extend({},RangeJS.defaults);
    //     expect(opt).toEqual(RangeJS.defaults);
    //   });
    // });
  })

}());