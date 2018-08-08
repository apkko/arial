//template
class TEntity {
    constructor(id,name){
        this.id = id;
        this.entityTemplateName = name;
        ///массив компонентов
        this.components = [];
    }
    //активирование сущности
    activate(){
        
    }
    addComponent(component){
        if(component)
            this.components.push(component);
    }
    getComponentOld(type){
        for(let i in this.components){
            if(this.components[i] instanceof type)
                return this.components[i];
        }
        return false;
    }
    getComponent(componentName){
        for(let i in this.components){
            if(this.components[i].componentName == componentName)
                return this.components[i];
        }
        return false;
    }
    //Передаем массив названий компонентов, если все они есть у этой сущьности возвращаем true
    hasComponents(componentNamesArray){
        let count = 0;
        for(let i in componentNamesArray){
            for(let j in this.components){
                if(componentNamesArray[i] == this.components[j].componentName){
                    count++;
                }
            }
        }
        if(componentNamesArray.length == count)
            return true;
        else
            return false;
    }
    //Есть ли компонент у сущности (по имени)
    hasComponent(componentName){
        for(let i in this.components){
            if(this.components[i].componentName == componentName){
                return true;
            }
        }
        return false;
    }
    removeComponent(componentName){
        for(let i in this.components){
            if(this.components[i].componentName == componentName){
                this.components.splice(i,1)
                return true;
            }
        }
        return false;
    }
}
//Сущность (любой игровой объект) ни к чему доступ не нужен
class Entity extends TEntity{
    constructor(id){
        super(id);
        this.entityTemplateId = null; 
    } 
    addEntityTemplateId(entityTemplateId){
        this.entityTemplateId = entityTemplateId;
    }
}



module.exports.Entity = Entity;
module.exports.TEntity = TEntity;