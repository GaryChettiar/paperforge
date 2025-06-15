
import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
// You need puppeteer-core + chromium - puppeteer-core is much smaller than puppeteer
import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

// Utility: Ensure expected HTML/Resume is sent
export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { html, filename } = JSON.parse(event.body || '{}');

    if (!html) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing 'html' in body" }),
      };
    }

    // Use Puppeteer to render the provided HTML and save to PDF
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    // Optionally, set media type to print for print CSS support
    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    });

    await browser.close();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename || 'resume.pdf'}"`,
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message || "PDF generation error" }),
    };
  }
};
