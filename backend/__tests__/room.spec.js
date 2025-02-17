const {createRoom} = require('../controllers/roomController');
const Room = require("../models/Room.model");
const { newvalidateRole } = require("../controllers/exports/validateRole");

jest.mock("../models/Room.model",()=>({
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

it('should return status code 201 and message "Room created"', async()=>{
    const req={
        body: {
            roomNo: 'roomNo',
            type: 'testType',
            capacity: 120,
            resources: ['r1','r2'],
            bookings: ['b1','b2']
        },
        user: {
            role: 'Admin'
        }
    }

    newvalidateRole.mockResolvedValue(true);

    Room.create.mockResolvedValue({})

    await createRoom(req,res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("Room Created");

})

