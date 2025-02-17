

const validateRole = async(userRole,validRole)=>{
    if(userRole.toLowerCase() == validRole.toLowerCase()){
        return true;
    }else{
        return false;
    }
}


const newvalidateRole = async (userRole, validRoles) => {
    for (const role of validRoles) {
        if (userRole.toLowerCase() === role.toLowerCase()) {
            return true;
        } else {
            console.log("else");
            return false;
        }
    }
};

module.exports = {
    validateRole,
    newvalidateRole
};