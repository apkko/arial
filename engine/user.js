class User {
    constructor(obj){
        this.id = obj.id;
        this.login = obj.login || null;
        this.password = obj.password || null;
        this.sessionId = obj.sessionId || null;
        this.online = false;
        this.person = null;
    }
    addSID(sid){
        this.sessionId  = sid;
        return this.sessionId;
    }
    addEntity(entity){
        this.person = entity;
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
    //Проверить пароль
    checkPassword(password){
        if(this.password == password)
            return true;
        else return false;
    }
    getPerson(){
        if(this.entityId != null){
            
        }
    }
    setOnline(){
        this.online = true;
    }
    setOffline(){
        this.online = false;
    }
    /*
    createPerson(){
        SERVICE.engine.EntityManager.createEntity('player_human');
    }
    */
    
}
module.exports = User;