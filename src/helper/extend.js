var extend = function (target) {
	for (var i = 1, len = arguments.length; i < len; i++) {
		var source = arguments[i];
		if (source) {
			for (var prop in source) {
				target[prop] = source[prop];
			}
		}
	}
	return target;
};

