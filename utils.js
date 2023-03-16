class Util {
    //FPS
    static fps = 0;
    static lastTime = 0;
    static calculateFPS(time) {
        Util.fps = Math.round(1000 / (time - Util.lastTime));
        Util.lastTime = time;
    }
}