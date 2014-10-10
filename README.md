range
=====
```bash
RangeJS.defaults = {
    min: 0,
    max: 10,
    height: 2,
    value: [3, 7.35]
};
```
Можно посмотреть на [dropbox'e](http://dl.dropboxusercontent.com/u/28323090/rangejs/index.html)

usage
=====
add to head:
```bash
<script type="text/javascript" src="src/rangejs.js"></script>
```

add to body:
```bash
<div id="RangeIt"></div>
```
create instance:
```bash
<script type="text/javascript">
	var RangeIt = new RangeJS("#RangeIt");
</script>
```

npm
=====
install dependency to run karma
```bash
$ cd rangejs/
$ npm install
```

run karma
=====
```bash
$ cd rangejs/node_modules/karma/bin/
$ ./karma start ../../../karma-config.js
```

coverage
=====
open coverage.html
```bash
rangejs/coverage/{browser}/
```