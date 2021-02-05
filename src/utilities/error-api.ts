class ApiError{
    msg : string;
    code: number;
    
    constructor(msg: string, code: number){
        this.msg = msg;
        this.code = code;
    }

    static internal(msg: string) : ApiError {
        return new ApiError(msg, 500);
    }

    static badRequest(msg: string) : ApiError {
        return new ApiError(msg, 400);
    }

    static notFound(msg: string) : ApiError {
        return new ApiError(msg, 404);
    }
}

export default ApiError;
