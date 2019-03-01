import { User } from './user';
export class Document {
    id: number;
    docName: string;
	user: User;
    uploadDate: string;
	updateDate: string;
	user_id: number;
	constructor(user: User) {
		this.user = user;
		this.user_id = user.id; 
	}
	getDocName(): string{
		return this.docName;
	}
}