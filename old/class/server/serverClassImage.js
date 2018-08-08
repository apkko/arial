var Root = require('./serverClassRoot.js');
class Image extends Root{
    constructor(obj){
        super(obj.id, 'image');
        this.key = obj.key || null;
        this.path = obj.path || null;
    }
    update(obj){
        if(obj.key)
            this.key = obj.key;
        if(obj.path)
            this.path = obj.path;
    }
    
}
module.exports = Image;