/**
 * Created by Marcos on 02/03/2017.
 */
$(document).ready(function() {

    $("#estadoCompleto").click(function () {
        var url = $(location).attr('href'),
            parts = url.split("/"),
            last_part = parts[parts.length-1];

        $.post("/clinica/editarEstado/" + last_part, { estado: "completo" } );
    });

    $("#estadoRevisar").click(function () {
        var url = $(location).attr('href'),
            parts = url.split("/"),
            last_part = parts[parts.length-1];

        $.post("/clinica/editarEstado/" + last_part, { estado: "revisar" } );
    });

    $("#estadoInsertar").click(function () {
        var url = $(location).attr('href'),
            parts = url.split("/"),
            last_part = parts[parts.length-1];

        $.post("/clinica/editarEstado/" + last_part, { estado: "insertar" } );
    });

    $("#estadoRecogida").click(function () {
        var url = $(location).attr('href'),
            parts = url.split("/"),
            last_part = parts[parts.length-1];

        $.post("/clinica/editarEstado/" + last_part, { estado: "recogida" } );
    });

    $("#estadoVisita").click(function () {
        var url = $(location).attr('href'),
            parts = url.split("/"),
            last_part = parts[parts.length-1];

        $.post("/clinica/editarEstado/" + last_part, { estado: "llamadaCita" } );
    });

    $("#estadoTutor").click(function () {
        var url = $(location).attr('href'),
            parts = url.split("/"),
            last_part = parts[parts.length-1];

        $.post("/clinica/editarEstado/" + last_part, { estado: "llamadaTutor" } );
    });

});