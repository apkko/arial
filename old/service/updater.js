class Updater {
    constructor(){
    }
    allUpdate(){
        this.creaturesUpdate();
        ///Тут обновления всего
        ///Обновление существ
        ///Обновление предметов
        ///Обновление объектов
        ///Обновлене карты
        
        ///Обновление погоды и т.п.
    }
    creaturesUpdate(){
        for(let i in SERVICE.keeper.creatureArray){
            SERVICE.keeper.creatureArray[i].update();
        }
        
    }
}
module.exports = Updater;