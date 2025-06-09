    import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelViewerFromURL = ({ url }) => {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const fetchExcel = async () => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setExcelData(data);
      } catch (error) {
        console.error("Error reading Excel file:", error);
      }
    };

    fetchExcel();
  }, [url]);

  return (
    <div>
      <h2>Excel Preview</h2>
      <table border="1">
        <tbody>
          {excelData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelViewerFromURL;
