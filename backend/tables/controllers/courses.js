const { Router, query } = require("express");
const db = require("../model")

const Courses = db.tables.Courses;


//CREATE
exports.createCourses = (req,res)=>{
    //validating request

    if(!req.body.name){
        res.status(400).send({message:"content can not be empty"})
    }

    const courses = new Courses({

         name:req.body.name,
         img:req.body.img,
        topic_Id:req.body.topic_Id,
        priceRange:req.body.priceRange,
        description:req.body.description,
        url:req.body.url,
    })

    courses.save(courses)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the Cources."
        })
    });



}


//populating

exports.findPopulating =async (req,res)=>{
  // const populateData = await Courses.find({topic_Id:req.body.populate_id}).populate('topic_Id');
      // res.send(populateData)
  try{
     await Courses.find({topic_Id:{$in:[req.body.populate_id]}}).populate('topic_Id')
     .then(data=>{
       res.send(data);
     })
  }catch (err){
    console.log(err);
  }


}


exports.findAll = (req, res) => {
    const name = req.query.title;
    var condition =name ? {name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Courses.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Courcess."
        });
      });
};



  ////FIND ALL WITH CONDITIONS

  exports.findAllWithFilter = async(req, res) => {

    const topic_Id = req.query.topic_Id ? req.query.topic_Id.split(','):[];
    const priceRange = req.query.priceRange?req.query.priceRange.split(',').map(Number):[]
    const sortPrice = req.query.sortPrice?req.query.sortPrice:'';
    const date = req.query.date||"createdAt";
    // const search = req.query.search||"";
    console.log("p",priceRange);
    console.log("topic",topic_Id);


    //conditions for priceRanges

    let priceConditions = {};
    if(priceRange[0]===0){
      priceConditions={priceRange:{$eq:0}}

    }else
    if(priceRange[0]>=1500){
      priceConditions={priceRange:{$gte:1500}}

    }else
    if(priceRange[0]< priceRange[1] ){

      priceConditions={priceRange:{$gte:priceRange[0],$lte:priceRange[1]}}
    }else if(priceRange[0]>priceRange[1]){
      priceConditions={priceRange:{$lte:priceRange[0],$gte:priceRange[1]}}


    }
    else if(priceRange[0]){
      priceConditions={priceRange:{$lte:priceRange[0]}}
    }
    else if(priceRange[1]){
      priceConditions={priceRange:{$gte:priceRange[1]}}
    }
    
console.log(priceConditions);


//topic Conditions
let topicConditions = {};

// for(let i =0;i<topic_Id.length;i++){
  if(topic_Id.length===1){
  topicConditions={topic_Id:{$in:[topic_Id[0]]}}

} else if (topic_Id.length >=2) {
  topicConditions = { topic_Id: { $all: topic_Id} };
}

// }


// else

// if(topic_Id[0]){
//   topicConditions={topic_Id:{$eq:topic_Id}}

// }



// conditions for topic and price


    let conditions = {};
    if(req.query.topic_Id && req.query.priceRange){
      conditions={
        $and:[
              topicConditions ,
              priceConditions
            ]
      };
    }
       else if(req.query.topic_Id){
      // conditions={
      //   topic_Id:{$eq:topic_Id}
      // }
    conditions=  topicConditions
    }
    else if(req.query.priceRange){
      conditions=
        priceConditions

      
    }
     if(req.query.search){
      const search = req.query.search;

      conditions = {name:{$regex:search,$options:"i"}}
     }
 

//READ
    
    Courses.find(conditions)
    // .sort({priceRange:sortPrice,[date]:-1})
    .sort(sortPrice ? {priceRange: sortPrice} : {date:-1})
      .then(data => {
        if (!data.length)
          res.status(404).send("No ids matches");
        else {
        res.send(data,topic_Id,priceConditions);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send(err);
      });


        
  };




  
  //findOne
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Courses.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Cources with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Cources with id=" + id });
      });
  };
  
  //update
  
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Courses.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Cources with id=${id}. Maybe Cources was not found!`
          });
        } else res.send({ message: "Cources was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Cources with id=" + id
        });
      });
  };
  
  
  //delete an object
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Courses.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Cources with id=${id}. Maybe Cources was not found!`
          });
        } else {
          res.send({
            message: "Cources was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cources with id=" + id
        });
      });
  };
  
  //delete all object
  exports.deleteAll = (req, res) => {
    Courses.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Courcess were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Courcess."
        });
      });
  };
  
  
  //find all object by condition
  
  exports.findAllPublished = (req, res) => {
    Courses.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Courcess."
        });
      });


      //filter sorting pagination 


        

  };
  