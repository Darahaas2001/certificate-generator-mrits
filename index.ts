import fontkit from '@pdf-lib/fontkit';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import meritData from './merit.json';
import participantData from './participation.json';

const meritCerts = async () => {
	try {
		if (!(meritData.length > 0)) return;
		meritData.forEach(async (user) => {
			let pdfData = readFileSync(
				resolve(__dirname, './Certificates/Merit Certificate.pdf')
			);
			const pdfDoc = await PDFDocument.load(pdfData);
			pdfDoc.registerFontkit(fontkit);
			let fontData = readFileSync(
				resolve(__dirname, './DancingScript-Bold.ttf')
			);
			const dancingScriptFont = await pdfDoc.embedFont(fontData);
			const pages = pdfDoc.getPages();
			const firstPage = pages[0];
			// Student name
			firstPage.drawText(`${user.name}`, {
				x: 238,
				y: 253,
				size: 20,
				font: dancingScriptFont,
				color: rgb(0, 0, 0),
			});
			// College name
			firstPage.drawText(`${user.collegeName}`, {
				x: 405,
				y: 253,
				size: 20,
				font: dancingScriptFont,
				color: rgb(0, 0, 0),
			});
			// Prize number
			firstPage.drawText(`${user.prize}`, {
				x: 111,
				y: 207,
				size: 20,
				font: dancingScriptFont,
				color: rgb(0, 0, 0),
			});

			// Event Name
			firstPage.drawText(`${user.eventName}`, {
				x: 287,
				y: 207,
				size: 20,
				font: dancingScriptFont,
				color: rgb(0, 0, 0),
			});

			// Organizing Dept
			firstPage.drawText(`${user.orgDept}`, {
				x: 607,
				y: 207,
				size: 20,
				font: dancingScriptFont,
				color: rgb(0, 0, 0),
			});

			const pdfDataUri = await pdfDoc.save();
			writeFileSync(
				resolve('./Output/Merit', `${user.name}.pdf`),
				pdfDataUri,
				'utf-8'
			);
			console.log('Merit data written successful');
		});
	} catch (err) {
		console.log(err);
	}
};

const participationCerts = async () => {
	try {
		participantData.forEach(async (user) => {
			let pdfData = readFileSync(
				resolve(__dirname, './Certificates/Pariticipation Certificate.pdf')
			);
			const pdfDoc = await PDFDocument.load(pdfData);
			pdfDoc.registerFontkit(fontkit);
			let fontData = readFileSync(
				resolve(__dirname, './DancingScript-Bold.ttf')
			);
			const dancingScriptFont = await pdfDoc.embedFont(fontData);
			const pages = pdfDoc.getPages();
			const firstPage = pages[0];
			// Student name
			firstPage.drawText(`${user.name}`, {
				x: 238,
				y: 165,
				size: 20,
				font: dancingScriptFont,
				color: rgb(0, 0, 0),
			});
			// College name
			firstPage.drawText(`${user.collegeName}`, {
				x: 370,
				y: 165,
				size: 20,
				font: dancingScriptFont,
				color: rgb(0, 0, 0),
			});

			// Event Name
			firstPage.drawText(`${user.eventName}`, {
				x: 165,
				y: 135,
				size: 20,
				font: dancingScriptFont,
				color: rgb(0, 0, 0),
			});

			// Organizing Dept
			firstPage.drawText(`${user.orgDept}`, {
				x: 450,
				y: 135,
				size: 20,
				font: dancingScriptFont,
				color: rgb(0, 0, 0),
			});

			const pdfDataUri = await pdfDoc.save();
			writeFileSync(
				resolve('./Output/Participation', `${user.name}.pdf`),
				pdfDataUri,
				'utf-8'
			);
			console.log('Participants data successful');
		});
	} catch (err) {
		console.log(err);
	}
};
meritCerts();
participationCerts();
