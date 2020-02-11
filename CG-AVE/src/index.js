import * as THREE from 'three';
import createCore from 'src/core';
import { Ambient, Directional } from './utils';

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const Colors = {
    blue: 0x0000ff,
}

const Box = (width,height,depth,transform) => {
    const geometry = new THREE.BoxGeometry(width,height,depth);
    const material = new THREE.MeshNormalMaterial({ color: Colors.blue });
    const mesh = new THREE.Mesh(geometry,material);
    transform(mesh)
    return mesh;
}

export const Container = (...objs) => {
    const cont = new THREE.Object3D();
    if( objs.length > 0 ){
        cont.add(...objs)
    }
    cont.t = (f) => {
        f(cont)
        return cont;
    }
    return cont;
}

const Cont = (obj , t = x=>x) => {
    const cont = Container(...obj)
    t(cont);
    return cont
}

export const translate = (x=0,y=0,z=0) => obj => {
    obj.position.x += x;
    obj.position.y += y;
    obj.position.z += z;
}

const Wing = (x,y,z,trans) => Box(x,y,z,trans);
const Torso = (x,z) => Box(x,3,z,translate(0));

const RightWing = Cont(
    [
        Cont([
            Wing(2,1,0.5,translate(1))
        ],translate(2)),
        Wing(2,1,0.5,translate(1))
    ],
)

const LeftWing = Cont(
    [
        Cont([
            Wing(2,1,0.5,translate(-1))
        ],translate(-2)),
        Wing(2,1,0.5,translate(-1))
    ],
)

const Ave = [
    RightWing,
    Torso(1.3,1),
    LeftWing,
]

const container = Container(...Ave);

const core = createCore(renderer,scene,camera);

core.before = () => {
    scene.add(container);
    camera.position.x = 0
    camera.position.y = 5
    camera.position.z = 10
    camera.lookAt(0,0,0)
}

let t = 0;

const Rot = (t) => Math.sin( Math.PI * t );

core.loop(() => {
    t+= 0.009
    Ave.forEach( (i,index) => {
        if( index === 0 ){
            i.rotation.y = 0.7 * Rot(t)
            i.children[0].rotation.y = 0.6 * Rot(t)
        }
        if( index === 2 ){
            i.rotation.y = 0.7 * -Rot(t)
            i.children[0].rotation.y = 0.6 * -Rot(t)
        }
    })
})