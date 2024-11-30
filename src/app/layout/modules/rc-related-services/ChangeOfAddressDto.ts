import { FeeListDto } from "./FeeListDto";

export class ChangeOfAddressDto {
  appl_no: string;
  regn_no: string;
  from_dt: any;
  c_add1: string;
  c_add2: string;
  c_add3: string;
  c_district: number;
  c_pincode: number;
  c_state: string;
  p_add1: string;
  p_add2: string;
  p_add3: string;
  p_district: number;
  p_pincode: number;
  p_state: string;
  op_dt: any;
  state_cd: string;
  off_cd: number;
  pur_cd: number;
  action_cd: any;
  flow_slno: any;

  // Owner Detail Data

  state_name: string;

  c_off_cd: number;
  off_name: string;

  regn_dt: string;
  regn_dtAsDate: any;
  fit_uptoAsDate: any;
  purchase_dt: string;
  owner_sr: number;
  owner_name: string;
  f_name: string;

  c_district_name: string;

  c_state_name: string;

  p_district_name: string;

  p_state_name: string;

  owner_cd: number;
  owner_cd_descr: string;
  regn_type: string;
  regn_type_descr: string;
  vh_class: number;
  vh_class_desc: string;
  chasi_no: string;
  eng_no: string;
  eng_no_original: string;
  maker: number;
  maker_name: string;
  model_cd: string;
  model_name: string;
  body_type: string;
  no_cyl: number;
  hp: any;
  seat_cap: number;
  stand_cap: number;
  sleeper_cap: number;
  unld_wt: number;
  ld_wt: number;
  gcw: number;
  fuel: number;
  fuel_descr: string;
  color: string;
  manu_mon: number;
  manu_yr: number;
  norms: number;
  norms_descr: string;
  wheelbase: number;
  cubic_cap: any;
  floor_area: any;
  ac_fitted: string;
  audio_fitted: string;
  video_fitted: string;
  vch_purchase_as: string;
  vch_catg: string;
  vch_catg_desc: string;
  dealer_cd: string;
  dlr_name: string;
  dlr_add1: string;
  dlr_add2: string;
  dlr_add3: string;
  dlr_city: string;
  dlr_district: string;
  dlr_pincode: string;
  sale_amt: number;
  laser_code: string;
  garage_add: string;
  length: number;
  width: number;
  height: number;
  regn_upto: string;
  regn_uptoAsDate: any;
  fit_upto: string;
  fit_upto_desc: string;
  annual_income: number;

  imported_vch: string;
  other_criteria: number;
  status: string;
  vehType: string;
  vehTypeAsInt: number;

  vch_purchase_asCode: string;
  tax_mode: string;
  permit_rto_cd: number;
  transport_catg: string;
  chasi_no_original: string;
  eng_no_orignal: string;
  formatRegn_dt: string;
  numberOfTyres: number;
  no_of_axles: number;

  mobile_no: any;
  email_id: string;
  pan_no: string;
  aadhar_no: string;
  passport_no: string;
  ration_card_no: string;
  voter_id: string;
  dl_no: string;
  verified_on: any;
  flag: boolean;
  mobileNoEditable: boolean;
  ownerCatg: number;
  dlRequired: boolean;
  dlValidationRequired: boolean;
  feesList: FeeListDto[];
  owner_ctg: number;
  dept_cd: number;

  /// Insurenance Data

  comp_cd: number;
  ins_type: number;
  ins_from: any;
  ins_upto: any;
  policy_no: string;

  idv: number;
  ins_from_string: string;
  ins_upto_string: string;
  insFrom: any;
  insUpto: any;
  insuranceType: number;
  issuerCd: number
  issuerName: string;
  instypeName: string;
  opdt: string;
  policyNo: string;
  vahanVerify: string;
  regnNo: string;
  iibData: boolean;

  // Fees List


  // After payment

  RCPT_NO: string;
  TRANS_NO: string;
  bank_code: string;
  pay_mode: string;

  return_rcpt_no: string;
  response_code: string;
  rcp_dt: any;
  deal_cd: string;

  status_desc: string;
  rcpt_amt: any;

  IS_MULTIPLE_PAYMENT: string;
  TREASURY_REF_NO: string;
  BANK_FILE_NAME: string;
  TREASURY_FLAG: string;
  TAX_FROM: string;
  TAX_UPTO: string;
  CART_NAME: string;
  CART_TRANS_DATE: string;
}

