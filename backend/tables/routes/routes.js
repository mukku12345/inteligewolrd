module.exports = app=>{
    const courses = require("../controllers/courses");
    const speakers = require("../controllers/speakers")
    const course_Speaker = require("../controllers/course_speakers");
    const topics = require("../controllers/topics")

    const router = require("express").Router();


    //cources 
    router.post("/courses",courses.createCourses);
    // router.get("/courses",courses.findAll);

    router.get("/courses", courses.findAllWithFilter);
    // router.get("/coursesp", courses.findAllWithFilterPrice);


    // // Retrieve a single Tutorial with id
     router.get("/courses/:id", courses.findOne);
   
     // // Update a cource with id
     router.put("/courses/:id", courses.update);
   
     // // Delete cource with id
     router.delete("/courses/:id", courses.delete);
   
     // // Delete all cources
     router.delete("/courses", courses.deleteAll);


     ////speakers route
     router.post("/speakers", speakers.createSpeakers);

     router.get("/speakers", speakers.findAll);
     // // Retrieve a single Tutorial with id
      router.get("/speakers/:id", speakers.findOne);
    
      // // Update a speakers with id
      router.put("/speakers/:id", speakers.update);
    
      // // Delete speakers with id
      router.delete("/speakers/:id", speakers.delete);
    
      // // Delete all speakers
      router.delete("/speakers", speakers.deleteAll);


      /////route for cource speaker
 router.post("/course_Speaker",course_Speaker.createCourceSpeakers);
 
     router.get("/course_Speaker", course_Speaker.findAll);
     // // Retrieve a single Tutorial with id
      router.get("/course_Speaker/:id", course_Speaker.findOne);
    
      // // Update a course_Speaker with id
      router.put("/course_Speaker/:id", course_Speaker.update);
    
      // // Delete course_Speaker with id
      router.delete("/course_Speaker/:id", course_Speaker.delete);
    
      // // Delete all course_Speaker
      router.delete("/course_Speaker", course_Speaker.deleteAll);


//////////topics route

    router.post("/topics",topics.createTopics);


    router.get("/topics", topics.findAll);
    // // Retrieve a single Tutorial with id
     router.get("/topics/:id", topics.findOne);
   
     // // Update a topics with id
     router.put("/topics/:id", topics.update);
   
     // // Delete topics with id
     router.delete("/topics/:id", topics.delete);
   
     // // Delete all topics
     router.delete("/topics", topics.deleteAll);


    //populating

    // router.post('/populate',courses.findPopulating);
    // router.get('/populate/:id',courses.findPopulating);

    // router.post('/populateCS',course_Speaker.findPopulating);


    //finding all with conditions





    app.use("/api/tables",router)
}

console.log("routing is fine")


// http://localhost:8080/api/movies?page=1&limit=6&genre=Drama&sort=year,desc&search=god