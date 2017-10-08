/**
 * Created by Marcos on 21/02/2017.
 */

$(document).ready(function() {

    show1();

    $('#perro_nacimiento').datepicker({
        format: "dd/mm/yyyy",
        startView: 2,
        maxViewMode: 2,
        todayBtn: true,
        clearBtn: true,
        language: "es",
        daysOfWeekHighlighted: "0,6",
        todayHighlight: true
    });

    $('#perro_consulta').datepicker({
        format: "dd/mm/yyyy",
        startView: 2,
        maxViewMode: 2,
        todayBtn: true,
        clearBtn: true,
        language: "es",
        daysOfWeekHighlighted: "0,6",
        todayHighlight: true
    });
});

function generateTreatments() {
    var template = $('#tratamiento');
    for (var ite = 1; ite < 7; ite ++) {

        //loop through each input
        var section = template.attr("id", "tratamiento" + ite).clone().find(':input').each(function () {

            //set id to store the updated section number
            var newName = this.name + ite;

            //update for label
            $(this).prev().attr('for', newName);

            //update edit iteration ID
            $(this).

            //update id
            this.name = newName;

        }).end()
            .appendTo('#tratamientos');

        $('#tratamiento1 h4 b').text("Tratamiento " + 1);
        $('#tratamiento2 h4 b').text("Tratamiento " + 2);
        $('#tratamiento3 h4 b').text("Tratamiento " + 3);
        $('#tratamiento4 h4 b').text("Tratamiento " + 4);
        $('#tratamiento5 h4 b').text("Tratamiento " + 5);
        $('#tratamiento6 h4 b').text("Tratamiento " + 6);

    }

}

function show1() {
    $('#tratamiento1').show();
}
