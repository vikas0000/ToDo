const express=require("express");
const path =require('path');

const db = require("./config/mongoose");

const List = require("./models/contact");

const port=8000;
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('asserts'))


var contactList=[

    {
        discription:'This is the list1',
        date:'27/12/1996',
        category:'School'
    },
    {
        discription:'This is the list2',
        date:'27/12/1996',
        category:'work'

    },
    {
        discription:'This is the list3',
        date:'27/12/1996',
        category:'Office'

    }
]

app.get('/',function(req,res){

    //res.send('<h1>cool, it working</h1>');

    List.find({},function(err,data){

        if(err){
            console.log('error in display contact in db');
            return;
        }
        return res.render('home',{

            title:'ToDo list',
            contact_list:data
    
        });


    });
    
    

});


app.post('/create_list', function(req,res){
    
   /* contactList.push({
        name:req.body.name,
        phone:req.body.phone
    });
    */
    //contactList.push(req.body);

    List.create({
        discription: req.body.discription,
        date: req.body.date,
        category: req.body.category

    }, function(err, data){
        if(err){
            console.log("error in creating list");
            return;
        }
        console.log("##########", data);
        return res.redirect('back');
    });

});

app.get('/delete-list',function(req,res){

    let id = req.query.id;

    List.findByIdAndDelete(id, function(err){

            if(err){
                console.log('error in deleting');
                return;
            }
            return res.redirect('back');
    });
 
});


app.listen(port, function(err){

    if(err){
        console.log("error");
    }
    console.log("perfect working port ", port);
});