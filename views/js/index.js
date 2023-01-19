
$(document).ready(function() {



	$("#signOutApp").click(function(event) {
		event.preventDefault();
        localStorage.clear();
         var url = "./sign-in.html"
		$(location).attr('href', url);
    });



  	$("#addTOCart").click(function(event) {
			event.preventDefault();
            var querParams = getUrlVars()["propertyid"];
			var amount = $('#enterAmount').val();
			var custId  = localStorage.getItem("customerId");
			var obj ={};
			obj.customerId = custId;
			obj.price = amount;
			obj.propertyId = querParams;

           var url = 'cart';
           postAjaxCall(url,obj).then(function (resultObj) {
           	      console.log("################################")
                   console.log(resultObj);
                     	var url = "./mycart.html"
				      	$(location).attr('href', url);

                 
          },function (xhr, status, err) {
                 console.log(status, err);
           });

 

	});

	$("#depositAmountDashboard").click(function(event){
		    event.preventDefault();
			var url = "./deposit.html"
			$(location).attr('href', url);

	})



	$("#enteredAmount").on('change',function(){
         var  amount = $(this).val();
        
        $('#showChangedValue').html("₹ "+amount)
    });


   $("#updateUser").click(function(event) {
      event.preventDefault();
      var userResponse = JSON.parse(localStorage.getItem("userResponse"));

      var fname =   $("#inputFirstName").val();
      var  lname = $("#inputLastName").val();
      var email = $("#inputEmail").val();
      var mobileNum = $("#inputMobileNum").val();
      var  address = $("#inputAddress").val();
      var obj ={};

      obj.id = userResponse.id;
      obj.firstName = fname;
      obj.lastName = lname;
      obj.address = address;
      obj.email = email;
      obj.phone= mobileNum;

       var url = 'admin';
           postAjaxCall(url,obj).then(function (resultObj) {
           	      console.log("################################")
                   console.log(resultObj);
                   localStorage.setItem("userResponse", JSON.stringify(resultObj));
                     var url = "./profile.html"
				     	$(location).attr('href', url);

                 
          },function (xhr, status, err) {
                 console.log(status, err);
           });
   });


});


 $(function() { 
	  console.log("####### verifiying ")
	  var tokenData = JSON.parse(localStorage.getItem("tokenData"));
	  console.log(tokenData);
	  if(tokenData== null){
	  	 var url = "./sign-in.html"
		$(location).attr('href', url);
       }


    });


function getDashboardData(){
    var customerId  = localStorage.getItem("customerId");
    var url = 'customer/'+customerId;

	 getAjaxCall(url).then(function (data) {
			   var htmlData = "";
           
          console.log(data);

      var  propertyCounter = data.propertyCounter;
 
      var properites = data.propertyStack;

      var balance = data.wallet.balance;
     

     for (let i = 0; i < properites.length; i++) {

     		 var description = properites[i].property.propertyMetaData.description1;
		     const desp = description.split(":");
         
         htmlData = htmlData+`   
             <div class="col">
                  <div class="card h-100">
                    <a href="./propertiesdetails.html?propertyid=${properites[i].property.id}"><img src="${properites[i].property.imageUrl}" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                         <h5 class="card-title">${desp[0]}</h5>
                                           
                          <div class="btn-group btn-group-sm " role="group" aria-label="Small button group">
                            <button type="button" class="btn btn-outline-dark">${properites[i].property.country}</button>

                          </div>
                          <div class="btn-group btn-group-sm " role="group" aria-label="Small button group">
                            <button type="button" class="btn btn-outline-dark">${properites[i].property.name}</button>

                          </div>
                          <hr>
                          <p class ="left-align-text">Invested Amount<span class ="texttoright"><b>₹ ${properites[i].investedamount}</b></span></p>
                          <hr>
                            <center> <button type="button" class="btn btn-outline-dark texttocenter color-currency" onclick="showCustomerRenveueInfo('${data.id}:${properites[i].id}')">View Details</button></center>
                    </div>
                  
                       
                  </div>
                </div>`;

        }

      

        $('#propertyCounter').html(propertyCounter);

        if(properites.length>0){
       
         $('#dashbordData').html(htmlData);

         }else{
         	$('#noData').html("<center><h1>No Investments </h1></center><br><br><br> <br> <br>");
         }
      
        $('#balanceAmount').html("₹"+balance);
             
	   },function (xhr, status, err) {
	     console.log(status, err);
	  });


}

function  getPropertiesInfo(){


getAjaxCall('properties').then(function (data) {
			   var htmlData = "";
			   console.log(data);

				for (let i = 0; i < data.length; i++) {
					 var description = data[i].propertyMetaData.description1;
					 const desp = description.split(":");
			           
			      htmlData = htmlData+`<div class="col">
			    <div class="card h-100">
			      <a href="./propertiesdetails.html?propertyid=${data[i].id}"><img src=" ${data[i].imageUrl}" class="card-img-top" alt="..."></a>
			      <div class="card-body">

			        <div class="btn-group btn-group-sm " role="group" aria-label="Small button group">
			          <button type="button" class="btn btn-outline-dark">${data[i].country}</button>

			        </div>
			        <div class="btn-group btn-group-sm " role="group" aria-label="Small button group">
			          <button type="button" class="btn btn-outline-dark">${data[i].name}</button>

			        </div>

			         <p></p>
			           <h5 class="card-title">${desp[0]}</h5>
			           <p class="card-text text-bg-light p-3"> <b class="color-currency"> ₹ ${data[i].totalInvestmentCost} </b></p>
			           <table  class ="text-bg-light p-3  table table-borderless">
			           <tr> 
			                                <td>Projected return</td>
			                                <td>20%</td>
			                            </tr> 
			                            <tr>
			                                <td>Projected gross yield</td>
			                                <td>12%</td>
			                            </tr>
			                            <tr>
			                                <td>Projected net yield </td>
			                                <td>8%</td>
			                            </tr>
			                            <tr>
			                                <td>Average occupancy rate</td>
			                                <td>${data[i].occupancyRate} %</td>
			                            </tr>
			          
			          </table>
			      </div>
			    </div>
			  </div>`
				}

  	$("#showProperties").html(htmlData);

  
},function (xhr, status, err) {
     console.log(status, err);
  });

  
}

function loadPropertyById(){

   var querParams = getUrlVars()["propertyid"];
   var url=  "properties/"+querParams;
     	getAjaxCall(url).then(function (resultObj) {
           console.log(resultObj);
     	    var data = resultObj.property;

	        var description = data.propertyMetaData.description1;

	        var description2 = data.propertyMetaData.description2;

	        var desp = description.split(":");

	        var desp2 = description2.split(":");
           
	        $("#header1").html(desp[0]);
	        $("#header2").html(desp[1]);
	        $("#header3").html(desp[2]);
	        $("#header4").html(desp[3]);
	        $("#header5").html(desp2[0]);
	        $("#header6").html(desp2[1]);   
	        $('#tableData1P1').html("₹"+data.actualpropertyPrice);
			$('#tableData1P2').html("₹"+data.transcationCostPrice);
			$('#tableData2P3').html("₹"+data.propertyMetaData.annualGrossRent);
			$('#tableData2P4').html("₹"+data.propertyMetaData.serivceCharges);
			$('#tableData2P5').html("₹"+data.propertyMetaData.maintainceCharges);
            $("#tableData3P6").html(data.occupancyRate+"%");
            $('#totalPropertyPrice').append(`<center> ₹ ${data.totalInvestmentCost}</center>`);
            $("#fundedPerCentage").css("width",`${data.propertyStakeInfo.stake_funded}%`);
            $('#fundedPercentageInNum').append(`${data.propertyStakeInfo.stake_funded}% Funded`);
            $('#avaliableAmount').append(`₹ ${data.propertyStakeInfo.totalAvaliableAmount} Avaliable`);
            $('#annualNetIncome').append('₹'+data.propertyMetaData.annualNetIncome);
           


	},function (xhr, status, err) {
     console.log(status, err);
  });

}

function showCartItems(){
	 var custId  = localStorage.getItem("customerId");
	 var url = "cart/"+custId;
	 getAjaxCall(url).then(function (resultObj) {
            console.log(resultObj);
                localStorage.setItem("cartItems", JSON.stringify(resultObj));
           var listData = resultObj.cartItems;
           var  totalAmount = resultObj.totalAmount;
           var  htmlData ="";
      if(listData!=null){
				   
			for (let i = 0; i < listData.length; i++) {

						var data = listData[i].property;
						var description = data.propertyMetaData.description1;

					    var description2 = data.propertyMetaData.description1;

					    var desp = description.split(":");

					    var desp2 = description2.split(":");

					    var  perCent = parseFloat((100 * listData[i].price) / data.totalInvestmentCost).toFixed(2);

					    var amount = parseFloat((data.propertyMetaData.annualGrossRent/100)*perCent).toFixed(2);

					   var annualAmount =  parseFloat(amount*12).toFixed(2);
					    


				    htmlData  = htmlData+`
				    <div class="col-sm-8 mb-3 mb-sm-0" >
						    <div class="card mb-3" style="max-width: 740px;">
						          <div class="row g-0">
						            <div class="col-md-4">
						              <img src="${data.imageUrl}" class="img-fluid rounded-start" alt="...">
						            </div>
						            <div class="col-md-8">
						              <div class="card-body">
						                <h5 class="card-title">${desp[0]} <span class ="texttoright"  onclick="deleteCartItem('${listData[i].id}:${resultObj.id}')" >X</span></p></h5>     
						                   <div class="btn-group texttoright" style="margin-bottom: 25px;margin-top: 17px;" role="group" aria-label="Basic example">
						                   
						                   <input type="text" class="form-control" aria-label="Sizing example input" id ="${listData[i].id}" aria-describedby="inputGroup"  placeholder="2000" value ="${listData[i].price}" onblur="getUpdateAmount('${listData[i].id}:${resultObj.id}')"style="margin-top: 2px; width: 151px;">
						                  
						                  </div>
						                <h6 class="card-text text-muted">Monthly Returns</h6>
						                <p><b>₹ ${amount} </b></p>
						                 <h6 class="card-text text-muted">Yearly Appreciation Returns</h6>
						                <p><b>₹ ${annualAmount} </b></p>
						              </div>
						            </div>

						          </div>
						     </div>
						  </div>`
						  if(i == 0){
						  htmlData = htmlData+ `
						  <div class="col-sm-4">
						    <div class="card">
						      <div class="card-body">
						        <h5 class="card-title">Total Payment  <span class ="texttoright">Rupees ${totalAmount}</span></h5>
						         <button type="button" class="btn btn-outline-dark color-currency" onclick="processedToPayment()">Processed to Payment</button>      
						      
						        </div>
						      </div>
						    </div>`
				        }

				  }
        }
	    if(listData == null || listData.length == 0){
		     htmlData = htmlData+"<center><h1>No Cart Items </h1></center>"
		}

    
     $('#showCarItems').html(htmlData);

 
  },function (xhr, status, err) {
	     console.log(status, err);
	  });




}


function getUpdateAmount(cartItemId){

      console.log(cartItemId);
	 var cartData = cartItemId.split(":");

	 var cartId = cartData[1];

	 var cartItemId = cartData[0];

     var idUrl = `#${cartItemId}`;

     var  data  = $(idUrl).val();

     var url =  'cart/updateAmount';

    console.log(data);
    var obj ={};
     obj.amount = data;
     obj.cartItemId = cartItemId;
      putAjaxCall(url, obj).then(function (resultObj) {
            console.log(resultObj);
            	var url = "./mycart.html"
			    $(location).attr('href', url);

      },function (xhr, status, err) {
	     console.log(status, err);
	  });

}

function deleteCartItem(cartItemId){


	 var custId  = localStorage.getItem("customerId");

	 console.log(" cartItemId ##############"+cartItemId);


    var cartData = cartItemId.split(":");


     
     var itmsAryy =[];

     itmsAryy.push(cartData[0]);

     var obj ={};

     obj.cartId =cartData[1];
     obj.customerId = custId;
     obj.cartItemsIdsList= itmsAryy;

     var url ='cart/update';

     putAjaxCall(url, obj).then(function (resultObj) {
            console.log(resultObj);
            	var url = "./mycart.html"
			    $(location).attr('href', url);

      },function (xhr, status, err) {
	     console.log(status, err);
	  });


}

function showCustomerRenveueInfo(custPropertyStackData){
	 console.log("###############################");
	 console.log(custPropertyStackData);
     var data = custPropertyStackData.split(":");
     var customerId = data[0];
     var customerPropertYStake = data[1];

}

function processedToPayment(){
	console.log("###############################");
	   	var cartObj = JSON.parse(localStorage.getItem("cartItems"));
	   	var pstakeList =[];
        var obj ={}; 
        obj.customerId = cartObj.customerId;
        obj.cartAmount = cartObj.totalAmount;
       

        var cartItemsObj = cartObj.cartItems;


        for(let i =0;i<cartItemsObj.length;i++){
             var pstakeObj ={};
             pstakeObj.customerId = cartObj.customerId;
             pstakeObj.propertyId = cartItemsObj[i].property.id;
             pstakeObj.investmentAmount = cartItemsObj[i].price;
             pstakeObj.transcationType = "BUY";

             pstakeList.push(pstakeObj);

        }
          obj.propertyStakeReDTO = pstakeList;

      console.log(obj);

      var url = "customer/updateCustomerStake";      
      putAjaxCall(url, obj).then(function (resultObj) {
            console.log(resultObj);
                localStorage.removeItem("cartItems");
            	var url = "./homepage.html"
			    $(location).attr('href', url);

      },function (xhr, status, err) {
	     console.log(status, err);
	  });
}


function showUserInfoData(){
     var userResponse = JSON.parse(localStorage.getItem("userResponse"));

      $("#inputFirstName").val(userResponse.firstName);
      $("#inputLastName").val(userResponse.lastName);
      $("#inputEmail").val(userResponse.email);
      $("#inputMobileNum").val(userResponse.phone);
      $("#passPortNum").val(userResponse.passport);
      $("#inputAddress").val(userResponse.address);
      $("#inputUserName").val(userResponse.username);

}

function postAjaxCall(endPoint ,obj,callback){

	var hostURL = getHostURL();
		var tokenData = JSON.parse(localStorage.getItem("tokenData"));
var accesstoken = tokenData.access_token;
console.log("########## accesstoken"+accesstoken);


	var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "POST",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							data : JSON.stringify(obj),
							headers: {"Authorization": "Bearer "+accesstoken},
							
						}).done(function (responseData, status, xhr) {
     
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;

}

function getAjaxCall(endPoint){
	var hostURL = getHostURL();
			var tokenData = JSON.parse(localStorage.getItem("tokenData"));
var accesstoken = tokenData.access_token;
console.log("########## accesstoken"+accesstoken);

	var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "GET",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							headers: {"Authorization": "Bearer "+accesstoken},
							
						}).done(function (responseData, status, xhr) {
     
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;
}

function putAjaxCall(endPoint ,obj){
	var hostURL = getHostURL();
				var tokenData = JSON.parse(localStorage.getItem("tokenData"));
var accesstoken = tokenData.access_token;
console.log("########## accesstoken"+accesstoken);

	var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "PUT",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							data : JSON.stringify(obj),
							headers: {"Authorization": "Bearer "+accesstoken},
							
						}).done(function (responseData, status, xhr) {
     
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;
}

function deleteAjaxCall(endPoint){
     var hostURL = getHostURL();
     				var tokenData = JSON.parse(localStorage.getItem("tokenData"));
var accesstoken = tokenData.access_token;
console.log("########## accesstoken"+accesstoken);


	var promise = 	$.ajax({
							url : hostURL+endPoint,
							type : "DELETE",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							headers: {"Authorization": "Bearer "+accesstoken},
							
						}).done(function (responseData, status, xhr) {
     
                    
						 }).fail(function (xhr, status, err) {
						      
						 });

  return promise;
}




function getHostURL(){

 var hostURL= "http://localhost:8080/";
   return hostURL;
}




function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
