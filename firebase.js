    var name="";

    $(document).ready(function(){

        $("#name_submit").on('click',function() {
          name = $("#name").val();
          $("#name_prompt_parent").fadeOut();
        

            firebase.database().ref('chat/').on('child_added',function(snapshot){
              if (name == snapshot.child('name').val()) {
                var data = "<div id='mym'><div class='userPhoto'><img src=''></div><div class='text'><p class='name'>"+snapshot.child('name').val()+"</p><p class='message'>"+snapshot.child('message').val()+"</p><p class='date'>"+snapshot.child('date').val()+"</p></div></div>";
              }else{
                var data = "<div id='m'><div class='userPhoto'><img src=''></div><div class='text'><p class='name'>"+snapshot.child('name').val()+"</p><p class='message'>"+snapshot.child('message').val()+"</p><p class='date'>"+snapshot.child('date').val()+"</p></div></div>";
              }
              $("#messages").html($("#messages").html()+data);
              var objDiv = document.getElementById("messages");
              objDiv.scrollTop = objDiv.scrollHeight;
            });
        });

        $("#send_button").on('click',function() {
          mess = $("#msg").val();
          $("#msg").val("");
          var d = new Date();
          var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          var hour = d.getHours();
          var minute = d.getMinutes();
          var second = d.getSeconds();
          var am_pm = "AM";
          if(hour == 0){
            hour = 12;
          }else if (hour > 12) {
            hour = hour-12;
            am_pm="PM";
          }
          if (hour < 10) {
            hour = "0"+hour;
          }
          if (minute < 10) {
            minute = "0"+minute;
          }
          if (second < 10) {
            second = "0"+second;
          }
          var day = days[d.getDay()];
          var dayno = d.getDate();
          var month = months[d.getMonth()];
          var year = d.getFullYear();
          var currentdate = hour+":"+minute+":"+second+"-"+day+"-"+dayno+"-"+month+"-"+year;
          firebase.database().ref('chat/'+Date.now()).set({
              name:name,
              message:mess,
              date:currentdate
          });
          var objDiv = document.getElementById("messages");
  		  objDiv.scrollTop = objDiv.scrollHeight;
        });

    });
    