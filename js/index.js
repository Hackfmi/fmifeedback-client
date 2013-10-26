$(document).ready(function() {
	submitButton.addEventListener(function(e){
		debugger;
	});
});
var APIendpoint = "http://146.185.165.209/server/";

var getTeachersForCourse = function(e) {
	//GET Teachers
	var courseID = 202;
	$.ajax({
		type : "GET",
		url : APIendpoint + "teacherByCourse/" + courseID,
	 	dataType: 'json',
		success : function(data) {
			debugger;
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
	// $.ajax({
	// 	type : "POST",
	// 	url : APIendpoint,
	// 	data : {
	// 		"course": $("#courseInputField").val(),
	// 		"teacher": $("#teacher").val(),
	// 		"positiveFeedback": $("#positiveFeedback").val(),
	// 		"negativeFeedback": $("#negativeFeedback").val(),

	// 		// "gamified" : payload,
	// 		// "feedbackId" : feedbackId,
	// 		// "studentId" : studentId
	// 	},
	// 	success : function(data) {
	// 		$("#gamifiedEducation").hide("fast");
	// 		$("#thankYouMessage").show("fast");
	// 	},
	// 	error : function(jqXHR, textStatus, errorThrown) {
	// 		console.log(textStatus + ' ' + errorThrown);
	// 	}
	// });
}
