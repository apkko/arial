class GameEngine{
    constructor(PORT){
        ///Подключение файла мэнэджеров
        var manager =  require('./manager.js');
        ///Математическая библиотека
        this.MATH =  require('./math.js');
        //Глобальная переменная движка
        global.G_ENGINE = this;
        //Настройки
        this.SETTING = {
            DEBUGMODE : true,  ///
            WRITEALLINPUTDATA : false,  ///
            WRITEMOUSEDATA : false,  ///
            WRITEBUTTONDATA : false,  ///
            MANAGER:{
                login:'Apkko',
                password:'123'
            },
            GAME_UPDATE: 1000,
            MANAGER_UPDATE: 2000,
        }
        
        ///Порт
        this.PORT = PORT;
        //Время для цикла
        this.gameLoopTime = {
            ///Нормально время задержки обновления игры
            normalDelta : this.SETTING.GAME_UPDATE,
            ///Долгое время задержки обновления игры
            badDelta :  null,
            ///Последнее время
            lastTime : Date.now(),
            ///задержка
            delta : null,
            ///Текущее время
            currentTime : Date.now()
        };
        this.gameLoopTime.badDelta = this.gameLoopTime.normalDelta + 20;
        
        //Флаг остановки движка
        this.isStop = true;
        //мэнэджеры
        this.EntityManager = new manager.Entity(); 
        this.ComponentManager = new manager.Component();
        this.SystemManager = new manager.System();
        this.EventManager = new manager.Event();
        this.AccountManager = new manager.Account();
        this.NetworkManager = new manager.Network();
        this.LogManager = new manager.Log(this.SETTING);
        this.GetManager = new manager.Get();

    }
    //Инициализация
    init(){
        ///Создаем, инициализируем, запускаем мэнеджеры
        this.initManagers();
        ///Создаем все системы
        G_ENGINE.SystemManager.addAllSystems();
        ///Создаем все типы сущностей
        this.EntityManager.addAllEntityTemplates();
    }
    //Страт движка
    start(){
        var that = this;
        if(this.SETTING.DEBUGMODE == true)
            console.log("...DEBUG MODE...");
        this.LogManager.debugLog("Engine is started...");
        this.NetworkManager.startListenSocket(this.PORT);
        this.lastTime = Date.now(); 
        ///Запуск бесконечного цикла
        this.isStop = false;
        setImmediate(this.gameLoop);
    }
    ///Глобальный цикл игры
    gameLoop(){
        //Если движок не остановлен запускается цикл
        if(!G_ENGINE.isStop){
            
            G_ENGINE.gameLoopTime.currentTime = Date.now();
            G_ENGINE.gameLoopTime.delta  = G_ENGINE.gameLoopTime.currentTime - G_ENGINE.gameLoopTime.lastTime; 
            if (G_ENGINE.gameLoopTime.delta >= G_ENGINE.gameLoopTime.normalDelta){
                if (G_ENGINE.gameLoopTime.delta >= G_ENGINE.gameLoopTime.badDelta){
                    G_ENGINE.LogManager.debugLog('Долгая задержка отправки: '+G_ENGINE.gameLoopTime.delta+' мсек.');}

                G_ENGINE.gameLoopTime.lastTime = G_ENGINE.gameLoopTime.currentTime;
                ///Обновляем все системы
                G_ENGINE.SystemManager.updateSystems();
                ///Собираем данные для отправки
                G_ENGINE.NetworkManager.sendDataToAllUser();
                /*
                G_ENGINE.NetworkManager.sendDataToAllUser(function(){
                    ///Как только собрали все данные
                    ///Отправляем все данные всем пользователям
                    G_ENGINE.SendManager.sendDataToAllUser();
                });
                */
                
                
            }
            setImmediate(G_ENGINE.gameLoop);
        }
        
    }
    ///Создание и инициация мэнэджеров
    initManagers(){
        this.ComponentManager.init();
        this.EntityManager.init();
        this.SystemManager.init();
        this.EventManager.init();
        this.AccountManager.init();
        this.NetworkManager.init();
    }   
}

module.exports = GameEngine;