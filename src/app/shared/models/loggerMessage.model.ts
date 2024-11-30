export class LoggerMessage {
    msg: string;
    source: string;
    errorObj: any;
    datetime:string;
    constructor(_msg: string, _source: string, _errorObj?: any,_dateTime?:string) {
        this.msg = _msg;
        this.source = _source;
        this.errorObj = _errorObj == null ? "":_errorObj;
        this.datetime=_dateTime
    }
}