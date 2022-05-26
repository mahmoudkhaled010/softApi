const express = require("express");
const router = express.Router();
const learnerModel = require("../models/learnermodel");


//get 

router.get('/getlearner',async(req,res)=>{
    try{
        const getlearner = await learnerModel.find()
        res.json(getlearner)
        }catch(error){
            res.json({message:error})

    }
})


//post 
router.post('/postlearn',async(req,res)=>{
    const learn = new learnerModel({
    
      
        learnername: req.body.learnername,
        college: req.body.college,
        department:req.body.department,
        grade:req.body.grade,
        email:req.body.email,
        course1:req.body.course1,
        course2:req.body.course2,
        phonenumber:req.body.phonenumber
    })
    try {
        const postlearn = await learn.save();
        res.json(postlearn);
      } catch{
        res.json("error")
      }
    })
    

//get by id
router.get('/getlearnerbyid/:id',async(req,res)=>{
    try{
        const getlearner = await learnerModel.findById(req.params.id)
        res.json(getlearner)
        }catch(error){
            res.json({message:error})

    }
})

//Update learner by id
router.put("/updatelearner/:id", async (req, res) => {
    try {
      
  
      const UPlearner = await learnerModel.updateOne({_id:req.params.id},
          {$set:{learnername: req.body.learnername,
            college: req.body.college,
            department:req.body.department,
            grade:req.body.grade,
            email:req.body.email,
            course1:req.body.course1,
            course2:req.body.course2,
            phonenumber:req.body.phonenumber
            }});
      res.send(UPlearner);
    } catch (error) {
      res.json({ message: error});
    }
  });



  //Delete learner by id
  router.delete("/deletelearner/:id", async (req, res) => {
    try {  
      const rm = await learnerModel.remove({_id:req.params.id})
  
      res.json(rm);
    } catch (error) {
      res.json({ message: error});
    }
  });





module.exports = router;
