
$(document).ready(function() {

  	$("#login").click(function(event) {
			event.preventDefault();
            
			var username = $('#inputUsername').val();
			var password = $('#inputPasswoord').val();

			var url = "users/login?username="+username+"&password="+password;
         var obj={};
         
			postAjaxCallForUserService(url,obj).then(function (resultObj) {
                    console.log("###########Login  call###########");
                    console.log(resultObj);
                    
                     var url2 = "oauth/token?grant_type=password&username="+username+"&password="+password;
                    postAjaxCallForUserService(url2,obj).then(function (resultObj1) {
                    	    console.log("####### Oauth call ############")
                            console.log(resultObj1);
                            localStorage.setItem("tokenData", JSON.stringify(resultObj1));
                                    var url = "./index.html"
				                     	$(location).attr('href', url); 

                    },function (xhr, status, err) {
                    console.log(status, err);
                    });

            

			 },function (xhr, status, err) {
                    console.log(status, err);
             });


	});


	 $("#signup").click(function(event) {
			event.preventDefault();
            
			var firstName = $('#firstName').val();
			var lastName = $('#lastName').val();
			var userName = $('#userName').val();
			var password = $('#password').val();
			var email = $('#email').val();
			var mobileNum = $('#mobileNumber').val();
			var passport = $('#passport').val();
			var address = $('#address').val();

         var obj ={};
            obj.username =  userName;
		    obj.password = password;
		    obj.firstName =  firstName; 
		    obj.lastName = lastName;
		    obj.email = email;
		    obj.phone = mobileNum;

		    console.log(obj);

		    postAjaxCallForUserService('users/signUp',obj).then(function (resultObj) {
                 console.log("###########Sign Up  call###########");
                   console.log(resultObj);
                   	var url = "./sign-in.html"
				      	$(location).attr('href', url);

             	},function (xhr, status, err) {
                    console.log(status);
             });

	});

});


function postAjaxCallForUserService(endPoint ,obj,callback,val){
var hostURL = getHostURLFORUSERSERVICE();


var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "POST",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							data : JSON.stringify(obj),
							beforeSend: function (xhr){ 
                         xhr.setRequestHeader('Authorization',  "Basic " + btoa("admin" + ":" + "admin123")); 
                   },
							
						}).done(function (responseData, status, xhr) {
                       
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;
}

function getAjaxCallForUserService(endPoint){
	var hostURL = getHostURLFORUSERSERVICE();

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


function getHostURLFORUSERSERVICE(){
var hostURL = "http://localhost:8080/"
   return hostURL;

}

