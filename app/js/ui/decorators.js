import { autobind } from 'core-decorators';

function preventDefault(target, key, descriptor) {
    var fn = descriptor.value;
    descriptor.value = function (ev, ...args) {
        ev.preventDefault();
        return fn.call(this, ev, ...args);
    };
    return descriptor;
}

export { preventDefault, autobind }
