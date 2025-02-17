const {enrollStudent,manageEnrollments} = require("../controllers/enrollController");
const Enroll = require("../models/Enroll.model");
const { newvalidateRole } = require("../controllers/exports/validateRole");

jest.mock("../models/Enroll.model",()=>({
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn()
}));

jest.mock("../controllers/exports/validateRole",()=>({
    newvalidateRole: jest.fn()
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
//enroll student
it('should retrun status code 201 and message Enroll successfull, Request sent.', async()=>{
    const req={
        body: {
            course: 'testCourse',
            student: 'testStudent',
        },
        user: {
            role: 'Student'
        }
    }

    newvalidateRole.mockResolvedValue(true);

    Enroll.create.mockResolvedValue({});

    await enrollStudent(req,res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({successMessage: "Enroll successfull, Request sent."});

})

it('should retrun status code 400 and message Enroll Unsuccessfull', async()=>{
    const req={
        body: {
            course: 'testCourse',
            student: 'testStudent',
        },
        user: {
            role: 'Student'
        }
    }

    newvalidateRole.mockResolvedValue(true);

    Enroll.create.mockResolvedValue(null);

    await enrollStudent(req,res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({errorMessage:"Enroll Unsuccessfull"});

})

//manage enrollment
it('should retrun status code 200 and message Updated Sucessfully.', async()=>{
    const req={
        params:{
            _id: 'testId'
        },
        body: {
            status: 'testStatus',
        },
        user: {
            role: 'Faculty'
        }
    }

    newvalidateRole.mockResolvedValue(true);

    Enroll.findByIdAndUpdate.mockResolvedValue({});

    await manageEnrollments(req,res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({sucessMessege: "Updated Sucessfully"});

})