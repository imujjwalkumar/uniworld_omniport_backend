var express = require('express');

const Router = express.Router();
var database = require('./database.js')
var product_list = require('./product_list.js')
Router.get('/presentAllProducts', presentAllProducts)
Router.post('/checkout', checkout)
module.exports = Router;

//login register
//define db schema
function presentAllProducts(req, res) {
    res.send(product_list)
}

// function addToCart (req,res){
//     let params = req.body
//     // if(params.catogory=='Chairs'){

//     // } else if(params.catogory=='Table'){

//     // } else if(params.catogory=='Top'){

//     // }
//     let carItem=product_list.find((item)=>{
//         params.product_list.find(eachProduct=>{
//             item.id==eachProduct.id
//         })
//     })
//     res.send(carItem)

// }

function checkout(req, res) {
    console.log(req.body)
    let item_list = req.body.item_list
    let user = req.body.user
    let userSql = `select * from users where id='${user.id}'`

    //db query to fetch user data from user table

    database.query(userSql, (err, userData) => {
        console.log(userData)
        // if(){}
    })

    let amount = Object.values(item_list).reduce((acc, currentvalue) => {
        return acc + currentvalue.price;
    }, 0)

    //db query to insert order data into order table
    let orderId = function generateRandomId() {
        return Math.floor(Math.random() * 1000); // Change as needed
    }()
    let orderSql = `insert into orders values('${orderId}','${amount}','${user.id}','${getCurrentDate()}');`//use autoincrement
    function getCurrentDate() {
        const now = new Date();
        return now.toISOString().split('T')[0]; // Get date part only
    }
    database.query(orderSql, (err, orderData) => {
        if (err)
            console.log(err)
    })
    for (let [id, eachorder] of Object.entries(item_list)) {
        if (eachorder.category == 'Chairs') {
            //db query to insert order data into order_chairs table
            let order_chair_Sql = `insert into order_chairs (order_id,chair_id) values('${orderId}','${id}');`
            database.query(order_chair_Sql, (err, orderData) => {
                if (err)
                    console.log(err)
            })

        } else if (eachorder.category == 'Table') {
            //db query to insert order data into order_tables table
            let order_table_Sql = `insert into order_tables(order_id,table_id) values('${orderId}','${id}');`
            database.query(order_table_Sql, (err, orderData) => {
                if (err)
                    console.log(err)
            })

        } else if (eachorder.category == 'Top') {
            //db query to insert order data into order_tops table
            let order_top_Sql = `insert into order_tops(order_id,top_id) values('${orderId}','${id}');`
            database.query(order_top_Sql, (err, orderData) => {
                if (err)
                    console.log(err)
            })
        }
    }
    res.send(`succesfully chekcout order of Rs '${amount}'`)
}

