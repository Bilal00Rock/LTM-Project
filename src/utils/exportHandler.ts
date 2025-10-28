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

  const keys = Array.from(
    flattenedRows.reduce<Set<string>>((set, fr) => {
      Object.keys(fr).forEach((k) => set.add(k));
      return set;
    }, new Set<string>())
  ).sort();

  const translateKeyToFarsi = (key: string): string => {
    const k = key.replace(/\[\d+\]/g, ""); // حذف [0], [1]
    switch (true) {
      case k === "fullName":
        return "نام و نام خانوادگی";
      case k === "phoneNumber":
        return "شماره تماس";
      case k === "gender":
        return "جنسیت";
      case k === "birthdate":
        return "تاریخ تولد";
      case k === "maritalStatus":
        return "وضعیت تأهل";
      case k.includes("diagnosisDate"):
        return "تاریخ تشخیص";
      case k.includes("epilepsyTypeName"):
        return "نوع صرع";
      case k.includes("epilepsyConsciousnessTypeId"):
        return "وضعیت آگاهی";
      case k.includes("movementStatus"):
        return "وضعیت حرکتی";
      case k.includes("epilepsySecondType"):
        return "نوع دوم صرع";

      // داروها
      case k.includes("pastAntiepilepticMedicineList"):
        return "داروهای ضد صرع قبلی";
      case k.includes("currentAntiepilepticMedicineList"):
        return "داروهای ضد صرع فعلی";
      case k.includes("otherMedicineList"):
        return "سایر داروها";
      case k.includes("medicalInformations.parentFamilyRelationshipId"):
        return "ارتباط خانوادگی والدین";
      // تشخیص‌ها
      case k.includes("eegDate"):
        return "تاریخ EEG";
      case k.includes("eegResult"):
        return "نتیجه EEG";
      case k.includes("photoDate"):
        return "تاریخ تصویربرداری";
      case k.includes("photoResult"):
        return "نتیجه تصویربرداری";
      case k.includes("otherDiagnosticMeasuresDate"):
        return "تاریخ سایر اقدامات تشخیصی";
      case k.includes("otherDiagnosticMeasuresResult"):
        return "نتیجه سایر اقدامات تشخیصی";

      // تشنج
      case k.includes("firstSeizure"):
        return "اولین تشنج";
      case k.includes("lastSeizure"):
        return "آخرین تشنج";
      case k.includes("yearlySeizureCount"):
        return "تعداد تشنج در سال";
      case k.includes("seizureInterval"):
        return "فاصله بین تشنج‌ها";
      case k.includes("seizureTimeUnitId"):
        return "واحد زمان تشنج";

      // بستری‌ها
      case k.includes("hospitalizationDate"):
        return "تاریخ بستری";
      case k.includes("hospitalizationCount"):
        return "تعداد دفعات بستری";
      case k.includes("hospitalizationDuration"):
        return "مدت بستری";
      case k.includes("hospitalizationTimeUnitId"):
        return "واحد مدت بستری";
      case k.includes("systemicDisease"):
        return "بیماری سیستمیک";

      // سابقه خانوادگی
      case k.includes("familyDiseaseHistoryList"):
        return "سابقه خانوادگی بیماری‌ها";
      case k.includes("familyDescription"):
        return "شرح حال خانواده";

      // شکایات و سوءمصرف
      case k.includes("pastYearComplaints"):
        return "شکایات سال گذشته";
      case k.includes("drugConsumption"):
        return "سوءمصرف مواد و دخانیات";

      default:
        return k; // اگر ترجمه نداشت
    }
  };

  const headers = keys.map((k) => translateKeyToFarsi(k));

  const csvLines = [headers.join(",")];

  flattenedRows.forEach((fr) => {
    const line = keys
      .map((k) => {
        let val = fr[k];
        if (Array.isArray(val)) val = val.join("، ");
        return JSON.stringify(val ?? "");
      })
      .join(",");
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

  const fmtDate = (date: string | null) =>
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
                .map(
                  (c) => `<td style="word-break:break-word;">${c || "-"}</td>`
                )
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
          [
            "نام و نام خانوادگی",
            "شماره تماس",
            "جنسیت",
            "تاریخ تولد",
            "وضعیت تأهل",
          ],
          [
            [
              p.fullName ?? "-",
              p.phoneNumber ?? "-",
              p.gender === "male" ? "مرد" : p.gender === "female" ? "زن" : "-",
              fmtDate(p.birthdate),
              p.maritalStatus === "married"
                ? "متأهل"
                : p.maritalStatus === "single"
                ? "مجرد"
                : "-",
            ],
          ]
        )
      )}

      ${section(
        "اطلاعات پزشکی",
        table(
          [
            "تاریخ تشخیص",
            "نوع صرع",
            "وضعیت آگاهی",
            "وضعیت حرکتی",
            "نوع دوم صرع",
          ],
          [
            [
              fmtDate(med.diagnosisDate),
              med.epilepsyTypeName,
              med.epilepsyConsciousnessTypeId,
              med.movementStatus,
              med.epilepsySecondType,
            ],
          ]
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
            [
              "سایر اقدامات",
              fmtDate(med.otherDiagnosticMeasuresDate),
              med.otherDiagnosticMeasuresResult,
            ],
          ]
        )
      )}

      ${section(
        "اطلاعات تشنج",
        table(
          [
            "اولین تشنج",
            "آخرین تشنج",
            "تعداد سالانه",
            "فاصله",
            "واحد زمان",
            "ارتباط خانوادگی والدین",
          ],
          [
            [
              med.firstSeizure ?? "-",
              med.lastSeizure ?? "-",
              med.yearlySeizureCount ?? "-",
              med.seizureInterval ?? "-",
              med.seizureTimeUnitId ?? "-",
              med.parentFamilyRelationshipId ?? "-",
            ],
          ]
        )
      )}

      ${section(
        "بستری‌ها",
        table(
          ["تاریخ بستری", "تعداد دفعات", "مدت", "واحد", "بیماری سیستمیک"],
          [
            [
              fmtDate(med.hospitalizationDate),
              med.hospitalizationCount ?? "-",
              med.hospitalizationDuration ?? "-",
              med.hospitalizationTimeUnitId ?? "-",
              med.systemicDisease ?? "-",
            ],
          ]
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
