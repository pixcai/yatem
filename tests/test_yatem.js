var test = require('tape');
var yatem = require('..');

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
	var on0 = yatem.on('testOn', onCallback0);
	var on1 = yatem.on('testOn', onCallback1);
	var onc0 = yatem.once('testOn', onCallback0)
	var once0 = yatem.once('testOnce', onceCallback0);
	var once1 = yatem.once('testOnce', onceCallback1);
	var onc1 = yatem.on('testOnce', onceCallback0)

	t.deepEqual(on0, { name: 'testOn', handler: 0 });
	t.deepEqual(on1, { name: 'testOn', handler: 1 });
	t.equal(onc0, false);
	t.deepEqual(once0, { name: 'testOnce', handler: 0 });
	t.deepEqual(once1, { name: 'testOnce', handler: 1 });
	t.equal(onc1, false);

	t.comment('emit `testOn`');
	yatem.emit('testOn');
	t.comment('emit `testOn` again');
	yatem.emit('testOn');

	t.equal(typeof yatem.off(on0), 'function');
	t.comment('emit `testOn` after off on0');
	yatem.emit('testOn');
	t.equal(typeof yatem.off(on1), 'function');

	t.equal(yatem.off(onc0), false);
	yatem.emit('testOn');
	t.equal(yatem.off('testOn'), false);

	t.equal(typeof yatem.off(once0), 'function');
	t.comment('emit `testOnce`');
	yatem.emit('testOnce');
	t.equal(yatem.off(once1), false);
	t.comment('emit `testOnce` again');
	yatem.emit('testOnce');
	t.equal(yatem.off('testOnce'), false);

	t.end();
});
