class ApiResponse{
    constructor(statusCode, token, data, message = "Success"){
        this.statusCode = statusCode;
        this.token = token;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400
    }
}

export { ApiResponse }