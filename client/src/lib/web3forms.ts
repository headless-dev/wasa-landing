export type WasaWeb3FormsInquiry = {
  brandName: string;
  contactName: string;
  phone: string;
  email: string;
  brandIntroduction: string;
  inquiryMessage: string;
};

type Web3FormsResponse = { success?: boolean };

export async function submitWasaInquiryToWeb3Forms(
  inquiry: WasaWeb3FormsInquiry,
  accessKey: string,
  fetcher: typeof fetch = fetch,
): Promise<void> {
  if (!accessKey) throw new Error("Web3Forms Access Key is missing");

  const response = await fetcher("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `[WASA 입점 문의] ${inquiry.brandName}`,
      from_name: "WASA 입점 문의",
      email: inquiry.email,
      replyto: inquiry.email,
      brand_name: inquiry.brandName,
      contact_name: inquiry.contactName,
      phone: inquiry.phone,
      brand_introduction_or_link: inquiry.brandIntroduction,
      inquiry_message: inquiry.inquiryMessage,
      botcheck: false,
    }),
  });

  const result = (await response.json().catch(() => null)) as Web3FormsResponse | null;
  if (!response.ok || result?.success !== true) throw new Error("Web3Forms submission failed");
}
