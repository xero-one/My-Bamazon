var mySQL = require("mySQL");
var inquirer = require("inquirer");

var connection = mySQL.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    
    password:"",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Server has successfully connected: " + "\n" + connection.threadID + "\n");
});

start();

function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) console.log(err);
        console.log('Hi user, welcome to our Bamazon node app')
	    console.log('========================================\n')
        res.for(row => {`
        Id: ${row.item_id} 
        Name: ${row.product_name} 
        Price: ${row.price}\n
        ` 

        /*Prompt questions*/
        promptQuestions();
        }); 
    })
}

/*Question promt and array function section*/
function promptQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "What is the Item ID of the product you wish to purchase?",
            /*validate response*/
            validate: function(value){
                if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                    return true;
                } else{
                    return false;
                }
              }
            },
          {
            type: "input",
            name: "qty",
            message: "How many you need to purchase?",
            /*validate response*/
            validate: function(value){
                if(isNaN(value)){
                    return false;
                } else{
                    return true;	
                }
              }
            }    
    ]).then(function(ans) {
        var itemSelected = ans.id;
        var itemQuantity = ans.qty;
        minusItem(itemSelected, itemQuantity);
    });
}

/*Define function minus*/
function minusItem(itemSelected, itemQuantity) {
    connection.query("SELECT * FROM products", function(error, res) {
        if(err) throw error;
        var item;
        for(var i=0;i<res.length;i++) {
            if(res[i].item_id == itemSelected) {
                item = res[i]
            } 
        }
        console.log(item, "item is in stock!");
        console.log("========================================\n");
        if(item.stock_quantity >= itemQuantity) {
            orderDone(item, itemSelected, itemQuantity);
            
            /*Sever connection*/
            connection.end(console.log("Sealing connection for security"));
        } else {
            console.log("Insufficient stock for this item, your order can't be completed");
            connection.end(console.log("Sealing connection for security"));
            
            /*Ask if user wants to buy another product or search for another product*/
            reprompt();
    }

    })
}

/*Define function "orderDone"*/
function orderDone(itemObject, itemSelected, itemQuantity) {
    var updateQuantity = itemObject.stock_quantity - itemQuantity;
    var itemSales = itemObject.price * itemQuantity;
    var queryOne = "UPDATE products SET stock_quantity = ? where ?";
    var queryTwo = "UPDATE products SET product_sales = ? where ?";
    connection.query(queryOne,[updateQuantity, {item_id: itemSelected}], function (error, res) {
    })
    connection.query(queryTwo, [itemSales, {item_id: itemSelected}], function (error, res) {
    })
  }

function reprompt(){
	inquirer.prompt([{
		type: "confirm",
		name: "reply",
		message: "Would you like to make another purchase?"
	}]).then(function(ans){
		if(ans.reply){
			start();
		} else{
            console.log("Were sorry to see you go... thank you for shopping at Bamazon!");
            connection.end(console.log("Sealing connection for security"));
		}
	});
}

var PORT = process.env.PORT || 3000;



