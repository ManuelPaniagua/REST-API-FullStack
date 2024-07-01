import { v4 as uuidv4 } from 'uuid';

class User {
    constructor(username, email, password) {
        this.id = uuidv4();
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }
}
export default User;
