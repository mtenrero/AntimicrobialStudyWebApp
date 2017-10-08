function generateTreatments(qty) {
    for (i=2; i<=qty; i++) {
        var base = document.getElementById("treatment");
        var newtreat = base.cloneNode(true);
        newtreat.id = "treatment" + ++i;
        base.appendChild(newtreat);
    }
    
}

 $(document).ready(function(){
     
   $("input[name=n_antibioticos]").click(function(){
    alert($("input[name=n_antibioticos]:checked").val());
       generateTreatments($("input[name=n_antibioticos]:checked").val());
   }); 

}); 