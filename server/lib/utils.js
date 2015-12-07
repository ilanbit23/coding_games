var extend = require('util')._extend;
var fs = require('fs');
global.cl = function() {console.log.apply(console,arguments);}

var cache = {};
exports.getObjList = function(objType) {
    if (!cache[objType]) {

        try {
            var filePath = 'server/data/' + objType + '/list.json';
            cache[objType] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch(e) {
            cl(e);
            cl('Unknown Resources, make sure you have a list.json file inside the <resource-name> folder'.red);
            cache[objType] = [];
        }
        // cl("Loaded from file: " + objType);
    }//  else cl("List found in Memory:" + objType);
    return cache[objType];
};


exports.findIndexForId = function(objs, id) {
		for (var i=0; i<objs.length; i++) {
			if (objs[i].id == id) return i;
		}
        return -1;
};

exports.findNextId = function(objs) {
	var nextId = 0;
	for (var i=0; i<objs.length; i++) {
		if (objs[i].id > nextId) nextId = objs[i].id;
	}
	return nextId+1;
};


exports.addObj = function(objs, obj) {
			objs.push(obj);
};

exports.updateObj = function(objs, obj) {
	var index = this.findIndexForId(objs, obj.id)
    if (index === -1) return {};
    objs[index] = extend(objs[index], obj);
    return objs[index];
};

exports.deleteObj = function(objs, id) {
	var index = this.findIndexForId(objs, id);
    if (index === -1) return {};
    objs.splice(index, 1);
};
