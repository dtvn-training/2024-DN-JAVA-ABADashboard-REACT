import ExcelJS from "exceljs";
import { PreviewInterface } from "../services/preview-services/preview-type";
import { format } from "date-fns";

type FileExcelTypes = {
  fileName: string;
  data: PreviewInterface[];
  startDate: Date;
  endDate: Date;
};

const checkStartDateAndEndDate = (startDate: Date, endDate: Date) => {
  return startDate.toLocaleDateString() === endDate.toLocaleDateString();
};

export const createFileExcel = async (value: FileExcelTypes) => {
  const workbook = new ExcelJS.Workbook();
  value.data.forEach((item) => {
    const sheet = workbook.addWorksheet(
      `${item.header} ${
        checkStartDateAndEndDate(value.startDate, value.endDate)
          ? format(value.startDate, "yyyy-MM-dd")
          : format(value.startDate, "yyyy-MM-dd").concat(
              "_",
              format(value.endDate, "yyyy-MM-dd")
            )
      }`
    );
    // 1. Thêm hàng trống (cách lề trên)
    sheet.addRow([]);
    sheet.addRow([]);

    // Thêm tiêu đề chính (Report Summary) ở hàng 3
    const headingRow = sheet.getRow(3);
    headingRow.values = [
      "",
      `Report summary for ${item.header} ${
        checkStartDateAndEndDate(value.startDate, value.endDate)
          ? format(value.startDate, "yyyy-MM-dd")
          : format(value.startDate, "yyyy-MM-dd").concat(
              " to ",
              format(value.endDate, "yyyy-MM-dd")
            )
      }`,
    ]; // Thêm tiêu đề ở cột B
    sheet.mergeCells("B3:D3"); // Merge từ B3 đến D3
    headingRow.font = { bold: true, size: 16, color: { argb: "FF000000" } }; // Font to, đậm
    headingRow.alignment = { horizontal: "center", vertical: "middle" };

    // Thêm border cho tiêu đề chính
    headingRow.eachCell((cell, colNumber) => {
      if (colNumber >= 2) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ffff00" },
        };
        cell.border = {
          top: { style: "thick", color: { argb: "FF000000" } },
          left: { style: "thick", color: { argb: "FF000000" } },
          bottom: { style: "thick", color: { argb: "FF000000" } },
          right: { style: "thick", color: { argb: "FF000000" } },
        };
      }
    });

    // Thêm tiêu đề "Title" và "Value" ở hàng thứ 4
    const headerRow = sheet.getRow(4);
    headerRow.values =
      item.categories.length === 2
        ? ["", "STT", ...item.categories]
        : ["", ...item.categories]; // Thêm khoảng trống ở cột A
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: "center", vertical: "middle" };
    console.log(headerRow);

    // Style riêng cho "Title" và "Value"
    headerRow.eachCell((cell, colNumber) => {
      if (colNumber === 2 || colNumber === 3 || colNumber === 4) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF4CAF50" }, // Màu xanh lá
        };
        cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 14 }; // Chữ trắng
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
      }
    });

    // 3. Thêm dữ liệu (chỉ vào cột nội dung chính)
    let count = 1;
    item.data.forEach((item, index) => {
      const row = sheet.addRow([
        "",
        item.field1 ? item.field1 : count,
        item.field2,
        item.field3,
        "",
      ]); // Thêm cột trống
      if (!item.field1) {
        count++;
      }
      row.eachCell((cell, colNumber) => {
        if (colNumber === 2 || colNumber === 3 || colNumber === 4) {
          // Style chỉ cho dữ liệu chính
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
              argb: index % 2 === 0 ? "FFFFFFFF" : "FFE8F5E9", // White or light green
            },
          };
          cell.font = { size: 11, color: { argb: "FF000000" } };
          cell.alignment = { vertical: "middle", horizontal: "center" };
          cell.border = {
            top: { style: "thin", color: { argb: "000000" } },
            left: { style: "thin", color: { argb: "000000" } },
            bottom: { style: "thin", color: { argb: "000000" } },
            right: { style: "thin", color: { argb: "000000" } },
          };
        }
      });
    });

    sheet.getColumn(2).width = 30;
    sheet.getColumn(3).width = 50;
    sheet.getColumn(4).width = 50;

    // 4. Thêm hàng trống cuối cùng (cách lề dưới)
    sheet.addRow([]);
    sheet.addRow([]);
  });

  // 5. Save File
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${value.fileName.replace(" ", "_")}_${
    checkStartDateAndEndDate(value.startDate, value.endDate)
      ? format(value.startDate, "yyyy-MM-dd")
      : format(value.startDate, "yyyy-MM-dd").concat(
          "_to_",
          format(value.endDate, "yyyy-MM-dd")
        )
  }.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
};
