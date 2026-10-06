import { useRef, useState, type FormEvent } from "react";
import { CircleAlert, Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { submitWasaInquiryToWeb3Forms } from "@/lib/web3forms";
import { validateBrandInquiry, type BrandInquiryErrors, type BrandInquiryFields } from "@/lib/brandInquiryValidation";

type FormFields = BrandInquiryFields;
type FieldName = keyof FormFields;
type FieldErrors = BrandInquiryErrors;

const initialForm: FormFields = {
  brandName: "",
  contactName: "",
  phone: "",
  email: "",
  brandIntroduction: "",
  inquiryMessage: "",
};

const fieldMeta: Record<FieldName, { label: string; placeholder: string; error: string; type?: "email" | "tel"; textareaRows?: number }> = {
  brandName: { label: "브랜드명", placeholder: "브랜드명을 입력해 주세요", error: "브랜드명을 입력해 주세요." },
  contactName: { label: "담당자명", placeholder: "담당자명을 입력해 주세요", error: "담당자명을 입력해 주세요." },
  phone: { label: "연락처", placeholder: "010-0000-0000", error: "연락 가능한 전화번호를 입력해 주세요.", type: "tel" },
  email: { label: "이메일", placeholder: "hello@brand.com", error: "이메일을 입력해 주세요.", type: "email" },
  brandIntroduction: { label: "브랜드 소개 또는 링크", placeholder: "제품, 브랜드의 이야기, 소개 링크를 적어 주세요", error: "브랜드 소개 또는 링크를 입력해 주세요.", textareaRows: 4 },
  inquiryMessage: { label: "문의내용", placeholder: "궁금한 점이나 참여를 원하는 방식을 적어 주세요", error: "문의내용을 입력해 주세요.", textareaRows: 3 },
};

const inputBase = "mt-2 min-h-12 w-full border-b bg-transparent px-0 py-3 text-[15px] font-medium outline-none placeholder:text-[#aaa0ae] focus:border-[#7543ae]";

export function BrandInquiryForm({ onSuccess }: { onSuccess: (brandName: string) => void }) {
  const [form, setForm] = useState<FormFields>(initialForm);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = (field: FieldName, value: string) => {
    setForm(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
    setSubmissionError("");
  };

  const focusFirstError = () => {
    window.requestAnimationFrame(() => {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateBrandInquiry(form, privacyConsent);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      focusFirstError();
      return;
    }
    if (websiteHoneypot) {
      onSuccess(form.brandName);
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmissionError("문의 전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");
    try {
      await submitWasaInquiryToWeb3Forms(form, accessKey);
      onSuccess(form.brandName);
      setForm(initialForm);
      setPrivacyConsent(false);
      setWebsiteHoneypot("");
      setErrors({});
    } catch {
      setSubmissionError("문의 전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FieldName) => {
    const meta = fieldMeta[field];
    const error = errors[field];
    const id = `brand-inquiry-${field}`;
    const errorId = `${id}-error`;
    const shared = {
      id,
      value: form[field],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateField(field, event.target.value),
      placeholder: meta.placeholder,
      "aria-invalid": Boolean(error),
      "aria-describedby": error ? errorId : undefined,
      className: `${inputBase} ${error ? "border-[#c4304c] focus:border-[#c4304c]" : "border-[#d5cadf]"}`,
    };

    return <label className={meta.textareaRows ? "mt-7 block text-sm font-bold text-[#3c2d4c]" : "text-sm font-bold text-[#3c2d4c]"} key={field}>
      {meta.label}
      {meta.textareaRows ? <textarea {...shared} rows={meta.textareaRows} className={`${shared.className} resize-none leading-7`} /> : <input {...shared} type={meta.type ?? "text"} />}
      {error && <span id={errorId} role="alert" className="mt-2 flex items-start gap-1.5 text-[13px] font-semibold leading-5 text-[#b7233e]"><CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{error}</span>}
    </label>;
  };

  return <form ref={formRef} noValidate onSubmit={handleSubmit} className="border-t border-[#cbbbe0] bg-white/45 px-6 py-9 md:px-11 md:py-12">
    <input type="checkbox" name="botcheck" checked={Boolean(websiteHoneypot)} onChange={event => setWebsiteHoneypot(event.target.checked ? "filled" : "")} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" />
    <p className="text-[11px] font-bold tracking-[.15em] text-[#8153b3]">GOOD BRANDS, TOGETHER</p>
    <h3 className="display-copy mt-3 text-[31px] font-extrabold">WASA 입점 문의</h3>
    {submissionError && <div role="alert" className="mt-6 flex items-start gap-2 border-l-2 border-[#c4304c] bg-[#fff5f6] px-4 py-3 text-[14px] font-semibold leading-6 text-[#a21f36]"><CircleAlert className="mt-1 size-4 shrink-0" aria-hidden="true" />{submissionError}</div>}
    <div className="mt-9 grid gap-x-6 gap-y-6 sm:grid-cols-2">{(["brandName", "contactName", "phone", "email"] as FieldName[]).map(renderField)}</div>
    {(["brandIntroduction", "inquiryMessage"] as FieldName[]).map(renderField)}
    <div className={`mt-8 border-y py-5 ${errors.privacy ? "border-[#c4304c] bg-[#fff7f8] px-3" : "border-[#e0d7e8]"}`}>
      <div className="flex items-start gap-3"><Checkbox id="privacy-consent" checked={privacyConsent} onCheckedChange={value => { setPrivacyConsent(value === true); setErrors(current => ({ ...current, privacy: undefined })); }} aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-consent-error" : undefined} className={`mt-0.5 ${errors.privacy ? "border-[#c4304c]" : "border-[#9b7bbb]"} data-[state=checked]:bg-[#65369d]`} /><label htmlFor="privacy-consent" className="cursor-pointer text-[13px] font-bold leading-6 text-[#413150]"><span className="text-[#6d3da4]">[필수]</span> 개인정보 수집 및 이용에 동의합니다.</label></div>
      {errors.privacy && <p id="privacy-consent-error" role="alert" className="ml-7 mt-2 flex items-start gap-1.5 text-[13px] font-semibold leading-5 text-[#b7233e]"><CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{errors.privacy}</p>}
      <p className="body-copy ml-7 mt-2 text-[12px] leading-5 text-[#7a6e83]">수집 항목: 브랜드명, 담당자명, 연락처, 이메일, 브랜드 소개 또는 링크, 문의내용 · 이용 목적: 입점 문의 확인 및 회신 · 보유 기간: 문의 처리 완료 후 1년</p>
    </div>
    <button type="submit" disabled={isSubmitting} className="mt-8 flex min-h-14 w-full items-center justify-center gap-3 bg-[#281348] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#7140aa] disabled:cursor-wait disabled:opacity-65 active:scale-[.98]">{isSubmitting ? "문의 접수 중..." : "WASA 입점 문의하기"}<Send size={17} /></button>
  </form>;
}
