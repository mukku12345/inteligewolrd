const { isObjectIdOrHexString } = require("mongoose");
// const { default: Topic } = require("../../../fronted/my-goal/src/components/Topic");
const db = require("../model")

const Topics = db.tables.Topics;

//CREATE
exports.createTopics = (req,res)=>{
    //validating request

    if(!req.body.name){
        res.status(400).send({message:"content can not be empty"})
    }


    const topics = new Topics({
       
        // id:req.body.id,
        name:req.body.name,
    })

    topics.save(topics)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the Topics."
        })
    })

}



///populating

// exports.findPopulating =async (req,res)=>{
//   const populateData = await Topics.find({_id:req.body.populate_id}).populate('_id');
//       res.send(populateData)

// }





//findingalldata

exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    // const obj_ids = Topics.map((item)=>{
    //   return ObjectId(item)
    // })
  
    Topics.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Topicss."
        });
      });
  };
  
  //findOne
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Topics.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Topics with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Topics with id=" + id });
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
  
    Topics.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Topics with id=${id}. Maybe Topics was not found!`
          });
        } else res.send({ message: "Topics was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Topics with id=" + id
        });
      });
  };
  
  
  //delete an object
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Topics.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Topics with id=${id}. Maybe Topics was not found!`
          });
        } else {
          res.send({
            message: "Topics was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Topics with id=" + id
        });
      });
  };
  
  //delete all object
  exports.deleteAll = (req, res) => {
    Topics.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Topicss were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Topicss."
        });
      });
  };
  
  
  //find all object by condition
  
  exports.findAllPublished = (req, res) => {
    Topics.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Topicss."
        });
      });
  };
  