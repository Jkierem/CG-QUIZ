import * as THREE from 'three';
import createCore from 'src/core';
import { Ambient, Directional } from './utils';
import { multiGenerate } from './cube';

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const Box = (width,height,depth,transform = x => x) => {
    const geometry = new THREE.BoxGeometry(width,height,depth);
    const material = new THREE.MeshNormalMaterial();
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

const mapToMesh = c => {
    const { length , center } = c;
    const { x , y } = center;
    const z = center.get(2)
    return Box(length,length,length,translate(x,y,z));
}

const cubes = multiGenerate(3)

const container = Container(...cubes.map(mapToMesh));

const core = createCore(renderer,scene,camera);

core.before = () => {
    scene.add(container);
    camera.position.x = 0
    camera.position.y = 5
    camera.position.z = 10
    camera.lookAt(0,0,0)
}

core.loop()