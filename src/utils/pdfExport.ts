
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found. Make sure the resume preview is visible.`);
    }

    // Wait for fonts to load and ensure all content is rendered
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Ensure the element is visible and has content
    const rect = element.getBoundingClientRect();
    console.log('Element dimensions:', rect.width, rect.height);
    console.log('Element content:', element.innerHTML.length > 0 ? 'Content found' : 'No content');

    // Create canvas from the element with settings optimized for text
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      logging: true, // Enable logging to debug
      imageTimeout: 15000,
      removeContainer: true,
      foreignObjectRendering: true,
      // Force specific font rendering
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Ensure fonts are applied
          clonedElement.style.fontFamily = 'Arial, sans-serif';
          clonedElement.style.fontSize = '14px';
          clonedElement.style.lineHeight = '1.4';
        }
      }
    });

    console.log('Canvas dimensions:', canvas.width, canvas.height);

    // Check if canvas has content
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas has no dimensions. The element might be hidden or have no content.');
    }

    // Create PDF with A4 dimensions
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};
