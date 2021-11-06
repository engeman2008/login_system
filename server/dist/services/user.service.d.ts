declare class UserService {
    static newUser(userData: any): Promise<{
        user: any;
        activation: any;
        message: string;
    }>;
    static update(userId: any, newData: any): Promise<{
        user: any;
        message: string;
    }>;
}
export default UserService;
