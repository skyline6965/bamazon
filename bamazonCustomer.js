require('dotenv').config()
var mysql = require("mysql");

var inquirer = require("inquirer");


// create mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    // password: process.env.mysqlpassword,
    password: "gcvAm58076!",
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

    connection.query("SELECT * FROM products", function (err, results) {
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
                    // console.log(choiceArray);
                    return choiceArray;

                },
                message: "Using the 'item_id', enter which item you'd like to purchase."
            }, {
                name: "choiceAmt",
                type: "input",
                message: "How many would you like to purchase?"
            }]).then(function (answer) {
                console.log(answer);
                var chosenItem = answer.products;
                // take the id of the item and remove the quantity the customer wants from our stock.
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                sellItem
                console.log(chosenItem);

            })


    })

};

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// create a function that takes users order and checks to see if quantity is sufficent. 