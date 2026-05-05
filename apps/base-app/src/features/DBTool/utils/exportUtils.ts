import { toPng } from 'html-to-image';
import { DatabaseSchema } from '../types/schema';

/**
 * Export the canvas as PNG
 */
export async function exportToPNG(elementId: string, filename: string = 'erd-diagram.png') {
    const element = document.querySelector(`#${elementId} .react-flow`) as HTMLElement;

    if (!element) {
        throw new Error('Canvas element not found');
    }

    try {
        const dataUrl = await toPng(element, {
            backgroundColor: '#ffffff',
            quality: 1,
            pixelRatio: 2,
        });

        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error('Error exporting to PNG:', error);
        throw error;
    }
}

/**
 * Export schema as JSON file
 */
export function exportToJSON(schema: DatabaseSchema, filename: string = 'schema.json') {
    const json = JSON.stringify(schema, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
}

/**
 * Download a file with given content
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
}
