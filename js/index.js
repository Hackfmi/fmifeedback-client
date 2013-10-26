$(document).ready(function() {
  $.ajax({
    type: "GET",
    url : APIendpoint + "feedback/?key=hackfmi",
    dataType: "json",
    success : function(data) {
      // debugger;
      $("#recaptcha").append(data.recaptcha);
    },
    error : function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + ' ' + errorThrown);
    }
  });
});

var APIendpoint = "http://146.185.165.209/server/";
var onKeypress = function(e) {
	var tmp_str = $("#courseInputField").val();
  if (tmp_str.length > 3) {
		$.ajax({
  		type : "GET",
  		url : APIendpoint + "startsWith/" + tmp_str,
  	 	dataType: 'json',
  		success : function(data) {
        var context = data;
        var options = [];
        for (var i = data.length - 1; i >= 0; i--) {
          options.push(data[i].name);
        };
  			$("#courseInputField").autocomplete({
  				source: options,
          autoFocus: true,
  				select: function(e, ui) {
            var courseID = -1;
            for(var i = 0, len = context.length; i<len; i++) {
              if (context[i].name === ui.item.label) {
                courseID = context[i].uid;
                break;
              }
            };
            $("#courseId").attr("value", courseID);
            getTeachersForCourse(courseID)
  				}
  			})},
  		error : function(jqXHR, textStatus, errorThrown) {
  			console.log(textStatus + ' ' + errorThrown);
  		}
		});
	}
}
var getTeachersForCourse = function(label) {
	//GET Teachers
	var courseID = label;
	$.ajax({
		type : "GET",
		url : APIendpoint + "teacherByCourse/" + courseID,
	 	dataType: 'json',
		success : function(data) {
			var option = '';
			for (i=0;i<data.length;i++){
			   option += '<option value="'+ data[i].name + '">' + data[i].name + '</option>';
			}
			$('#teacher').append(option);
			$('#teacher').val(data[0].name);
			// $("#gamifiedEducation").hide("fast");
			// $("#thankYouMessage").show("fast");
		},

		error : function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus + ' ' + errorThrown);
		}
	});
};

var postFeedback = function(e){
	var value = $("#courseInputField").val();
	value = $("#teacher").val()
	value = $("#positiveFeedback").val()
	value = $("#negativeFeedback").val()
	$.ajax({
		type : "POST",
		url : APIendpoint +"feedback/?key=hackfmi",
		data : {
			"teacher_id":     $("#teacher").val(),
      "course_id":      $("#courseId").val(),
			"positive":       $("#positiveFeedback").val(),
			"negative":       $("#negativeFeedback").val(),
      "course_rating":  0,
      "teacher_rating": 0
			// "gamified" : payload,
			// "feedbackId" : feedbackId,
			// "studentId" : studentId
		},
    statusCode: {
      404: function() {
        alert( "page not found" );
      },
      default: function() {
        console.log("default");
      }
    },
		success : function(data) {
      debugger;
      console.log(data);
			// $("#gamifiedEducation").hide("fast");
			// $("#thankYouMessage").show("fast");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus + ' ' + errorThrown);
		}
	});
}
