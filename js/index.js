var page = 1;
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
      $("#feedback").append($('div#loadmoreajaxloader'));
      $('div#loadmoreajaxloader').show();
      $.ajax({
      url: APIendpoint + "feedbacks/" + page,
      success: function(data) {
        page += 1;
        if(data.result) {
          for (var i = data.result.length - 1; i >= 0; i--) {
            var html = getFeedbackHTMLElement(data.result[i]);
            $("#feedback").append(html);
          };
          $('div#loadmoreajaxloader').detach();
          $('div#loadmoreajaxloader').hide();
        } else {
            $('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
          }
        }
      });
    }
});
$(document).ready(function() {
  $.ajax({
    type: "GET",
    url : APIendpoint + "feedback/?key=hackfmi",
    dataType: "json",
    success : function(data) {
      Recaptcha.create(data.recaptcha_public_key,
        "recaptcha",
        {
          theme: "red",
          callback: Recaptcha.focus_response_field
        }
      );
      $("#feedbackCount span").html(data.count_all);
    },
    error : function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + ' ' + errorThrown);
    }
  });
});
// var recaptchaURL = {
//   "scriptURL": "http://www.google.com/recaptcha/api/challenge?k=",
//   "iframeURL": "http://www.google.com/recaptcha/api/noscript?k="
// }
var getFeedbackHTMLElement = function (data) {
  debugger;
  var html = '<div class="feedbackElement well well-large">' 
  +  '<div class="date label label-default pull-right">' + data.created + '</div>' 
  +  '<h2 class="course-name">' + data.course_name + '</h2>' 
  +  '<h2 class="teacher-name">' + data.teacher_name + '</h2>';
  if (data.positive_text) {
    html += '<div class="positive-feedback alert-success pull-left">' + data.positive_text + '</div>';
  } 
  if (data.negative_text) {
    html += '<div class="negative-feedback alert-danger pull-right">' + data.negative_text + '</div>';
  }
  html += '<div class="date label label-default">' + data.course_rating + '</div>' 
  +  '<div class="date label label-default">' + data.teacher_rating + '</div></div>';
  return html;
};
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
		},

		error : function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus + ' ' + errorThrown);
		}
	});
};

var getFeedback = function(e) {
  $.ajax({
    type : "GET",
    url : APIendpoint + "feedbacks/" + 1,
    dataType: 'json',
    success : function(data) {
      debugger;
      var option = '';
      for (i=0;i<data.length;i++){
         option += '<option value="'+ data[i].name + '">' + data[i].name + '</option>';
      }
      $('#teacher').append(option);
      $('#teacher').val(data[0].name);
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

