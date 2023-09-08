$(".option-team").hide();
$(".option-branch").hide();
$(".select-team").hide();
$(".team-checkbox").hide();

$( document ).ready(function() {

    $('.two-options').on('change', function (e) {
    
      $(".select-team").show();

      if (this.value == "team"){
        $(".option-team").show();
        $(".option-branch").hide();

      }else{
        $(".option-branch").show();
        $(".option-team").hide();

      }
    });
    $('.trainee').on('change', function (e) {
    
      $(".hidden-team").val($(".trainee").find(":selected").data('team'));

     
    });
    $('.team-checkbox').on('change', function (e) {
        if(  $('.team-checkbox input').is(':checked')) {
        
          $(".id3 .class-input").show();
          $(".id4 .class-input").show();
          $(".id5 .class-input").show();
          $(".id3 input").prop('required',true);
          $(".id4 input").prop('required',true);
          $(".id5 input").prop('required',true);
            
        }else{
          $(".id3 .class-input").hide();
          $(".id4 .class-input").hide();
          $(".id5 .class-input").hide();
          
          $(".id3 input").prop('required',false);
          $(".id4 input").prop('required',false);
          $(".id5 input").prop('required',false);
        }
    });




    var type = $('.input-type').val()

    
    if(type == 'a'){

      $(".all-inputs").hide();
      $(".id2").show();
      $(".id3").show();
      $(".id4").show();
      $(".id2 input").prop('required',true);
      $(".id2 textarea").prop('required',true);
    
      $(".id3 input").prop('required',true);
      $(".id3 textarea").prop('required',true);
    
      $(".id4 input").prop('required',true);
      $(".id4 textarea").prop('required',true);
    
      
    }else if(type == 'b'){

      $(".all-inputs").hide();
      $(".id2").show();
      $(".id3").show();
      $(".id4").show();
      $(".id5").show();
      $(".id3 input").prop('required',true);
      $(".id3 textarea").prop('required',true);
      $(".id2 input").prop('required',true);
      $(".id2 textarea").prop('required',true);
      $(".id4 input").prop('required',true);
      $(".id4 textarea").prop('required',true);
      $(".id5 input").prop('required',true);
      $(".id5 textarea").prop('required',true);
    
    }
    else if(type == 'c'){

      $(".all-inputs").hide();
      
      $(".team-checkbox").show();
      
      $(".id3").show();
      $(".id4").show();
      $(".id5").show();
      
      $(".id3 textarea").prop('required',true);
    
      $(".id4 textarea").prop('required',true);
     
      $(".id5 textarea").prop('required',true);
      $(".id3 .class-input").hide();
      $(".id4 .class-input").hide();
      $(".id5 .class-input").hide();

    }
    else if(type == 'd'){

      $(".all-inputs").hide();
      $(".id2").show();
      $(".id4").show();
      $(".id5").show();
      $(".id4 input").prop('required',true);
      $(".id4 textarea").prop('required',true);
      $(".id2 input").prop('required',true);
      $(".id2 textarea").prop('required',true);
      $(".id5 input").prop('required',true);
      $(".id5 textarea").prop('required',true);
    }
    else if(type == 'e'){

      $(".all-inputs").hide();
      $(".id2").show();
      $(".id4").show();
      $(".id2 input").prop('required',true);
      $(".id2 textarea").prop('required',true);
      $(".id4 input").prop('required',true);
      $(".id4 textarea").prop('required',true);
    
    }
    else if(type == 'f'){

      $(".all-inputs").hide();
      $(".id6").show();
      $(".id6 input").prop('required',true);
      $(".id6 textarea").prop('required',true);
    
    }
    else if(type == 'g'){

      $(".all-inputs").hide();
      $(".id7").show();
      $(".id7 input").prop('required',true);
      $(".id7 textarea").prop('required',true);
    
    }
    else if(type == 'h'){

      $(".all-inputs").hide();
      $(".id8").show();
      $(".id8 input").prop('required',true);
      $(".id8 textarea").prop('required',true);
    
    }
    else if(type == 'i'){

      $(".all-inputs").hide();
      $(".id9").show();
      $(".id9 input").prop('required',true);
      $(".id9 textarea").prop('required',true);
    
    }
});

