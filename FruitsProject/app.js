const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});

//structure of data
const fruitSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, "No name specified!!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String 
})

const Fruit = mongoose.model("Fruit", fruitSchema)

const fruit = new Fruit({
    name: "Apple", 
    rating: 34,
    review: "Pretty solid as fruit."
})

// Fruit.find({ name: "Apple" }).remove().exec();
// fruit.save()

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema)

const mango = new Fruit({
    name: "Mango",
    score: 10, 
    review: 'Delicious'
})
mango.save();

Person.updateOne({name: "John"}, {favoriteFruit: mango}, function(err){
    if (err){
        console.log(err)
    }else{
        console.log("success!!")
    }
})

// const person = new Person({
//     name: "John", 
//     age: 37
// })

// const person = new Person({
//     name: "Amy",
//     age: 12, 
//     favoriteFruit: pineapple
// })

// person.save()

const kiwi = new Fruit({
    name: "Kiwi", 
    rating: 10,
    review: "The best fruit."
})

const orange = new Fruit({
    name: "Orange", 
    rating: 8,
    review: "Sour."
})

const banana = new Fruit({
    name: "Banana", 
    rating: 9,
    review: "Healthy."
})

// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if (err){
//         console.log(err)
//     }else{
//         console.log("Succesfully saved all the fruits to fruitsDB!")
//     }
// });

Fruit.find(function(err, fruits){
    if (err){
        console.log(err)
    }else{
        mongoose.connection.close();
        fruits.forEach(function(fruit){
            console.log(fruit.name)
        })
    }
})

