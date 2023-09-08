$(".code-select").on('change', function (e) {
    e.preventDefault();
    $.ajax({
        url: "/getbranchdata",
        type: "POST",
        data: {
            code: $(this).find(":selected").val(),
        },
        success: function(data){
            $(".sloak").val(data.codedata[0][5]) ;
            $(".active").val(data.codedata[0][6]) ;
            $(".respon").val(data.codedata[0][7]) ;
            $(".user_name").val(data.codedata[0][0]) ;
            $(".dsloak input").prop("max",data.degree[0][3]) ;
            $(".dactive input").prop("max",data.degree[0][4]) ;
            $(".drespon input").prop("max",data.degree[0][5]) ;
            $(".dsloak span").text(data.degree[0][3]) ;
            $(".dactive span").text(data.degree[0][4]) ;
            $(".drespon span").text(data.degree[0][5]) ;
            $(".all-inputs").show();
        }
    });
});