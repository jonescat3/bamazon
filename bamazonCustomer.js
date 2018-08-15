var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

// var id = prompt("Please enter product id");
// var quantity = prompt("Please enter quantity");

function start(){
    //prints the items for sale and their details
    connection.query('SELECT * FROM Products', function(err, res){
      if(err) throw err;
        console.log("this is the response", res)
      console.log('**Welcome to Bamazon Product Services**')
      console.log('----------------------------------------------------------------------------------------------------')
    
      for(var i = 0; i<res.length;i++){
        console.log("ID: " + res[i].ID + " | " + "Product Name: " + res[i].product_name + " | " + "Department Name: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock Quantity: " + res[i].stock_quantity);
        console.log('--------------------------------------------------------------------------------------------------')
      }

//prompt for customer to enter information
console.log(' ');
inquirer
  .prompt([
      {
        type: "input",
        message: "Please enter product ID",
        name: "product ID", 
        validate: function(value){
            if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
              return true;
            } else{
              return false;
            }
          },
        },

      {
        type: "input",
        message: "*Please enter the quantity*",
        name: "quantityAmount",
        validate: function(value){
            if(isNaN(value)){
              return false;
            } else{
              return true;
            }
          },
      },
  ]) 


  //the promise allows you to call a method "then" that lets you specify the function to use as the callbacks
.then(function(inquirerResponse) {
// product and id variables
    // var id = prompt("Please enter product id");
    // var quantity = prompt("Please enter quantity");
    var item = (ans.id)-1;
    var quantity = parseInt(ans.qty);
    var totalCost = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));

    if (inquirerResponse.confirm) {
     console.log(id);
     console.log(quantity);

     //check if quantity is sufficient
     if(res[item].StockQuantity >= quantity){
        //after purchase, updates quantity in Products
        connection.query("UPDATE Products SET ? WHERE ?", [
        {StockQuantity: (res[item].StockQuantity - quantity)},
        {ItemID: ans.id}
        ], function(err, result){
            if(err) throw err;
            console.log("Success! Your total is $" + totalCost.toFixed(2) + ". Thank you. Your item(s) will be shipped to you in 1-2 business days.");
        });

        connection.query("SELECT * FROM Departments", function(err, deptRes){
          if(err) throw err;
          var index;
          for(var i = 0; i < deptRes.length; i++){
            if(deptRes[i].DepartmentName === res[item].DepartmentName){
              index = i;
            }
          }

          //updates totalSales in department table
          connection.query("UPDATE Departments SET ? WHERE ?", [
            {TotalSales: deptRes[index].TotalSales + totalCost},
            {DepartmentName: res[item].DepartmentName}
            ], function(err, deptRes){
                if(err) throw err;
                //console.log("Updated Dept Sales.");
            });
          });
  
    } else{
        console.log("*Sorry, there's not enough of this item in stock!*");
      }

      reprompt();
    }
});
})
}

//asks if they would like to purchase another item

function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "*Would you like to purchase another item?*"
  }]).then(function(ans){
    if(ans.reply){
      start();
    } else{
      console.log("Thank You, See You Soon!");
    }
  });
}

start();



