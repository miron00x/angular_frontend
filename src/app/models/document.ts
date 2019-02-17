import { User } from './user';
export class Document {
    id: number;
	user: User;
    docName: string;
    uploadDate: string;
	updateDate: string;
	user_id: number;
	constructor(user: User) {
		this.user = user;
		this.user_id = user.id; 
	}
}