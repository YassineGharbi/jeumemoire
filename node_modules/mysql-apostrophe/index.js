function handle(req,res,next){
	req.body=m(req.body);
    next();
}

var m = function n(o,cb) {
    return Object.keys(o).reduce(function(newObj, key) {
        var value = o[key];
        if (value !== null && typeof value === 'object') {
           newObj[key] = n(value);
        } else if(typeof value == 'string' && !IsJsonString(value) ) {
           newObj[key] = value.trim().replace(/'/g, "\\'");
        }else{
    		newObj[key] = value;
        }
        return newObj;
    }, {});
};

function IsJsonString(str){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = handle;