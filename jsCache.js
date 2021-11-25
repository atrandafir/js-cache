var jsCache = new function () {

	this.enableLogging = false;

	// json object where to store data
	this._data = {};

	this.get = function (key, defaultValue) {
		this.log('getting key:' + key);
		if (typeof (this._data[key]) !== 'undefined') {
			var item = this._data[key];
			if (item.expire === 0 || item.expire > this.time()) {
				this.log('got value:');
				this.log(item.value);
				return item.value;
			} else {
				this.log('remove expired item: ' + key);
				this.deleteValue(key);
			}
		}
		this.log('no value, returning default:');
		this.log(defaultValue);
		return defaultValue;
	};

	this.set = function (key, value, expire) {
		this.log('setting key:' + key);
		this.deleteValue(key);
		this.addValue(key, value, expire);
	};

	this.deleteValue = function (key) {
		if (typeof (this._data[key]) !== 'undefined') {
			delete this._data[key];
		}
		this.log('deleting key:' + key);
		this.saveToLocalStorage();
	};
	this.addValue = function (key, value, expire) {
		if (expire > 0) {
			expire += this.time();
		} else {
			expire = 0;
		}
		this._data[key] = {
			'value': value,
			'expire': expire
		};
		this.log('adding key:' + key + ' expire:' + expire);
		this.log('value:');
		this.log(value);
		this.saveToLocalStorage();
	};
	this.time = function () {
		var ts = Math.round((new Date()).getTime() / 1000);
		return ts;
	};
	this.deserialize = function (object) {
		return typeof object === 'string' ? JSON.parse(object) : object;
	};
	this.stringify = function (value) {
		return JSON.stringify(value);
	};
	this.restoreFromLocalStorage = function () {
		this.log('restoring localStorage.jsCache');
		if (typeof (localStorage.jsCache) !== 'undefined') {
			this._data = this.deserialize(localStorage.jsCache);
			this.log(localStorage.jsCache);
			this.log(this._data);
		} else {
			this.log('localStorage.jsCache is empty');
		}
	};
	this.saveToLocalStorage = function () {
		localStorage.jsCache = this.stringify(this._data);
		this.log("updating local storage");
		this.log(this._data);
		this.log(localStorage.jsCache);
	};
	this.log = function (msg) {
		if (this.enableLogging) {
			console.log(msg);
		}
	};
};
