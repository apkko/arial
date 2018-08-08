class Gamer{
    constructor(){
        ///Нормально время задержки обновления игры
        this.normalDelta = 100;
        ///Долгое время задержки обновления игры
        this.badDelta = this.normalDelta + 20;
        ///Последнее время
        this.lastTime;
        ///задержка
        this.delta;
        ///Текущее время
        this.currentTime;
    }
    start(){
        
        var that = this;
        SERVICE.logger.debugLog("Gamer is started...");
        this.lastTime = Date.now(); 
        setImmediate(this.gameLoop);
        
    }
    ///Глобальный цикл игры
    gameLoop(){
        
        SERVICE.gamer.currentTime = Date.now();
        SERVICE.gamer.delta  = SERVICE.gamer.currentTime - SERVICE.gamer.lastTime; 
        if (SERVICE.gamer.delta >= SERVICE.gamer.normalDelta){
            if (SERVICE.gamer.delta >= SERVICE.gamer.badDelta){
                SERVICE.logger.debugLog('Долгая задержка отправки: '+SERVICE.gamer.delta+' мсек.');}

            SERVICE.gamer.lastTime = SERVICE.gamer.currentTime;
            ///Запуск обновляльщика
            SERVICE.updater.allUpdate();
            
            ///Запуск сборщика
            
            ///Запуск отправляльщика
            
            SERVICE.collector.collectAllData(function(){
                ///Как только собрали все данные
                ///Отправляем все данные всем пользователям
                SERVICE.sender.sendDataToAllUser();
            });
            
        }
        setImmediate(SERVICE.gamer.gameLoop);
    }
}

module.exports = Gamer;