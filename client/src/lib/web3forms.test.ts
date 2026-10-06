import { describe, expect, it, vi } from "vitest";
import { submitWasaInquiryToWeb3Forms } from "./web3forms";

const inquiry = {
  brandName: "WASA 테스트 브랜드",
  contactName: "홍길동",
  phone: "010-1234-5678",
  email: "brand@example.com",
  brandIntroduction: "로컬 브랜드 소개입니다.",
  inquiryMessage: "입점 참여를 문의합니다.",
};

describe("submitWasaInquiryToWeb3Forms", () => {
  it("공식 JSON AJAX 형식으로 제목·Reply-To·Honeypot 필드를 보낸다", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));

    await expect(submitWasaInquiryToWeb3Forms(inquiry, "public-access-key", fetcher)).resolves.toBeUndefined();

    expect(fetcher).toHaveBeenCalledWith("https://api.web3forms.com/submit", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    }));
    const [, request] = fetcher.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(request.body as string)).toMatchObject({
      access_key: "public-access-key",
      subject: `[WASA 입점 문의] ${inquiry.brandName}`,
      email: inquiry.email,
      replyto: inquiry.email,
      brand_name: inquiry.brandName,
      contact_name: inquiry.contactName,
      botcheck: false,
    });
  });

  it("성공 응답이 아니면 오류를 반환한다", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 400 }));
    await expect(submitWasaInquiryToWeb3Forms(inquiry, "public-access-key", fetcher)).rejects.toThrow("Web3Forms submission failed");
  });
});
