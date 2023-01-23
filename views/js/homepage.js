
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
                              var url3 = "admin/"+username;
                                 getAjaxCallForUserService(url3).then(function (resultObj2) {
	                                       console.log(resultObj2);

	                                       localStorage.setItem("userResponse", JSON.stringify(resultObj2));
	                                        var custobj ={};

	                                        custobj.firstName = resultObj2.firstName;
	                                        custobj.lastName = resultObj2.lastName;
	                                        custobj.passport = resultObj2.passport;
	                                        custobj.address ="";
	                                        custobj.userId =resultObj2.id;
	                                         var url4 = 'customer'
				                                    postAjaxCallForPropetyService(url4,custobj).then(function (resultObj3) {
                                                            console.log(resultObj3);
                                                            console.log("####CUstomer is created ######3")
                                                             var customerId = resultObj3.customerId;
                                                             console.log(customerId);
                                                             localStorage.setItem("customerId", customerId);
				                                             var url = "./homepage.html"
								                     	     $(location).attr('href', url); 
									                        },function (xhr, status, err) {
									                        	$.notify("Something Went Wrong !", "error");
									                             console.log(status, err);
									                    });

                                      
					                        },function (xhr, status, err) {
					                        	$.notify("Something Went Wrong !!!", "error");
					                          console.log(status, err);

					                    });
                    },function (xhr, status, err) {
                    	$.notify("Something Went Wrong!", "error");
                    console.log(status, err);
                    });

            

			 },function (xhr, status, err) {
			 	    $.notify("Incorrect Username or Password!", "error");
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
		    obj.address = address;
		    obj.passport =passport;

		    console.log(obj);
            if(obj.username == '' || obj.password == '' || obj.firstName == '' || obj.lastName == '' || obj.email == '' || obj.phone == ''){
                 $.notify("Please enter valid data!", "error");
                return;
            }else{
		    postAjaxCallForUserService('users/signUp',obj).then(function (resultObj) {
                 console.log("###########Sign Up  call###########");
                   console.log(resultObj);
                   	var url = "./sign-in.html"
				      	$(location).attr('href', url);

             	},function (xhr, status, err) {
                    console.log(status);
                     $.notify("Something went wrong during Registration!", "error");
             });
        }
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

function postAjaxCallForPropetyService(endPoint ,obj,callback,val){
var hostURL = getHostPURL();
var tokenData = JSON.parse(localStorage.getItem("tokenData"));
var accesstoken = tokenData.access_token;
console.log("########## accesstoken"+accesstoken)

var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "POST",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							data : JSON.stringify(obj),
							beforeSend: function (xhr){ 
                         xhr.setRequestHeader('Authorization',  "Bearer "+accesstoken); 
                   },
							
						}).done(function (responseData, status, xhr) {
                       
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;
}


function getAjaxCallForUserService(endPoint){
	var hostURL = getHostURLFORUSERSERVICE();

	var tokenData = JSON.parse(localStorage.getItem("tokenData"));
var accesstoken = tokenData.access_token;
console.log("########## accesstoken"+accesstoken)

	var promise = 	$.ajax({
		                   crossDomain: true,
							url : hostURL+endPoint,
							type : "GET",
							dataType : "json",
							contentType : "application/json",
						    headers: {"Authorization": "Bearer "+accesstoken},
							
						}).done(function (responseData, status, xhr) {
     
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;
}


function getHostURLFORUSERSERVICE(){
var hostURL = "https://immovable-property-service-kushalbajji-dev.apps.sandbox.x8i5.p1.openshiftapps.com"
   return hostURL;

}


function getHostPURL(){

 var hostURL ="https://immovable-property-service-kushalbajji-dev.apps.sandbox.x8i5.p1.openshiftapps.com"
   return hostURL;
}


