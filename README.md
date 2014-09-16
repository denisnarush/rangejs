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

npm
=====
install dependency to run karma
```bash
cd rangejs/
npm install
```

run karma
=====
```bash
cd rangejs/node_modules/karma/bin/
./karma start ../../../karma.js
```

coverage
=====
open coverage.html
```bash
rangejs/coverage/{browser}/
```