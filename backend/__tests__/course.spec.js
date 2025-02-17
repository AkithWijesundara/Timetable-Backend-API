const {createCourse,assingFaculty} = require("../controllers/courseController");
const Course = require("../models/Course.model");
const Faculty = require("../models/Faculty.model");
const { validateRole } = require("../controllers/exports/validateRole");


jest.mock("../models/Course.model",()=>({
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn()
}));
jest.mock("../models/Faculty.model",()=>({
    findOne: jest.fn(),
}));
jest.mock("../controllers/exports/validateRole",()=>({
    validateRole: jest.fn()
}));

const req = {
    body: {},
    user: {}
};

const res = {
    status: jest.fn(()=> res),
    send: jest.fn(),
    json: jest.fn()
}

//Test for course creation
it('should return status code 201 and "course added" message when course is created', async()=>{
    req.body.courseName = 'Test Course';
    req.body.code = 'C001';
    req.body.description = 'Test description';
    req.body.credits = 4;
    req.user.role = 'Admin';



    validateRole.mockResolvedValue(true);
    Course.findOne.mockResolvedValue(null);

    await createCourse(req,res);

    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("Course added");

})

it('Should return status code 200 and json message Faculty Assigned', async()=>{
   const req = {
        params: {_id: 'courseId'},
        body: {
            faculty: 'facultyId'
        },
        user: {
            role: 'Admin'
        }
    }

    const course = {
        id:1,
        courseName: 'testName',
        code: 'testcode',
        description: 'testDescription',
        credits: '4',
        faculty: 'facultyId'
    }

    validateRole.mockResolvedValue(true);
    
    Course.findByIdAndUpdate.mockResolvedValue(course);

    await assingFaculty(req,res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({successMessage: "Faculty Assigned"});
})
