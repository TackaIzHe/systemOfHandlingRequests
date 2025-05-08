export class ApiError extends Error{
    cod
    mess
    constructor(cod:number,mess:string){
        super()
        this.cod = cod
        this.mess = mess
    }

    static badData(){
        return new ApiError(404,"Некоректные данные")
    }
    static serverError(){
        return new ApiError(500,'Ошибка сервера')
    }
}