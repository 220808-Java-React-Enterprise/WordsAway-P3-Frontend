const AppConfig = {
    PROTOCOL: 'wss:',
    HOST: '//localhost',
    PORT: ':9000'
  }
  
  const SocketSingleton = (function () {
    let instance: WebSocket
  
    function createInstance() {
      const socket = new WebSocket(AppConfig.PROTOCOL + AppConfig.HOST + AppConfig.PORT)
      return socket
    }
  
    return {
      getInstance: function () {
        if (!instance) {
          instance = createInstance()
        }
        return instance
      }
    }
  })()
  
  export default SocketSingleton