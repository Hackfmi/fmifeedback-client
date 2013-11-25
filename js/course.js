var id = window.location.href.split("#")[1] || -1;
var pageCourse = 1;
var APIendpoint = "http://146.185.165.209/server/";

$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
      $("#feedback").append($('div#loadmoreajaxloader'));
      $('div#loadmoreajaxloader').show();
      $.ajax({
      url : APIendpoint + "feedbacksFor/course/" + id + "/" + pageCourse,
      success: function(data) {
        pageCourse += 1;
        for (var i = data.result.length - 1; i >= 0; i--) {
          var html = getFeedbackHTMLElement(data.result[i]);
          $("#feedback").append(html);
        }
        $("#feedbackCount span").html(data.count_all);        
       }
      });
    }
});

$(document).ready(function() {
  $.ajax({
    type: "GET",
    url : APIendpoint + "feedbacksFor/course/" + id + "/" + pageCourse,
    dataType: "json",
    success : function(data) {
      pageCourse += 1;
      for (var i = 0; i < data.result.length; i++) {
        var html = getFeedbackHTMLElement(data.result[i]);
        $("#feedback").append(html);
      }
      $("#feedbackCount span").html(data.count_all);
    },
    error : function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus + ' ' + errorThrown);
    }
  });
});
var getFeedbackHTMLElement = function (data) {
  var html = '<div class="feedbackElement well well-large">' 
  +  '<div class="date label label-default pull-right">' + data.created + '</div>' 
  +  '<h2 data-id="' + data.course_id + '" class="course-name"><a href="course.html#' + data.course_id + '">' + data.course_name + '</a></h2>' 
  +  '<h2 data-id="' + data.teacher_id + '" class="teacher-name"><a href="teacher.html#' + data.teacher_id + '">' + data.teacher_name + '</a></h2>';
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


