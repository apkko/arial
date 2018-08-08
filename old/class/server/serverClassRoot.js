class Root{
    constructor(id,type){
        //console.log('ID:'+id)
        if(id)
        this.id = id;
        else
        {
            this.id = this.addId(type);
                //console.log('NEWID:'+this.id)
        }
        
        this.type = type;
    }
    addId(type)
    {
        let newId;
        //console.log('Type:'+type);
        switch(type){
            case 'image':
                newId = (this.getMaxValueId(SERVICE.keeper.imageArray) + 1)
                return  newId;
                break;
            case 'spritesheet':
                newId = (this.getMaxValueId(SERVICE.keeper.spritesheetArray) + 1);
                return newId;
                break;
            case 'client':
                newId = (this.getMaxValueId(SERVICE.keeper.clientArray) + 1);
                return newId;
                break;
            case 'user': 
                newId = (this.getMaxValueId(SERVICE.keeper.userArray) + 1);
                return newId;
                break;
            case 'creature':             
                newId = (this.getMaxValueId(SERVICE.keeper.creatureArray) + 1);
                return newId;
                break;
                /*
            case 'person':             
                newId = (this.getMaxValueId(SERVICE.keeper.personArray) + 1);
                return newId;
                break;
                */
            case 'object': 
                newId = (this.getMaxValueId(SERVICE.keeper.objectArray) + 1);
                return newId;
                break;
            case 'cell':
                 newId = (this.getMaxValueId(SERVICE.keeper.cellArray) + 1);
                return newId;
                break;
            case 'tile':
                 newId = (this.getMaxValueId(SERVICE.keeper.tileArray) + 1);
                return newId;
                break;
            case 'zone':
                 newId = (this.getMaxValueId(SERVICE.keeper.map) + 1);
                return newId;
                break;
               }
    }
    getMaxValueId(array){
        var max = 0;
        for(let i in array){        
            // переберем весь массив
            // если элемент больше, чем в переменной, то присваиваем его значение переменной
            if (max < array[i].id) max = array[i].id;         
        }
        // возвращаем максимальное значение
        return max;
    }
}
module.exports = Root;