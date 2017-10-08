var express = require('express');
var router = express.Router();
const passport = require('passport');
var moment = require('moment');
var Promise = require('bluebird');

var models = require('../models');

router.get('/', passport.authenticationMiddleware(), renderClinicas);
router.get('/private', passport.authenticationMiddleware(), renderClinicas);
router.get('/editar/:id', passport.authenticationMiddleware(), renderEditarClinica); // Recuperar por diff
router.get('/:clinica/nuevoCaso', passport.authenticationMiddleware(), renderNuevoCaso);
router.get('/editar/:clinica/:caso', passport.authenticationMiddleware(), renderEditar);
router.get('/:id', passport.authenticationMiddleware(), renderCasos);
router.get('/:clinica/:caso', passport.authenticationMiddleware(), renderViewCaso);


// Métodos de gestión de datos
router.post('/nueva', passport.authenticationMiddleware(), saveClinica);
router.post('/editar/:id', passport.authenticationMiddleware(), editarClinica);
router.post('/editarEstado/:id', passport.authenticationMiddleware(), editarEstadoClinica);
router.post('/:clinica/nuevoCaso', passport.authenticationMiddleware(), savePerroRefactor);

function renderClinicas(req, res, next) {
    models.clinica.findAll({}).then(function (clinicas) {
        res.render('clinicas', {title: 'Clínicas', clinicas: clinicas, zip: req.user.zip});
    });
}

function saveClinica(req, res) {
    models.clinica.build({
        nombre: req.body.nombre,
        email: req.body.email,
        dirección: req.body.direccion,
        telefono: req.body.telefono,
        zip: req.body.zip,
        fecha_visita: moment(req.body.fecha_clinica, 'DD/MM/YYYY').format("YYYY-MM-DD"),
        notas: req.body.notas
    }).save().then(function () {
        models.clinica.findAll({}).then(function (clinicas) {
            res.render('clinicas', {title: 'Clínicas', clinicas: clinicas, zip: req.user.zip});
        });
    });

}

function editarClinica(req, res) {
    models.clinica.findById(req.params.id).then(function (clinica) {
        clinica.update({
            nombre: req.body.nombre,
            email: req.body.email,
            dirección: req.body.dirección,
            telefono: req.body.telefono,
            fecha_visita: moment(req.body.fecha_clinica, 'DD/MM/YYYY').format("YYYY-MM-DD"),
            notas: req.body.notas
        }).then(function () {
            res.redirect('/clinica')
        });
    });
}

function renderEditarClinica(req, res) {
    models.clinica.findById(req.params.id).then(function (clinica) {
        res.render('editarClinica', {title: 'Clínicas', clinica: clinica, zip: req.user.zip});
    });
}

function renderEditar(req, res) {

    models.clinica.findById(req.params.clinica).then(function (clinica) {
        getPerro(clinica, req,res,true);
    });
}


function fullRenderCasos(clinica, res, req) {

    models.perro.findAll({
        where: {
            clinica: clinica.id
        }
    }).then(function (perros) {
        res.render('casos', {title: 'Casos de : ' + clinica.zip, casos: perros, clinica: clinica, moment: moment, zip: req.user.zip});
    })
}

function renderCasos(req, res) {
    models.clinica.findById(req.params.id).then(function (clinica) {
        fullRenderCasos(clinica, res, req)
    });
}

function renderNuevoCaso(req, res) {
    models.clinica.findById(req.params.clinica).then(function (clinica) {
        models.perro.findAndCountAll().then(function (allFind) {
            res.render('newCaso', {
                title: 'Nuevo Caso en ' + clinica.nombre,
                clinica: clinica,
                zip: req.user.zip,
                caseNum: allFind.count + 1,
                startTime: new Date().getTime(),
                error: false
            });
        })

    });

}

function savePerroRefactor(req, res) {
    models.perro.create({
        nombre: req.body.perro_nombre,
        sexo: req.body.perro_sexo,
        edad: moment(req.body.perro_nacimiento, 'DD/MM/YYYY').format("YYYY-MM-DD"),
        raza: req.body.perro_raza,
        peso: req.body.perro_peso,
        clinica: req.params.clinica
    }).then(function (savedPerro) { // Build Diagnose
        models.diagnostico.create({
            perro: savedPerro.id,
            fecha_visita: moment(req.body.perro_consulta, 'DD/MM/YYYY').format("YYYY-MM-DD"),
            diagnostico: req.body.diag,
            sintomatologia: req.body.sintomatologia,
            cxt_atencion: req.body.cxt_atencion,
            cultivo: req.body.cultivo,
            abiograma: req.body.antibiograma,
            fiebre: req.body.fiebre,
            otras_pruebas: req.body.otras_pruebas,
            fillTime: new Date().getTime() - req.body.startTime
        }).then(function (savedDiagnostico) {
            var date = new Date(Date.now());
            date = date.toISOString().replace(/T/, ' ').// replace T with a space
            replace(/\..+/, '');
            for (var iter=1; iter <= req.body.n_antibioticos; iter++) {
                models.tratamiento.create({
                    naturaleza: req.body['naturaleza' + iter],
                    pactivo: req.body['antibiotico_principioact' + iter],
                    ncomercial: req.body['antibiotico_ncomercial' + iter],
                    procedencia: req.body['antibiotico_origen' + iter],
                    posologia: req.body['antibiotico_prep' + iter],
                    tipo_receta_emitida: req.body['tipo_receta_emitida' + iter],
                    tipo: req.body['antibiotico_tipo' + iter],
                    via: req.body['antibiotico_viadmin' + iter],
                    presentacion: req.body['antibiotico_pres' + iter],
                    preparacion: req.body['antibiotico_prep' + iter],
                    unidades: req.body['antibiotico_unidprep' + iter],
                    observaciones: req.body['observaciones'],
                    diagnostico: savedDiagnostico.id,
                    cantidad_mgkg: typeof req.body['antibiotico_mgkg' + iter]!='undefined' ? req.body['antibiotico_mgkg' + iter] : '',
                    repeticiones: req.body['antibiotico_repeticiones' + iter],
                    fecha: savedDiagnostico.fecha_visita,
                    dispensacion: req.body['dispensacion' + iter],
                    administracion: req.body['administracion' + iter],
                    duracion: req.body['duracion' + iter],
                    revisar: 'revisar',
                    correcto: 0
                }).then(function (savedTratamiento, iter) { // Async
                        res.redirect('/clinica/' + req.params.clinica);
                })
            }
        })
    });
}

function updateCaso(req, res) {
    models.perro.update({
        nombre: req.body.perro_nombre,
        sexo: req.body.perro_sexo,
        edad: moment(req.body.perro_nacimiento, 'DD/MM/YYYY').format("YYYY-MM-DD"),
        raza: req.body.perro_raza,
        peso: req.body.perro_peso,
        clinica: req.params.clinica
    }, { where: { id: req.params.caso }}).then(function (result) { // Build Diagnose
    });

    models.diagnostico.update({
        perro: savedPerro.id,
        fecha_visita: moment(req.body.perro_consulta, 'DD/MM/YYYY').format("YYYY-MM-DD"),
        diagnostico: req.body.diag,
        sintomatologia: req.body.sintomatologia,
        cxt_atencion: req.body.cxt_atencion,
        cultivo: req.body.cultivo,
        abiograma: req.body.antibiograma,
        fiebre: req.body.fiebre,
        otras_pruebas: req.body.otras_pruebas,
        fillTime: new Date().getTime() - req.body.startTime
    }, { where: { perro: req.params.caso }}).then(function (results) {

    });

    models.diagnostico.find

    for (var iter=1; iter <= req.body.n_antibioticos; iter++) {
        models.tratamiento.update({
            naturaleza: req.body['naturaleza' + iter],
            pactivo: req.body['antibiotico_principioact' + iter],
            ncomercial: req.body['antibiotico_ncomercial' + iter],
            procedencia: req.body['antibiotico_origen' + iter],
            posologia: req.body['antibiotico_prep' + iter],
            tipo_receta_emitida: req.body['tipo_receta_emitida' + iter],
            tipo: req.body['antibiotico_tipo' + iter],
            via: req.body['antibiotico_viadmin' + iter],
            presentacion: req.body['antibiotico_pres' + iter],
            preparacion: req.body['antibiotico_prep' + iter],
            unidades: req.body['antibiotico_unidprep' + iter],
            observaciones: req.body['observaciones'],
            diagnostico: savedDiagnostico.id,
            cantidad_mgkg: typeof req.body['antibiotico_mgkg' + iter]!='undefined' ? req.body['antibiotico_mgkg' + iter] : '',
            repeticiones: req.body['antibiotico_repeticiones' + iter],
            fecha: savedDiagnostico.fecha_visita,
            dispensacion: req.body['dispensacion' + iter],
            administracion: req.body['administracion' + iter],
            duracion: req.body['duracion' + iter],
            revisar: 'revisar',
            correcto: 0
        }, { where: { diagnostico: req.params.caso }}).then(function (savedTratamiento, iter) { // Async
        })
    }
    res.redirect('/clinica/' + req.params.clinica);
}

function updateCaso2(perroId, req, res) {

}

function renderViewCaso(req, res) {
    models.clinica.findById(req.params.clinica).then(function (clinica) {
        getPerro(clinica, req, res)
    });
}

function getPerro(clinica, req, res, edit) {
    models.perro.findById(req.params.caso).then(function (caso) {
        getDiagnostico(clinica, caso, req, res, edit);
    });
}

function getDiagnostico(clinica, perro, req, res, edit) {
    models.diagnostico.findOne({
        where: {
            perro: perro.id
        }
    }).then(function (diagnostico) {
        if (edit) {
            getTratamientosEdit(diagnostico, clinica, perro, req, res);
        } else {
            getTratamientos(diagnostico, clinica, perro, req, res);
        }
    })
}

function getTratamientos(diagnostico, clinica, perro, req, res) {
    models.tratamiento.findAll({
        where: {
            diagnostico: diagnostico.id
        }
    }).then(function (tratamientos) {
        res.render('viewCaso', {
            title: "Caso: " + perro.nombre + " (" + clinica.zip + ")",
            clinica: clinica,
            perro: perro,
            diagnostico: diagnostico,
            tratamientos: tratamientos,
            zip: req.user.zip,
            moment: moment
        });
    })
}

function getTratamientosEdit(diagnostico, clinica, perro, req, res) {
    models.tratamiento.findAll({
        where: {
            diagnostico: diagnostico.id
        }
    }).then(function (tratamientos) {
        res.render('newCaso', {
            title: "Caso: " + perro.nombre + " (" + clinica.zip + ")",
            clinica: clinica,
            perro: perro,
            diagnostico: diagnostico,
            tratamientos: tratamientos,
            moment: moment,
            startTime: 0,
            caseNum: diagnostico.id,
            zip: req.user.zip
        });
    });
}

function editarEstadoClinica(req, res) {
    models.clinica.findById(req.params.id).then(function (clinica) {
        clinica.update({
            estado: req.body.estado
        }).then(function () {
            res.redirect('/clinica/' + req.params.id)
        });
    });
}

module.exports = router;
