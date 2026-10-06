export type BrandInquiryFields = {
  brandName: string;
  contactName: string;
  phone: string;
  email: string;
  brandIntroduction: string;
  inquiryMessage: string;
};

export type BrandInquiryErrors = Partial<Record<keyof BrandInquiryFields | "privacy", string>>;

const requiredMessages: Record<keyof BrandInquiryFields, string> = {
  brandName: "브랜드명을 입력해 주세요.",
  contactName: "담당자명을 입력해 주세요.",
  phone: "연락 가능한 전화번호를 입력해 주세요.",
  email: "이메일을 입력해 주세요.",
  brandIntroduction: "브랜드 소개 또는 링크를 입력해 주세요.",
  inquiryMessage: "문의내용을 입력해 주세요.",
};

export function validateBrandInquiry(form: BrandInquiryFields, privacyConsent: boolean): BrandInquiryErrors {
  const errors: BrandInquiryErrors = {};
  (Object.keys(requiredMessages) as (keyof BrandInquiryFields)[]).forEach(field => {
    if (!form[field].trim()) errors[field] = requiredMessages[field];
  });
  if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "올바른 이메일 형식을 입력해 주세요.";
  if (!privacyConsent) errors.privacy = "문의 접수를 위해 개인정보 수집 및 이용 동의가 필요합니다.";
  return errors;
}
