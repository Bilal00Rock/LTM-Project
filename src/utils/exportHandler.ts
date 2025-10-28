import pdfMake from "pdfmake/build/pdfmake";
import html2pdf from "html2pdf.js";

/* ------------------------------------------------------------------
   ✅ لود فونت‌های Vazirmatn برای pdfMake
------------------------------------------------------------------ */
export function loadFontsToPdfMake(
  vazirmatnRegular: string,
  vazirmatnBold: string
) {
  (pdfMake as any).vfs = {
    ...(pdfMake as any).vfs,
    "Vazirmatn-Regular.ttf": vazirmatnRegular,
    "Vazirmatn-Bold.ttf": vazirmatnBold,
  };

  (pdfMake as any).fonts = {
    Vazirmatn: {
      normal: "Vazirmatn-Regular.ttf",
      bold: "Vazirmatn-Bold.ttf",
      bolditalics: "Vazirmatn-Bold.ttf",
    },
  };
}

/* ------------------------------------------------------------------
   ✅ ابزار کمکی: تخت کردن آبجکت‌ها برای CSV
------------------------------------------------------------------ */
export function flattenObject(
  obj: any,
  prefix = "",
  res: Record<string, any> = {}
) {
  if (obj === null || obj === undefined) return res;
  if (typeof obj !== "object") {
    res[prefix] = obj;
    return res;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => flattenObject(item, `${prefix}[${i}]`, res));
    return res;
  }

  Object.keys(obj).forEach((key) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    flattenObject(obj[key], newPrefix, res);
  });
  return res;
}

/* ------------------------------------------------------------------
   ✅ خروجی CSV
------------------------------------------------------------------ */
export function exportToCSV(payload: any, fileName = "export.csv") {
  if (!payload) return;
  const rows = Array.isArray(payload) ? payload : [payload];
  const flattenedRows = rows.map((r) => flattenObject(r, "", {}));

  const headersSet = new Set<string>();
  flattenedRows.forEach((fr) =>
    Object.keys(fr).forEach((k) => headersSet.add(k))
  );
  const headers = Array.from(headersSet).sort();

  const csvLines = [headers.join(",")];
  flattenedRows.forEach((fr) => {
    const line = headers.map((h) => JSON.stringify(fr[h] || "")).join(",");
    csvLines.push(line);
  });

  const csvContent = "\uFEFF" + csvLines.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------
   ✅ خروجی PDF (چند جدول دقیق مثل سایت)
------------------------------------------------------------------ */
export function exportToPDF_HTML(payload: any, fileName = "export.pdf") {
  if (!payload) return;

  const fmtDate  = (date: string | null) =>
    date ? new Date(date).toLocaleDateString("fa-IR") : "-";

  const p = payload;
  const med = p?.medicalInformations || {};

  const pastMeds = med.pastAntiepilepticMedicineList || [];
  const currentMeds = med.currentAntiepilepticMedicineList || [];
  const otherMeds = med.otherMedicineList || [];
  const familyHistory = med.familyDiseaseHistoryList || [];
  const drugConsumption = med.drugConsumption || [];
  const complaints =
    med.pastYearComplaints?.map((c: any) => c.Id).join("، ") || "-";

  const section = (title: string, content: string) => `
    <h3 style="margin-top:20px; color:#333;">${title}</h3>
    ${content}
  `;

  const table = (headers: string[], rows: string[][]) => `
    <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse:collapse; font-size:12px; text-align:center;">
      <thead style="background:#f0f0f0;">
        <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (r) =>
              `<tr>${r
                .map((c) => `<td style="word-break:break-word;">${c || "-"}</td>`)
                .join("")}</tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;

  const html = `
    <div dir="rtl" style="font-family: Vazirmatn, sans-serif; text-align: right;">
      <h2 style="text-align:center;">📋 گزارش کامل پروفایل بیمار</h2>

      ${section(
        "اطلاعات فردی",
        table(
          ["نام و نام خانوادگی", "شماره تماس", "جنسیت", "تاریخ تولد", "وضعیت تأهل"],
          [[
            p.fullName ?? "-",
            p.phoneNumber ?? "-",
            p.gender === "male" ? "مرد" : p.gender === "female" ? "زن" : "-",
            fmtDate(p.birthdate),
            p.maritalStatus === "married"
              ? "متأهل"
              : p.maritalStatus === "single"
              ? "مجرد"
              : "-",
          ]]
        )
      )}

      ${section(
        "اطلاعات پزشکی",
        table(
          ["تاریخ تشخیص", "نوع صرع", "وضعیت آگاهی", "وضعیت حرکتی", "نوع دوم صرع"],
          [[
            fmtDate(med.diagnosisDate),
            med.epilepsyTypeName,
            med.epilepsyConsciousnessTypeId,
            med.movementStatus,
            med.epilepsySecondType,
          ]]
        )
      )}

      ${section(
        "داروهای ضد صرع قبلی",
        table(
          ["نام دارو", "نوع", "مقدار", "مدت مصرف", "تاریخ توقف", "دلیل توقف"],
          pastMeds.map((m: any) => [
            m.medicine?.name,
            m.medicine?.type,
            m.amount,
            m.durationOfUseTypeId,
            fmtDate(m.stopDate),
            m.resonOfStop,
          ])
        )
      )}

      ${section(
        "داروهای ضد صرع فعلی",
        table(
          ["نام دارو", "نوع", "مقدار", "مدت مصرف"],
          currentMeds.map((m: any) => [
            m.medicine?.name,
            m.medicine?.type,
            m.amount,
            m.durationOfUseTypeId,
          ])
        )
      )}

      ${section(
        "سایر داروها",
        table(
          ["نام دارو", "نوع", "مقدار", "مدت مصرف"],
          otherMeds.map((m: any) => [
            m.medicine?.name,
            m.medicine?.type,
            m.amount,
            m.durationOfUseTypeId,
          ])
        )
      )}

      ${section(
        "نتایج آزمایش‌ها",
        table(
          ["دسته", "تاریخ", "نتیجه"],
          [
            ["EEG", fmtDate(med.eegDate), med.eegResult],
            ["تصویربرداری", fmtDate(med.photoDate), med.photoResult],
            ["سایر اقدامات", fmtDate(med.otherDiagnosticMeasuresDate), med.otherDiagnosticMeasuresResult],
          ]
        )
      )}

      ${section(
        "اطلاعات تشنج",
        table(
          ["اولین تشنج", "آخرین تشنج", "تعداد سالانه", "فاصله", "واحد زمان"],
          [[
            med.firstSeizure ?? "-",
            med.lastSeizure ?? "-",
            med.yearlySeizureCount ?? "-",
            med.seizureInterval ?? "-",
            med.seizureTimeUnitId ?? "-",
          ]]
        )
      )}

      ${section(
        "بستری‌ها",
        table(
          ["تاریخ بستری", "تعداد دفعات", "مدت", "واحد", "بیماری سیستمیک"],
          [[
            fmtDate(med.hospitalizationDate),
            med.hospitalizationCount ?? "-",
            med.hospitalizationDuration ?? "-",
            med.hospitalizationTimeUnitId ?? "-",
            med.systemicDisease ?? "-",
          ]]
        )
      )}

      ${section(
        "شکایات سال گذشته",
        `<p style="font-size:13px; line-height:1.8;">${complaints}</p>`
      )}

      ${section(
        "سابقه خانوادگی بیماری‌ها",
        table(
          ["نام بیماری", "نسبت خانوادگی", "نوع سابقه"],
          familyHistory.map((f: any) => [
            f.name,
            f.relationship,
            f.familyDiseasesHistoryTypeId,
          ])
        )
      )}

      ${section(
        "سوءمصرف مواد و دخانیات",
        table(
          ["نوع ماده", "مقدار روزانه", "مدت", "واحد"],
          drugConsumption.map((d: any) => [
            d.drugTypeId,
            d.dailyAmount,
            d.drugConsumptionDuration,
            d.dateTimeUnitTypeId,
          ])
        )
      )}

      ${section(
        "شرح حال خانواده",
        `<p style="font-size:13px; line-height:1.8;">${
          med.familyDescription ?? "-"
        }</p>`
      )}
    </div>
  `;

  const element = document.createElement("div");
  element.innerHTML = html;

  const opt = {
    margin: [10, 10, 10, 10] as [number, number, number, number],
    filename: fileName,
    image: { type: "jpeg" as "jpeg", quality: 1 },
    html2canvas: {
      scale: 3,
      useCORS: true,
    },
    jsPDF: {
      unit: "mm" as "mm",
      format: "a4" as "a4",
      orientation: "portrait" as "portrait",
      precision: 12,
    },
  };

  html2pdf().from(element).set(opt).save();
}
