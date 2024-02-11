import conf from "../conf/conf.js";
import {Client , Account , ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor () {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account();
    }
    
    async createAccount ({email , password , name}) {
        try {
            const userAccount = await this.account.create(ID.unique() , email , password , name)
            if(userAccount) {
                // some method
                return this.login(email , password);
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
        
    }

    async login ({email , password}) {
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser () {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service: " , error)
        }
        return null;
    }

    async logOut() {
        try {
            this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service: " , error)
        }
    }

}

const authservice = new AuthService(); //ye humne yhin object bnaya AuthService ka taaki baaki jgh na bnana pde

export default authservice