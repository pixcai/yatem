var test = require('tape');
var yate = require('..');

var onCallback0 = function () {
	console.log('on 0 emitted!');
};

var onCallback1 = function () {
	setTimeout(function () {
		console.log('on 1 emitted!');
	});
};

var onceCallback0 = function () {
	console.log('once 0 emitted!');
};

var onceCallback1 = function () {
	setTimeout(function () {
		console.log('once 1 emitted!');
	});
};

test('test', function (t) {
	var on0 = yate.on('testOn', onCallback0);
	var on1 = yate.on('testOn', onCallback1);
	var once0 = yate.once('testOnce', onceCallback0);
	var once1 = yate.once('testOnce', onceCallback1);

	t.deepEqual(on0, { event: 'testOn', handler: 0 });
	t.deepEqual(on1, { event: 'testOn', handler: 1 });
	t.deepEqual(once0, { event: 'testOnce', handler: 0 });
	t.deepEqual(once1, { event: 'testOnce', handler: 1 });

	t.comment('emit `testOn`');
	yate.emit('testOn');
	t.comment('emit `testOn` again');
	yate.emit('testOn');

	t.equal(yate.off(on0), onCallback0);
	t.comment('emit `testOn` after off on0');
	yate.emit('testOn');

	yate.off('testOn');
	t.throws(function () {
		yate.emit('testOn');
	}, /undefined/, 'emit `testOn` after off `testOn`');

	t.comment('emit `testOnce`');
	yate.emit('testOnce');
	t.throws(function () {
		yate.emit('testOnce');
	}, /undefined/, 'emit `testOnce` again');
	
	t.end();
});
