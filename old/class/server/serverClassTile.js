var Root = require('./serverClassRoot.js');
class Tile extends Root{
    constructor(obj){
        var type = 'tile';
        super(obj.id, type)
        this.imageKey = obj.imageKey;
        this.frame = obj.frame;
    }
}
module.exports = Tile;