/*MySQL password section and .env settings*/
require("dotenv/config")
const keys = require("./keys.js");

const mySQLPass = (keys.mySQLPass);

const mySQL = require("mysql");
const inquirer = require("inquirer");

const connection = mySQL.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "Wolviver24",
    database: "bamazon"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Server has successfully connected");
});

/*Start function called to start Bamazon process*/
start();
/*"start" function defined*/
function start() {
    connection.connect(function(err) {
        if(err) console.log(err);
        console.log('Connected as id' + connection.threadId);
        console.log('Hi user, welcome to our Bamazon node app')
        console.log('======================================================================================================================================\n')
        console.log('Select your product from our inventory displayed below!')
        showTable();

    })
}

/*Init table function with console.table and "promptQuestions" function*/
function showTable() {
    var table = "SELECT * FROM products"; 
    connection.query(table, function(err, res) {
        if(err) console.log(err);
        console.table(res);
         /*Prompt questions*/
         promptQuestions();
    })
}


/*Question promt and array function section*/
function promptQuestions() {
    inquirer.prompt([
        {
          name: "itemID",
          type: "input",
          message: "Please enter product ID for product you want.",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }, 
        {
          name: "itemQuantity",
          type: "input",
          message: "How many units do you want?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false
          }
        }]).then(function(ans) {
            /*Table variable*/
            var table = "SELECT stock_quantity, price, product_sales FROM products WHERE ?";
            connection.query(table, {item_id: ans.itemID}, function(err, res) {
              if (err) console.log(err);
              /*Possible response selections are assigned an index[]*/
              var item_stock = res[0].stock_quantity;
              var item_price = res[0].price;
              var item_sales = res[0].product_sales;

              /*Use conditional to make sure that the quantity is enough to run "purchase" event, if not enough run "promptQuestions" again*/
              if (item_stock >= ans.itemQuantity) {
                purchase(item_stock, item_price, item_sales, ans.itemID, ans.itemQuantity);
                } else {
                  console.log("There isn't enough stock left!");
            
                  promptQuestions();
            }
          });
        });
      }
    
    /*Set purchase action as constant function which dynamically changes the item data*/
    const purchase = function(availableStock, price, item_sales, selectedItemID, selectedItemStock) {
        var updatedStockQuantity = availableStock - selectedItemStock;

        var priceTotal = price * selectedItemStock;

        var updatedItemSales = parseInt(item_sales);

        var table = "UPDATE products SET ? WHERE ?";
        connection.query(table, [{
          stock_quantity: updatedStockQuantity,
          product_sales: updatedItemSales
        }, 
        {item_id: selectedItemID}
        ],  function(err, res) {

            if (err) console.log(err);
          
            console.log("Congrats your purchase is successful!");
        
            console.log("Your payment has been made in the amount of: " + "$" + priceTotal);
            promptQuestions();
          });
    };


