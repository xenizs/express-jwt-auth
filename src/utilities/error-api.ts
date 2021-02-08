class ApiError{
    msg : any;
    code: number;
    
    constructor(msg: any, code: number){
        this.msg = msg;
        this.code = code;
    }

    static internal(msg: any) : ApiError {
        return new ApiError(msg, 500);
    }

    static badRequest(msg: any) : ApiError {
        return new ApiError(msg, 400);
    }

    static notFound(msg: any) : ApiError {
        return new ApiError(msg, 404);
    }
}

export default ApiError;
