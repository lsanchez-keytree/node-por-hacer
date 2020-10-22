const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
};

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
};

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    const tarea = listadoPorHacer.find(
        (tarea) => tarea.descripcion === descripcion
    );

    if (tarea) {
        tarea.completado = completado;
        guardarDB();
        return true;
    }
    return false;
};

const borrar = (descripcion) => {
    cargarDB();

    const nuevoListado = listadoPorHacer.filter(
        (tarea) => tarea.descripcion !== descripcion
    );

    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
};

module.exports = { crear, getListado, actualizar, borrar };
