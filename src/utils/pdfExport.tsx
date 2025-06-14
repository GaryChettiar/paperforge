
import { pdf } from '@react-pdf/renderer';
import { ModernPDFTemplate } from '@/components/pdf-templates/ModernPDFTemplate';
import { ClassicPDFTemplate } from '@/components/pdf-templates/ClassicPDFTemplate';
import { CreativePDFTemplate } from '@/components/pdf-templates/CreativePDFTemplate';
import { MinimalPDFTemplate } from '@/components/pdf-templates/MinimalPDFTemplate';
import { ResumeData } from '@/pages/Index';

export const exportToPDF = async (
  resumeData: ResumeData,
  template: string,
  filename: string = 'resume.pdf',
  creativeSidebarColor?: string
) => {
  try {
    console.log('Starting PDF export with template:', template);

    // Select the appropriate PDF template
    let PDFComponent;
    let props: any = { data: resumeData };

    switch (template) {
      case 'modern':
        PDFComponent = ModernPDFTemplate;
        break;
      case 'classic':
        PDFComponent = ClassicPDFTemplate;
        break;
      case 'creative':
        PDFComponent = CreativePDFTemplate;
        props.sidebarColor = creativeSidebarColor;
        break;
      case 'minimal':
        PDFComponent = MinimalPDFTemplate;
        break;
      default:
        PDFComponent = ModernPDFTemplate;
    }

    // Generate PDF document
    const doc = <PDFComponent {...props} />;
    const pdfBlob = await pdf(doc).toBlob();
    
    // Create download link
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    console.log('PDF exported successfully');
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};
