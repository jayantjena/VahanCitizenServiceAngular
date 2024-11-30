export class FeeListDto {
  purCd: number = -1;
  feeHeadDescr: string;
  feeAmount: any;
  fineAmount: any;
  exemptFineAmount = 0.0;
  exemptFeesAmount = 0.0;

  totalAmount: any;
  disableDropDown: boolean;
  paymentId: string;
  noOfApplications: string;
  perTrans: boolean;
  readOnlyFee = true;
  fromDate: any;
  uptoDate: any;
  perRcpt: boolean;
  fromDateLable: String;
  uptoDateLable: String;
  renderFromDate: boolean;
  renderUptoDate: boolean;

  dueDate: any;
  dueDateString: string;

}

