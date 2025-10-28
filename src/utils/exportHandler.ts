import pdfMake from "pdfmake/build/pdfmake";
import html2pdf from "html2pdf.js";

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
      italics: "Vazirmatn-Regular.ttf",
      bolditalics: "Vazirmatn-Bold.ttf",
    },
  };
}

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

export function exportToPDF_HTML(payload: any, fileName = "export.pdf") {
  const flat = flattenObject(payload);
  const entries = Object.entries(flat);

  const html = `
    <div dir="rtl" style="font-family: Vazirmatn, sans-serif; text-align: right;">
      <h2 style="text-align:center;">گزارش کامل پروفایل بیمار</h2>
      <table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse; width:100%; font-size:12px;">
        <thead>
          <tr style="background-color:#f0f0f0;">
            <th style="width:40%; text-align:center;">کلید</th>
            <th style="width:60%; text-align:center;">مقدار</th>
          </tr>
        </thead>
        <tbody>
          ${entries
            .map(
              ([key, val]) => `
            <tr>
              <td style="word-break:break-all;">${key}</td>
              <td>${val ?? "-"}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
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
