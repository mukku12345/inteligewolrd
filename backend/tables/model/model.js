const { isObjectIdOrHexString } = require("mongoose");

const mongoose = require("mongoose")
module.exports = mongoose=>{
    const courses_Schema = mongoose.Schema({
        name:String,
        img:String,
        topic_Id:[{type:String}],
        priceRange:Number,
        description:String,
        url:String
    
    },
    { timestamps: true }
    
    
    );
    


    const speakers_Schema = mongoose.Schema({
        
        name:String,
    },
    { timestamps: true }
    );


    const courses_Speakers_Schema = mongoose.Schema({
        course_id:{type:mongoose.Schema.Types.ObjectId,ref:'Course'},
        speaker_id:{type:mongoose.Schema.Types.ObjectId,ref:'Speaker'},
    },
    { timestamps: true }
    );

    const topics_Schema = mongoose.Schema({
      
        name:String,
    },
    { timestamps: true }
    );


    const Courses = mongoose.model("Course",courses_Schema);
    // return Cources;
    const Speakers = mongoose.model("Speaker",speakers_Schema);
    // return Speakers;
    const Course_Speakers = mongoose.model("Course_Speaker",courses_Speakers_Schema );
    // return Cource_Speakers;
    const Topics = mongoose.model("Topic",topics_Schema);
    // return Topics;
    return {Courses,Speakers,Course_Speakers,Topics}
    
}
console.log("schema")