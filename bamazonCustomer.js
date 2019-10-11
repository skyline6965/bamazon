require('dotenv').config();
var mysql = require("mysql");

var pw = require("./pw.js");

var inquirer = require("inquirer");


// create mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    // password: process.env.mysqlpassword,
    password: pw.pw,
    database: "bamazon_db"
});


// connect to db
connection.connect(function (err) {
    if (err) throw err;
    readProducts();
});

// user will be shown a table of available items to purchase

function readProducts() {
    // console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        start(res);
        //   connection.end();
    });
};

function start(products) {
    inquirer.prompt({
        name: "Welcome",
        type: "list",
        message: "Feeling over-burdened by money?",
        choices: ["Purchase", "EXIT"]
    }).then(function (answer) {
        if (answer.Welcome === "Purchase") {
            purchaseItem(products);
        } else {
            connection.end();

        }
    })
}

// app will prompt user with two options
function purchaseItem(products) {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "choice",
                type: "input",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].item_id);
                    }
                    return choiceArray;
                },
                message: "Using the 'item_id', enter which item you'd like to purchase.",
            }, {
                name: "choiceAmt",
                type: "input",
                message: "How many would you like to purchase?"
            }]).then(function (sale) {
                var itemQty;
                var itemPrice;
                var itemName;
                for (var j = 0; j < results.length; j++) {
                    if (parseInt(sale.choice) === results[j].item_id) {
                        itemQty = results[j].stock;
                        itemPrice = results[j].price;
                        itemName = results[j].product_name;
                    }
                }
                if (parseInt(sale.choiceAmt) > itemQty) {
                    console.log("--------------------------------------------------------------")
                    console.log(" ")
                    console.log("Insufficient in stock! We have " + itemQty + " in stock. Please try again.");
                    purchaseItem();
                } else if (parseInt(sale.choiceAmt) <= itemQty) {
                    console.log("You have just purchased " + sale.choiceAmt + " of " + itemName + ".");
                    adjInv(sale.choice, sale.choiceAmt, itemQty, itemPrice);
                }
            });
    });
};


function adjInv(item, customerQty, stockQty, price) {
    var totalCost = parseInt(customerQty) * price;
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock: stockQty - parseInt(customerQty)
            },
            {
                item_id: parseInt(item)
            }
        ],
        function (err, response) {
            if (err) throw err;
            console.log("The total price of your purchase is $" + totalCost)
        }
    );
    readProducts();
};

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// create a function that takes users order and checks to see if quantity is sufficent. 