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
    return cont;
}

export const translate = (x=0,y=0,z=0) => obj => {
    obj.position.x += x;
    obj.position.y += y;
    obj.position.z += z;
}

const Fish = [
    Box(1,1,1,translate(-2)),
    Box(1,1,1,translate(-0.5)),
    Box(1,1,1,translate(1)),
    Box(1,1,1,translate(2.5)),
    Box(1,1,1,translate(4)),
    Box(1,1,1,translate(5.5)),
    Box(1,1,1,translate(7)),
]

const container = Container(...Fish);

const core = createCore(renderer,scene,camera);

core.before = () => {
    scene.add(container);
    camera.position.x = 0
    camera.position.y = 5
    camera.position.z = 10
    camera.lookAt(0,0,0)
}

let t = 0;

core.loop(() => {
    t+= 0.05
    Fish.forEach( (f,index) => {
        f.position.z = Math.sin( t + (Math.PI*((Fish.length-index)/Fish.length))) 
    })
})