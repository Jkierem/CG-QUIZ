import { identity, isFunction, isNil, not } from '@juan-utils/functions'

const when = (pred,action) => v => pred(v) ? action(v) : void 0;
const cancel = id => cancelAnimationFrame(id)

const createCore = (renderer, scene, camera) => {
    let cont = true;
    let id = null;

    return {
        loop(action=identity) {
            (function render(core) {
                if( id === null && isFunction(core.before) ){
                    core.before(core);
                }
                if (cont) {
                    action(this)
                    id = requestAnimationFrame(render);
                }
                renderer.render(scene, camera);
            })(this)
        },
        stop() {
            cont = false;
            when( not(isNil) , cancel)(id);
        }
    }
};

export default createCore;