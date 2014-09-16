range
=====
```bash
RangeJS.defaults = {
    min: 0,
    max: 10
};
```
Можно посмотреть на [dropbox'e](http://dl.dropboxusercontent.com/u/28323090/rangejs/index.html)

usage
=====
add to html:
```bash
<div id="rangeId"></div>
<script type="text/javascript" src="src/rangejs.js"></script>
```

create instance:
```bash
var RangeIt = new RangeJS(document.getElementById('RangeIt'));
```

karma
=====
```bash
cd node_modules/karma/bin/
./karma start ../../../karma.js
```

coverage
=====
```bash
rangejs/coverage/
```