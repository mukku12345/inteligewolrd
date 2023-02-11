const db = require("../model")

const Speakers = db.tables.Speakers;


//CREATE
exports.createSpeakers = (req,res)=>{
    //validating request

    if(!req.body.name){
        res.status(400).send({message:"content can not be empty"})
    }
   

    const speakers = new Speakers({

        // id:req.body.id,
        name:req.body.name,
    })
   

    speakers.save(speakers)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the Speakers."
        })
    })

}



//findingalldata

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Speakers.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Speakerss."
        });
      });
  };
  
  //findOne
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Speakers.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Speakers with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Speakers with id=" + id });
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
  
    Speakers.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Speakers with id=${id}. Maybe Speakers was not found!`
          });
        } else res.send({ message: "Speakers was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Speakers with id=" + id
        });
      });
  };
  
  
  //delete an object
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Speakers.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Speakers with id=${id}. Maybe Speakers was not found!`
          });
        } else {
          res.send({
            message: "Speakers was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Speakers with id=" + id
        });
      });
  };
  
  //delete all object
  exports.deleteAll = (req, res) => {
    Speakers.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Speakerss were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Speakerss."
        });
      });
  };
  
  
  //find all object by condition
  
  exports.findAllPublished = (req, res) => {
    Speakers.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Speakerss."
        });
      });
  };
  