var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.disp = function () {
        console.log("Engine is " + this.engine);
    };
    return Car;
}());
var obj = new Car("Honda");
obj.disp();
