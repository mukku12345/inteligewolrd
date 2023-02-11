const { default: mongoose } = require("mongoose");
const db = require("../model")

const Course_Speakers = db.tables.Course_Speakers;



//CREATE
exports.createCourceSpeakers = (req,res)=>{
    //validating request
 

    if(!req.body.speaker_id){
        res.status(400).send({message:"content can not be empty"})
    }

    const course_speakers = new Course_Speakers({

        course_id:req.body.course_id,
        speaker_id:req.body.speaker_id,

    })

    course_speakers.save(course_speakers)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the cource_speakers."
        })
    })

 


}

//Read


exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Course_Speakers.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Cource_Speakerss."
        });
      });
  };
  
  //findOne
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Course_Speakers.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Cource_Speakers with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Cource_Speakers with id=" + id });
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
  
    Course_Speakers.findByIdAndUpdate({_id:req.params.id},{$set:{course_id:req.body.courcesId,speaker_id:req.body.speakerId}},{new:true})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Cource_Speakers with id=${id}. Maybe Cource_Speakers was not found!`
          });
        } else res.send({ message: "Cource_Speakers was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Cource_Speakers with id=" + id
        });
      });
  };
  
  
  //delete an object
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Course_Speakers.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Cource_Speakers with id=${id}. Maybe Cource_Speakers was not found!`
          });
        } else {
          res.send({
            message: "Cource_Speakers was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cource_Speakers with id=" + id
        });
      });
  };
  
  //delete all object
  exports.deleteAll = (req, res) => {
    Course_Speakers.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Cource_Speakerss were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Cource_Speakers."
        });
      });
  };
  
  

  ///populating


exports.findPopulating =async (req,res)=>{
  const populateData = await Course_Speakers.find({course_id:req.body.populate_id}).populate('course_id').populate('speaker_id');
      res.send(populateData)

}
  
