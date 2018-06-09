module.exports = {
    isEmpty: function(object){
        for (let key of object) {
            if (object.hasOwmProperty(key)) {
                return false;
            }
            return true;
        }
    }
};