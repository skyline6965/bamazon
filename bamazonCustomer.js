var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "gcvAm58076!",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    readProducts();
});

// user will be shown a table of available items to purchase

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        start();
          console.table(res);
        //   connection.end();
    });

}

// app will prompt user with two options

function start() {
    inquirer.prompt({
        name: "Welcome",
        type: "list",
        message: "Feeling over-burdened by money?",
        choices: ["Purchase", "EXIT"]
    }).then(function (answer) {
        if (answer.Welcome === "Purchase") {
            purchaseItem();
        } else {
            connection.end();
            
        }
    })
}

function purchaseItem() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].item_id);
                }
                return choiceArray;
            },
            message: "Kahjit has wares if you have coin."
        }).then(function (answer) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === answer.choice) {
                    chosenItem = results[i];
                }
            }
        })
    })
};

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// create a function that takes users order and checks to see if quantity is sufficent. 