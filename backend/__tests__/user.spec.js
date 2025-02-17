const {registerUser, login} = require("../controllers/userController");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../models/User.model",()=>({
    findOne: jest.fn(),
    create: jest.fn()
}));

jest.mock("bcryptjs",()=>({
    genSalt: jest.fn(),
    hash: jest.fn(),
    compareSync: jest.fn()
}));

jest.mock("jsonwebtoken",()=>({
    sign: jest.fn()
}))

const req={
    body: {}
}

const res={
    status: jest.fn(()=> res),
    send: jest.fn(),
    json: jest.fn()
}

//Tests for user registration
it('Should send a status code of 400 when user exists',async ()=>{
    req.body.firstName = 'TestName';
    req.body.lastName = 'TestLastName';
    req.body.nic = '1234567890';
    req.body.contact = '0771234567';
    req.body.role = 'Admin';
    req.body.userName = 'testUser';
    req.body.password = 'testPassword';
    
    User.findOne.mockResolvedValue({});

    await registerUser(req,res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({error: "User exist with same username"});
});

it('Should send status code 201 and user added when user is added', async ()=>{
    
    req.body.firstName = 'TestName';
    req.body.lastName = 'TestLastName';
    req.body.nic = '1234567890';
    req.body.contact = '0771234567';
    req.body.role = 'Admin';
    req.body.userName = 'testUser';
    req.body.password = 'testPassword';
    
    User.findOne.mockResolvedValue(null);
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash(req.body.password,'salt');
    User.create.mockResolvedValue({});

    await registerUser(req,res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("User added");
})

// //Test for user login
// it('Should return status code 200 with the json token in successfull login', async ()=>{
//     //creating request body
//     req.body.userName = 'testUser';
//     req.body.password = 'testPassword';

//     const user = {_id: 'userId', password: 'hashedPassword'};
//     const token = 'accessToken';

//     User.findOne.mockResolvedValue(user);
//     bcrypt.compareSync.mockReturnValue(true);
//     jwt.sign.mockReturnValue(token);

//     await login(req,res);

    
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({accessToken : token});
// })