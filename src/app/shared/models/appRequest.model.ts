
export class AppRequestModel {
  UserId: number;
  IsDBReadOnly: boolean;
  Tenant_Id: string;
  AppId: string;
  TimeZone: string;
  TimeZoneOffset: string;
  DateFormat: string;
  TimeFormat: string;
  EntityCode: string;
  EntityType: string;
  ClientIP: string;
  UserCode: string;
  BaseOrgCode:string;

  constructor(_userId: number, _appID: string, _tenant_Id: string, _isDBReadOnly: boolean,
    _timeZone: string, _timeZoneOffset: string, _dateFormat: string, _entityCode: string,
    _entityType: string, _clientIP: string, _clientMachineName: string, _userCode: string,_baseOrgCode?: string,_timeFormat?: string) {
    this.UserId = _userId;
    this.AppId = _appID;
    this.Tenant_Id = _tenant_Id;
    this.IsDBReadOnly = _isDBReadOnly;
    this.TimeZone = _timeZone;
    this.TimeZoneOffset = _timeZoneOffset;
    this.DateFormat = _dateFormat;
    this.EntityCode = _entityCode;
    this.EntityType = _entityType;
    this.ClientIP = _clientIP;
    this.UserCode = _userCode;
    this.BaseOrgCode=_baseOrgCode;
    this.TimeFormat=_timeFormat;
  }
}
