var Root = require('./serverClassRoot.js');
class Spritesheet extends Root{
    constructor(obj){
        super(obj.id, 'spritesheet');
        this.key = obj.key || null;
        this.path = obj.path || null;
        this.wFrame =  obj.wFrame || null;
        this.hFrame =  obj.hFrame || null;
    }
    update(obj){
        if(obj.key)
            this.key = obj.key;
        if(obj.path)
            this.path = obj.path;
        if(obj.wFrame)
            this.wFrame = obj.wFrame;
        if(obj.hFrame)
            this.hFrame = obj.hFrame;
    }
    
}
module.exports = Spritesheet;