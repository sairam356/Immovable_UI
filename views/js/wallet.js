function deposit(){
	var amount = $('#enteredAmount').val();
	console.log(amount);
	var custId  = localStorage.getItem("customerId");
	var url=  "wallet/getInfo/"+custId;
		const transaction = {
		customerId: localStorage.getItem("customerId"),
  		transactionType: "DEPOSIT",
  		transactionStatus: "SUCCESS",
  		amount: Number(amount)
		};
		var url=  "wallet/transaction";
	postAjaxCall(url,transaction,callbackDW).then(function (data){
		if (data !=null) {
			$(location).attr('href', "./homepage.html");
		}

	},function (xhr, status, err) {
	$.notify("Something went wrong during the transaction update!", "error");
     console.log(status, err);
	});
}

function callbackDW(){
	console.log('log added');
}

function withdraw(){
	var amount = $('#enteredAmount').val();
	console.log(amount);
	var custId  = localStorage.getItem("customerId");
	const transaction = {
  customerId: custId,
  transactionType: "WITHDRAW",
  transactionStatus: "SUCCESS",
  amount: Number(amount)
};
var url=  "wallet/transaction";
postAjaxCall(url,transaction,callbackDW).then(function (data){
	if (data !=null) {
         $(location).attr('href', "./wallet.html");
	}

},function (xhr, status, err) {
     console.log(status, err);
      $.notify("Something went wrong during the transaction update!", "error");
});

}


function getWalletInfoById(){
	
	//var url=  "wallet/getInfo/walletId="+querParams;
	var custId  = localStorage.getItem("customerId");
	var url=  "wallet/getInfo/"+custId;
	getAjaxCall(url).then(function (data){
		var htmlData = "";
		console.log(data);
		$("#balance").append(data.balance);
		localStorage.setItem("showBalance", data.balance);
var transactions = data.walletTransactions;
for (let i = 0; i < transactions.length; i++) {
			           
			      htmlData = htmlData+`
			           					<tr>
			                                <td>${i+1}</td>
			                                <td>${transactions[i].transactionType}</td>	           
			                                <td>${transactions[i].transactionStatus}</td>
			                                <td>${transactions[i].createdDate}</td>
			                                <td>${transactions[i].amount}</td>
			                            </tr>`;
				}


  	$("#showTransactions").html(htmlData);


	},function (xhr, status, err) {
	$.notify("Something went wrong while fetching the data!", "error");
     console.log(status, err);
  	});
}

function getBalance(){
var bal = localStorage.getItem("showBalance");
    $("#showBalance").append(bal);
}

