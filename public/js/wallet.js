function deposit(){
	var amount = $('#amount').val();
	console.log(amount);
	
	var url=  "wallet/getInfo/123"
	getAjaxCall(url).then(function (data){
		console.log(data);
	},function (xhr, status, err) {
     console.log(status, err);
	if(xhr.status == 404){
		const wallet = {
		customerId: "123",
		walletTransactions:[
				{
					transactionType: "DEPOSIT",
  					transactionStatus: "SUCCESS",
  					amount: amount
				}
			]
		};
	postAjaxCall("wallet/save",wallet,callbackDW).then(function (data){
		if (data != null) {
		window.location.href='./index.html';
		}

	},function (xhr, status, err) {
     console.log(status, err);
		});
	}});

		const transaction = {
		customerId: "123",
  		transactionType: "DEPOSIT",
  		transactionStatus: "SUCCESS",
  		amount: amount
		};
		var url=  "wallet/transaction";
	postAjaxCall(url,transaction,callbackDW).then(function (data){
		if (data !=null) {
			window.location.href='./index.html';
		}

	},function (xhr, status, err) {
     console.log(status, err);
	});
}

function callbackDW(){
	console.log('log added');
}

function withdraw(){
	var amount = $('#amount').val();
	console.log(amount);
	const transaction = {
  customerId: "123",
  transactionType: "WITHDRAW",
  transactionStatus: "SUCCESS",
  amount: amount
};
var url=  "wallet/transaction";
postAjaxCall(url,transaction,callbackDW).then(function (data){
	if (data !=null) {
		window.location.href='./index.html';
	}

},function (xhr, status, err) {
     console.log(status, err);
});

}


function getWalletInfoById(){
	var querParams = getUrlVars()["customerId"];
	//var url=  "wallet/getInfo/walletId="+querParams;
	var url=  "wallet/getInfo/123"
	getAjaxCall(url).then(function (data){
		var htmlData = "";
		console.log(data);
		$("#balance").append(data.balance);
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
     console.log(status, err);
  	});
}