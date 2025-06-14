
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found. Make sure the resume preview is visible.`);
    }

    // Wait for fonts to load and ensure all content is rendered
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Starting PDF export for element:', elementId);

    // Create canvas with simplified settings
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: true,
      height: element.scrollHeight,
      width: element.scrollWidth
    });

    console.log('Canvas created:', canvas.width, 'x', canvas.height);

    // Verify canvas has content
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const hasContent = imageData.data.some((channel, index) => 
      index % 4 !== 3 && channel !== 255 // Check for non-white pixels (excluding alpha channel)
    );

    console.log('Canvas has content:', hasContent);

    if (!hasContent) {
      throw new Error('Canvas appears to be blank. Please try again.');
    }

    // Create PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('portrait', 'mm', 'a4');

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Save the PDF
    pdf.save(filename);
    console.log('PDF saved successfully');
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};
