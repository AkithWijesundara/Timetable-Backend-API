const Course = require("../models/Course.model");
const Faculty = require("../models/Faculty.model");
const { validateRole } = require("./exports/validateRole");


//Create course

const createCourse = async (req,res)=>{
    let facultyId=null;

    const {
        courseName,
        code,
        description,
        credits,
        faculty,
    } = req.body;

    
    try{
        let valid = await validateRole(req.user.role,"Admin");
        if(valid){
            const existingCourse = await Course.findOne({courseName: courseName});

            if(existingCourse){
                res.status(400).json({error: "Course exist with same CourseName"});
                return;
            }

            // if(faculty != null){
            //     facultyId = await Faculty.findOne({facultyName:faculty}).select("_id");
            //     if(facultyId == null){
            //         res.status(400).json({error: "Faculty not exist"});
            //         return;
            //     }
            // }

            const course = await Course.create(
                {
                    courseName,
                    code,
                    description,
                    credits,
                    faculty
                }
            );

            res.status(201).send("Course added");
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        } 

    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }

};

//Get all Courses

const getCourse = async(req,res)=>{
    try{
        const allCourses = await Course.find().populate('faculty','facultyName');
        
        if(allCourses){
            res.status(200).send(allCourses);
        }else{
            res.status(400).json({errorMessage: "No Courses found"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
    
}

const getCourseByFaculty = async(req,res)=>{
    const {
        faculty
    } = req.body;
    try{
        let valid = await validateRole(req.user.role,"Admin");
        if(valid){
            let facultyId = await Faculty.findOne({facultyName:faculty}).select("_id");
            if(facultyId == null){
                res.status(400).json({error: "Faculty not exist"});
                return;
            }
            const courses = await Course.find({faculty:facultyId}).populate('faculty','facultyName');
            if(courses){
                res.status(200).send(courses);
            }else{
                res.status(400).json({errorMessage: "No Courses found for the given faculty"});
            }
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
        
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

//Update course
const updateCourse = async(req,res)=>{
    const {
        currentCourseName,
        currentCode,
        courseName,
        code,
        description,
        credits,
        faculty
    } = req.body;

    const updateData = {
        courseName,
        code,
        description,
        credits,
        faculty
    };

    try{
        // validating user allowed for task
        let valid = await validateRole(req.user.role,"Admin");
        if(valid){
            //checking if course already exist in new name and code
            const existingCourse = await Course.findOne({
                $or: [
                    {courseName: courseName},
                    {code: code}
                ]});
            if(existingCourse && existingCourse.courseName != currentCourseName || existingCourse.code != currentCode){
                res.status(400).json({error: "Course exist with same CourseName or Code"});
                return;
            }

            //updating
            const update = await Course.findByIdAndUpdate(req.params.id, updateData, {new: true});

            if(update){
                res.status(200).json({sucessMessege: "Updated Sucessfully"});
            }else{
                res.status(400).json({errorMessage: "Update failed"});
            }
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

//Delete course

const deleteCourse = async(req,res)=>{
    try{
        // validating user allowed for task
        let valid = await validateRole(req.user.role,"Admin");
        if(valid){
            const deleted = await Course.findByIdAndDelete(req.params.id);
            if(deleted){
                res.status(200).json({successMessage: "Course Deleted"});
            }else{
                res.status(400).json({errorMessage: "Course Deleting failed"});
            }
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
        

    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}

// Assing faculty to course
const assingFaculty = async(req,res)=>{
    const {
        faculty
    } = req.body
    
    try{
        //Validating user access for task
        let valid = await validateRole(req.user.role,"Admin");
        if(valid){
            //getting faculty id
            // let facultyId = await Faculty.findOne({facultyName:faculty}).select("_id");
            // if(facultyId == null){
            //    res.status(400).json({errorMessage: "Faculty not found"});
            //    return;
            // }
            //updating course
            const assign = await Course.findByIdAndUpdate(req.params.id,{faculty}, {new: true});
            if(assign.faculty != null){
                res.status(200).json({successMessage: "Faculty Assigned"});
            }else{
                res.status(400).json({errorMessage: "Could Not assign faculty"});
            }
        }else{
            res.status(401).json({errorMessage:"User not allowed to access requested resource"});
        }
    }catch(error){
        res.status(500).json({message: "Server error: "+error.message});
    }
}


module.exports = {
    createCourse,
    getCourse,
    getCourseByFaculty,
    updateCourse,
    deleteCourse,
    assingFaculty
}