const { Router } = require("express");
const express = require("express");
const router = express.Router();

const Model = require("../models/model");


//get 

router.get('/get',async(req,res)=>{
    try{
        const savedata = await Model.find()
        res.json(savedata)
        }catch(error){
            res.json({message:error})

    }
})

//post 
router.post('/',async(req,res)=>{
const users = new Model({

    username: req.body.username,
    password: req.body.password,
    email: req.body.email,

})
try {
    const savedata = await users.save();
    res.json(savedata);
  } catch{
    res.json("error")
  }
})


//get by id
router.get('/getbyid/:id',async(req,res)=>{
    try{
        const savedata = await Model.findById(req.params.id)
        res.json(savedata)
        }catch(error){
            res.json({message:error})

    }
})

//Update User by id
router.put("/update/:id", async (req, res) => {
  try {
    

    const UPdata = await Model.updateOne({_id:req.params.id},
        {$set:{username:req.body.username,
        password:req.body.password,
        email:req.body.email}});

    res.send(UPdata);
  } catch (error) {
    res.json({ message: error});
  }
});
 

//Delete by id
router.delete("/delete/:id", async (req, res) => {
    try {  
      const rm = await Model.remove({_id:req.params.id})
  
      res.json(rm);
    } catch (error) {
      res.json({ message: error});
    }
  });



module.exports = router;



