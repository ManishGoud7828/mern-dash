const router = require("express").Router();
const Products = require("../model/Productmodel");
const multer = require('multer');
let path = require('path');
const { v4: uuidv4 } = require('uuid');



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
  }


let upload = multer({ storage, fileFilter });


router.route('/add').post(upload.single('photo'), (req, res) => {
    const product = req.body.product;
    const price = req.body.price;
    const category = req.body.category;
    const discription = req.body.discription;
  
    const photo = req.file.filename;
  
    const newUserData = {
      product,
      price,
      discription,
      photo,
      category
  
    }
  
    const newUser = new Products(newUserData);
  
    newUser.save()
           .then(() => res.json('User Added'))
           .catch(err => res.status(400).json('Error: ' + err));
  });


//   Product get api


router.get("/getpro",async(req,res)=>{
    try {
        const prodata = await Products.find();
        res.status(201).json(prodata)
        console.log(prodata);
    } catch (error) {
        res.status(422).json(error);
    }
})






// get invidual product

router.get("/getproduct/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const proindividual = await Products.findById({_id:id});
        console.log(proindividual);
        res.status(201).json(proindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})






// update product data

router.patch("/updateproduct/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updatedpro = await Products.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updatedpro);
        res.status(201).json(updatedpro);

    } catch (error) {
        res.status(422).json(error);
    }
})




// delete product
router.delete("/deleteproduct/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletpro = await Products.findByIdAndDelete({_id:id})
        console.log(deletpro);
        res.status(201).json(deletpro);

    } catch (error) {
        res.status(422).json(error);
    }
})






    
  








  module.exports = router;


