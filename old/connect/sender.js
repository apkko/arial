class Sender{
    constructor(){
        /*
        ///Нормально время задержки отправки информации пользователям
        this.normalDelta = 100;
        ///Долгое время задержки отправки информации пользователям
        this.badDelta = this.normalDelta + 20;
        ///Последнее время
        this.lastTime;
        ///задержка
        this.delta;
        ///Текущее время
        this.currentTime;
        */
    }
    /*
    start(){
        
        var that = this;
        SERVICE.logger.debugLog("Sender is started...");
        this.lastTime = Date.now(); 
        setImmediate(this.sendLoop);
        
    }
    */
    ///Отправка данных клиенту
    sendData(client,data){
        
        client.socket.emit('data',data);
        //SERVICE.logger.debugLog('Send data to Client['+client.socket.id+']:'+JSON.stringify(data));
        
    }
    /*
    sendLoop(){
        
        SERVICE.sender.currentTime = Date.now();
        SERVICE.sender.delta  = SERVICE.sender.currentTime - SERVICE.sender.lastTime; 
        if (SERVICE.sender.delta >= SERVICE.sender.normalDelta){
            if (SERVICE.sender.delta >= SERVICE.sender.badDelta){
                SERVICE.logger.debugLog('Долгая задержка отправки: '+SERVICE.sender.delta+' мсек.');}

            SERVICE.sender.lastTime = SERVICE.sender.currentTime;
            ///Запуск обновляльщика
            ///Запуск сборщика
            
            SERVICE.collector.collectAllData(function(){
                ///Как только собрали все данные
                ///Отправляем все данные всем пользователям
                SERVICE.sender.sendDataToAllUser();
            });
            
        }
        setImmediate(SERVICE.sender.sendLoop);
    }
    */
    ///Полная отправка данных клиенту
    sendDataToAllUser(){
       for(let i in SERVICE.keeper.clientArray)
        {
            let client = SERVICE.keeper.clientArray[i];
            
            if(client.user){
                SERVICE.handler.sendFullData(client,client.sendData.prepeareSendData());
                ///Проверяем нужно ли отправлять информацию о тайлах (карте)
                if(!client.sendData.tileMapData.isSended){
                    SERVICE.handler.sendTileMapData(client,client.sendData.prepeareTileMapData());
                }
                    
            }
           
        }
 
    }
}

module.exports = Sender;