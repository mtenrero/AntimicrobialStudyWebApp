$(document).ready(function() {

    $("#docContainer").validate();

    // Hide by default
    $("#tratamiento2").hide();
    $("#tratamiento3").hide();
    $("#tratamiento4").hide();
    $("#tratamiento5").hide();
    $("#tratamiento6").hide();

    // Handler tratamientos
    $("input:radio[name=n_antibioticos]").change(disp)
});

function disp() {

    if ($('input:radio[name=n_antibioticos]:checked').val() == 1) {

        $("#tratamiento2").hide();
        $("#tratamiento3").hide();
        $("#tratamiento4").hide();
        $("#tratamiento5").hide();
        $("#tratamiento6").hide();


    }

    if ($('input:radio[name=n_antibioticos]:checked').val() == 2) {

        $("#tratamiento2").show();
        $("#tratamiento3").hide();
        $("#tratamiento4").hide();
        $("#tratamiento5").hide();
        $("#tratamiento6").hide();

    }

    if ($('input:radio[name=n_antibioticos]:checked').val() == 3) {

        $("#tratamiento2").show();
        $("#tratamiento3").show();
        $("#tratamiento4").hide();
        $("#tratamiento5").hide();
        $("#tratamiento6").hide();

    }

    if ($('input:radio[name=n_antibioticos]:checked').val() == 4) {

        $("#tratamiento2").show();
        $("#tratamiento3").show();
        $("#tratamiento4").show();
        $("#tratamiento5").hide();
        $("#tratamiento6").hide();

    }

    if ($('input:radio[name=n_antibioticos]:checked').val() == 5) {

        $("#tratamiento2").show();
        $("#tratamiento3").show();
        $("#tratamiento4").show();
        $("#tratamiento5").show();
        $("#tratamiento6").hide();

    }

    if ($('input:radio[name=n_antibioticos]:checked').val() == 6) {

        $("#tratamiento2").show();
        $("#tratamiento3").show();
        $("#tratamiento4").show();
        $("#tratamiento5").show();
        $("#tratamiento6").show();

    }

}