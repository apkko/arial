class SendData{
    constructor(){
        ////Данные которые обновляются только если в них есть чтото новое

        this.person = null;
        this.personOldX = null;
        this.personOldY = null;
        this.personCurrentZoneId = null;
        this.creatures = [];
        this.objects =  [];
        this.tileMapData ={
            data: null,
            needToSend:false,
            isSended: false,
        }; 
    }
    prepeareSendData(){
        let data ={
            person:null,
            creatures:null,
            objects:null
        }
        data.creatures = this.creatures;
        data.objects = this.objects;
        data.person = this.person;
        return data;
    }
    prepeareTileMapData(){
        let data ={
            tileMap:null,
        }
        if(this.tileMapData.needToSend){
            data.tileMap = this.tileMapData.data;
            this.tileMapData.isSended = true;
        }
        return data;
    }
}
module.exports = SendData;