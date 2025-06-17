
/**
 * Exports resume PDF using @onedoc/react-print-pdf library.
 */

import { Onedoc } from '@onedoc/react-print-pdf';

export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found. Make sure the resume preview is visible.`);
    }

    console.log('Starting PDF export for element:', elementId);

    // Initialize Onedoc
    const onedoc = new Onedoc({
      // You can add API key here if needed for advanced features
      // apiKey: 'your-api-key'
    });

    // Generate PDF from the HTML element
    const pdf = await onedoc.render({
      html: element.outerHTML,
      assets: [], // Add any CSS or other assets if needed
      test: false, // Set to true for testing
    });

    // Create blob and download
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);

    console.log('PDF exported successfully using react-print-pdf');
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};
