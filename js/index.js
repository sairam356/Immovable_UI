
$(document).ready(function() {

					
		getPropertiesInfo();




  	$("#addTOCart").click(function(event) {
			event.preventDefault();

			var amount = $('#enterAmount').val();


	});

});


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
			           <p class="card-text text-bg-light p-3"> <b class="color-currency"> ${data[i].currency} ${data[i].totalInvestmentCost} </b></p>
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
			                                <td>${data[i].occupancyRate} </td>
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

   var url=  "properties/id="+querParams;
	getAjaxCall().then(function (data) {


		var htmlData = "";

		htmlData = htmlData+` `;

	},function (xhr, status, err) {
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
