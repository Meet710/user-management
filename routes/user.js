const UserController = require("../controller/user");

const { verifyToken } = require("../middleware/auth");
const { validateUser, validateUserParams } = require("../validation/user");

class UserRoutes {
    constructor(app) {
        this.app = app;
        this.userController = new UserController();
        this.userRoutes();
    }

    userRoutes(){
        this.app.post('/api/v1/user/create', validateUser , (req , res , next) =>{
           this.userController.createUser(req , res , next)
        })
        
        this.app.get('/api/v1/user', verifyToken, (req, res, next) => { 
            this.userController.getUser(req, res, next);
        })

        this.app.get('/api/v1/user/:id', verifyToken , validateUserParams, (req, res, next) => { 
            this.userController.getUserById(req, res, next);
        });

        this.app.get('/api/v1/users/all', verifyToken, (req, res, next) => { 
            this.userController.getAllUsers(req, res, next);
        });

        this.app.delete('/api/v1/user/delete/:id', verifyToken, validateUserParams, (req, res, next) => { 
            this.userController.deleteUser(req, res, next);
        });
    }
}
module.exports = UserRoutes;