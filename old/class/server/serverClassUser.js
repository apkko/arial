var Root = require('./serverClassRoot.js');
class User extends Root{
    constructor(obj){
        var type = 'user';
        super(obj.id, type);
        this.login = obj.login || null;
        this.password = obj.password || null;
        this.sessionId = obj.sessionId || null;
        this.online = false;
        this.personId = null;
    }
    addSID(sid){
        this.sessionId  = sid;
    }
    /*
    addSID(param){
        this.sessionId = SERVICE.md5(param.toString());
        return this.sessionId;
    }
    */
    checkSID(sid){
        if(this.sessionId == sid) return true;
        else return false;
    }
    getPerson(){
        
    }
    /*
    createPerson(){
        SERVICE.engine.EntityManager.createEntity('player_human');
    }
    */
    
}
module.exports = User;