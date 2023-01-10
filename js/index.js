
$(document).ready(function() {

					
		getPropertiesInfo();

});


function  getPropertiesInfo(){


getAjaxCall('properties').done(function (data) {
  
   console.log(data);
});


getAjaxCall('properties').fail(function (xhr, status, err) {
   console.log(status, err);
});

  
}

function postAjaxCall(endPoint ,obj,callback){

	var hostURL = getHostURL();

	var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "POST",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							data : JSON.stringify(obj)
							
						}).done(function (responseData, status, xhr) {
     
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;

}

function getAjaxCall(endPoint){
	var hostURL = getHostURL();

	var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "GET",
							dataType : "json",
							contentType : "application/json; charset=utf-8"
							
						}).done(function (responseData, status, xhr) {
     
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;
}

function putAjaxCall(endPoint ,obj){
	var hostURL = getHostURL();

	var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "PUT",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							data : JSON.stringify(obj)
							
						}).done(function (responseData, status, xhr) {
     
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;
}

function deleteAjaxCall(endPoint){
     var hostURL = getHostURL();

	var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "DELETE",
							dataType : "json",
							contentType : "application/json; charset=utf-8"
							
						}).done(function (responseData, status, xhr) {
     
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;
}

function getHostURL(){
 var hostURL = "http://localhost:9191/"
   return hostURL;
}

