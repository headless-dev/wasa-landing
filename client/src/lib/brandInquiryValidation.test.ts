import { describe, expect, it } from "vitest";
import { validateBrandInquiry, type BrandInquiryFields } from "./brandInquiryValidation";

const completeForm: BrandInquiryFields = {
  brandName: "WASA 테스트 브랜드",
  contactName: "홍길동",
  phone: "010-1234-5678",
  email: "hello@brand.co.kr",
  brandIntroduction: "브랜드 소개",
  inquiryMessage: "입점 문의",
};

describe("입점 문의 인라인 검증", () => {
  it("빈 필수값과 미동의 상태를 각 필드별 오류로 반환한다", () => {
    const errors = validateBrandInquiry({ ...completeForm, brandName: "", email: "" }, false);
    expect(errors.brandName).toBe("브랜드명을 입력해 주세요.");
    expect(errors.email).toBe("이메일을 입력해 주세요.");
    expect(errors.privacy).toBe("문의 접수를 위해 개인정보 수집 및 이용 동의가 필요합니다.");
  });

  it("형식이 잘못된 이메일을 명확히 구분한다", () => {
    expect(validateBrandInquiry({ ...completeForm, email: "not-an-email" }, true).email).toBe("올바른 이메일 형식을 입력해 주세요.");
  });

  it("유효한 문의에는 오류를 반환하지 않는다", () => {
    expect(validateBrandInquiry(completeForm, true)).toEqual({});
  });
});
