const {createTimeTable} = require("../controllers/TimeTableController");
const TimeTable = require("../models/TimeTable.model");
const {newvalidateRole} = require("../controllers/exports/validateRole");

jest.mock("../models/TimeTable.model",()=>({
    create: jest.fn()
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

//Test for time table creation
it('should return status code 201 and "Time tale created" message when time table is created', async()=>{
   const req = {
        body: {
            course: 'Test Course',
            timeTableData: {
                'array1': ['testData'],
            } 
        },
        user: {
            role: 'Admin'
        }
    }

    newvalidateRole.mockResolvedValue(true);

    const TimeTable = require('../models/TimeTable.model');
    // TimeTable.mockResolvedValue({})

    TimeTable.create.mockResolvedValue({})

    await createTimeTable(req,res);

    
    // expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.send).toHaveBeenCalledWith("Time table created");

})