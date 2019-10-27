import * as THREE from 'three'
import { identity } from '@juan-utils/functions'

const Geometries = {
    Plane: "PlaneGeometry",
    Box: "BoxGeometry",
    Cone: "ConeGeometry"
}

const Materials = {
    Basic: "MeshBasicMaterial",
    Lambert: "MeshLambertMaterial"
}

const Objects = {
    Mesh: "Mesh",
    Container: "Object3D"
}

const Lights = {
    Ambient: "AmbientLight",
    Directional: "DirectionalLight"
}

export const setPosition = (obj, { x=0, y=0, z=0 } = {}) => {
    obj.position = { x, y, z }
}

export const create = (className , ...args) => {
    if( THREE[className] ){
        return new THREE[className](...args);
    }
    throw new Error(`${className} does not exist on THREE`);
}

const createMesh = ({ geometry , material , transform=identity , mutate=identity }) => {
    const mesh = create( Objects.Mesh, geometry, material );
    mutate(mesh);
    return transform(mesh);
}

export const Ambient = () => {
    return create( Lights.Ambient , 0x707070 );
}

export const Directional = () => {
    return create( Lights.Directional , 0xffffff , 0.5 )
}

export const Container = (...objs) => {
    const cont = create(Objects.Container);
    if( objs.length > 0 ){
        cont.add(...objs)
    }
    return cont;
}

export const Plane = ({ 
    width, 
    height, 
    color, 
    transform=identity,
    mutate=identity 
}) => {
    const geometry = create(Geometries.Plane,width,height)
    const material = create( Materials.Lambert, { color , side: THREE.DoubleSide });
    return createMesh({geometry,material,transform,mutate});
}

export const Box = ({
    x,y,z,
    color,
    transform=identity,
    mutate=identity
}) => {
    const geometry = create(Geometries.Box,x,y,z);
    const material = create( Materials.Lambert, { color });
    return createMesh({geometry,material,transform,mutate});
}
