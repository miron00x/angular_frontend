export class User {
	id: number;
	role: string;
	userName: string;
	constructor( values: Object = {} )
	{
		Object.assign( this, values );
		
	}
}