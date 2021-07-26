export class Response {
    data: any | any[];
    code: string;

    constructor(message: string, code: string = '000') {
        this.data = message;
        this.code = code;
    }
}