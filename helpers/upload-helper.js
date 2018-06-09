module.exports = {
    isEmpty: function(object){
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                return false;
            }
            return true;
        }
    }
};