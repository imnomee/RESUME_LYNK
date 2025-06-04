import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import { fixTailwindColors } from './helper';

/**
 * @param {Object} options
 * @param {React.RefObject} options.contentRef - The ref to the content to export
 * @returns {Function} reactToPrintFn - The function to call to trigger PDF generation
 */
const usePdfExport = ({ contentRef, title }) => {
    const reactToPrintFn = useReactToPrint({
        onPrintError: (error) => console.error('Printing error:', error),
        contentRef: contentRef,
        removeAfterPrint: true,
        documentTitle: `${title}-Resume`,
        print: async (printIframe) => {
            const document = printIframe.contentDocument;

            if (!document) {
                console.error('Print iframe document not available.');
                return;
            }

            const htmlElement = document.getElementById('element-to-print');

            if (!htmlElement) {
                console.error(
                    "Element with ID 'element-to-print' not found in the print content."
                );
                return;
            }

            // Optional utility to fix Tailwind classes or any dynamic styles
            fixTailwindColors(htmlElement);

            try {
                await html2pdf()
                    .from(htmlElement)
                    .set({
                        margin: 5,
                        filename: `${title}-Resume.pdf`,
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: {
                            scale: 2,
                            logging: true,
                            useCORS: true,
                        },
                        jsPDF: {
                            unit: 'mm',
                            format: 'legal',
                            orientation: 'portrait',
                        },
                    })
                    .save();

                console.log('PDF generated and downloaded successfully!');
            } catch (pdfError) {
                console.error('Error generating PDF:', pdfError);
            }
        },
    });

    return reactToPrintFn;
};

export default usePdfExport;
