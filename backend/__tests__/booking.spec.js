const {createBooking} = require("../controllers/bookingController");
const Booking = require("../models/Booking.model");
const Room = require("../models/Room.model");
const { newvalidateRole } = require("../controllers/exports/validateRole");

jest.mock("../models/Booking.model",()=>({
    findOne: jest.fn(),
    create: jest.fn()
}));

jest.mock("../models/Room.model",()=>({
    findByIdAndUpdate: jest.fn(),
    findById: jest.fn()
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

it('should return status code 201 and message booking created', async()=>{
   const req = {
        body:{
            roomNo: 'testNo',
            event: 'testEvent',
            startTime: '2024-03-25T09:00:00',
            duration: 2
        },
        user: {
            role: 'Admin'
        }
    }

    newvalidateRole.mockResolvedValue(true);

    Booking.findOne.mockResolvedValue(null)
    Booking.create.mockResolvedValue({ _id: 'bookingId' })
    Room.findById.mockResolvedValue({ bookings: [] })
    Room.findByIdAndUpdate({})

    await createBooking(req,res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("Booking created");

})

it('should return status code 400 and message Room not available for specifed time', async()=>{
    const req = {
         body:{
             roomNo: 'testNo',
             event: 'testEvent',
             startTime: '2024-03-25T09:00:00',
             duration: 2
         },
         user: {
             role: 'Admin'
         }
     }
 
     newvalidateRole.mockResolvedValue(true);
 
     Booking.findOne.mockResolvedValue({})
     Booking.create.mockResolvedValue({ _id: 'bookingId' })
     Room.findById.mockResolvedValue({ bookings: [] })
     Room.findByIdAndUpdate({})
 
     await createBooking(req,res);
 
     expect(res.status).toHaveBeenCalledWith(400);
     expect(res.json).toHaveBeenCalledWith({errorMessage: "Room not available for specifed time"});
 
 })