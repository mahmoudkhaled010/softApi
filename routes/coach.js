const express = require("express");
const router = express.Router();
const postModel = require("../models/postmodel");

//get 

router.get('/getcoach',async(req,res)=>{
    try{
        const get = await postModel.find()
        res.json(get)
        }catch(error){
            res.json({message:error})

    }
})


//post 
router.post('/postcoach',async(req,res)=>{
    const coach = new postModel({
    
        coursetitle: req.body.coursetitle,
        courseduration: req.body.courseduration,
        courceprice: req.body.courceprice,
        coachname:req.body.coachname,
        coachemail:req.body.coachemail
    
    })
    try {
        const post = await coach.save();
        res.json(post);
      } catch{
        res.json("error")
      }
    })

//get by id
router.get('/getcoachbyid/:id',async(req,res)=>{
    try{
        const get = await postModel.findById(req.params.id)
        res.json(get)
        }catch(error){
            res.json({message:error})

    }
})


//Update coach by id
router.put("/updatecoach/:id", async (req, res) => {
    try {
      
  
      const UPcoach = await postModel.updateOne({_id:req.params.id},
          {$set:{coursetitle:req.body.coursetitle,
            courseduration:req.body.courseduration,
             courceprice:req.body.courceprice,
             coachname:req.body.coachname,
             coachemail:req.body.coachemail
            }});
      res.send(UPcoach);
    } catch (error) {
      res.json({ message: error});
    }
  });



  //Delete coach by id
router.delete("/deletecoach/:id", async (req, res) => {
    try {  
      const rm = await postModel.remove({_id:req.params.id})
  
      res.json(rm);
    } catch (error) {
      res.json({ message: error});
    }
  });










module.exports = router;
