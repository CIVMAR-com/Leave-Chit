const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

async function modifyPdf() {
    //Get data from leavechit.html forms
    let firstName = document.getElementById('First Name').value;
    let middleName = document.getElementById('Middle Name').value;
    let lastName = document.getElementById('Last Name').value;
    let employeeID = document.getElementById('Employee ID').value;
    let firstChoice = document.getElementById('Leave First').value;
    let secondChoice = document.getElementById('Leave Second').value;
    let thirdChoice = document.getElementById('Leave Third').value;
    let fourthChoice = document.getElementById('Leave Fourth').value;
    let dateStartString = document.getElementById('Date Start').value;
    let dateEndString = document.getElementById('Date End').value;
    let annualHours = document.getElementById('Annual Hours').value;
    let compHours = document.getElementById('Comp Hours').value;
    let sickHours = document.getElementById('Sick Hours').value;
    let shoreDays = document.getElementById('Shore Days').value;

    console.log(firstChoice);
    
    //Declare leave days variables
    let annualDays = Math.floor(annualHours / 8);
    let compDays = Math.floor(compHours / 8);
    let sickDays = Math.floor(sickHours / 8);
    let LWOPDays = 0;

    //Calculate end dates for each leave type
    let startDate = new Date(dateStartString);
    let endDate = new Date(dateEndString);

    let count = 0;
    const curDate = new Date(startDate.getTime());
    let SSH = 0;
    let zeroCheck = 0;
    let curChoice = firstChoice;
    let debugCount = 0;

    console.log(curChoice);

    //Declare date strings
    // startDateShoreString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
    let startDateShoreString = '';
    let endDateShoreString = '';
    let startDateAnnualString = '';
    let endDateAnnualString = '';
    let startDateCompString = '';
    let endDateCompString = '';
    let startDateSickString = '';
    let endDateSickString = '';
    let startDateLWOPString = '';
    let endDateLWOPString = '';

    while (curDate <= endDate) {
        SSH = 0;

        // Assign new choice start date
        if (curChoice == 'Shore' && count == 0) {
            startDateShoreString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
        } else if (curChoice == 'Annual' && count == 0) {
            startDateAnnualString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
        } else if (curChoice == 'Compensatory' && count == 0) {
            startDateCompString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
        } else if (curChoice == 'Sick' && count == 0) {
            startDateSickString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
        } else if (curChoice == 'LWOP' && count == 0) {
            startDateLWOPString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
        }

        const dayOfWeek = curDate.getDay();
        if(dayOfWeek == 0 || dayOfWeek == 6) {
            // Weekend
            SSH = 1;
        } else if (curDate.getMonth() == 0 && curDate.getDate() == 1) {
            // New Year's Day, non-weekend
            SSH = 1;
        } else if ((curDate.getMonth() == 0 && curDate.getDate() == 2) && dayOfWeek == 1) {
            // Sunday New Year's Day, Observed Monday
            SSH = 1;
        } else if ((curDate.getMonth() == 11 && curDate.getDate() == 31) && dayOfWeek == 5) {
            // Saturday New Year's Day, observed Friday
            SSH = 1;
        } else if ((curDate.getDate() >= 15 && curDate.getDate() <= 21) && (dayOfWeek == 1 && curDate.getMonth() == 0)) {
            // Third Monday of January, MLK Jr's Birthday
            SSH = 1;
        } else if ((curDate.getDate() >= 15 && curDate.getDate() <= 21) && (dayOfWeek == 1 && curDate.getMonth() == 1)) {
            // Third Monday of February, Washington's Birthday
            SSH = 1;
        } else if ((curDate.getDate() >= 25 && curDate.getDate() <= 31) && (dayOfWeek == 1 && curDate.getMonth() == 4)) {
            // Last Monday of May, Memorial Day
            SSH = 1;
        } else if ((curDate.getDate() >= 1 && curDate.getDate() <= 7) && (dayOfWeek == 1 && curDate.getMonth() == 8)) {
            // First Monday of September, Labor Day
            SSH = 1;
        } else if ((curDate.getDate() >= 8 && curDate.getDate() <= 14) && (dayOfWeek == 1 && curDate.getMonth() == 9)) {
            // Second Monday of October, Colombus Day
            SSH = 1;
        } else if ((curDate.getDate() >= 15 && curDate.getDate() <= 21) && (dayOfWeek == 1 && curDate.getMonth() == 1)) {
            // Fourth Thursday of November, Thanksgiving
            SSH = 1;
        } else if (curDate.getMonth() == 5 && curDate.getDate() == 19) {
            // Juneteenth, non-weekend
            SSH = 1;
        } else if ((curDate.getMonth() == 5 && curDate.getDate() == 20) && dayOfWeek == 1) {
            // Sunday Juneteenth, Observed Monday
            SSH = 1;
        } else if ((curDate.getMonth() == 5 && curDate.getDate() == 18) && dayOfWeek == 5) {
            // Saturday Juneteenth, observed Friday
            SSH = 1;
        } else if (curDate.getMonth() == 6 && curDate.getDate() == 4) {
            // Independence Day, non-weekend
            SSH = 1;
        } else if ((curDate.getMonth() == 6 && curDate.getDate() == 5) && dayOfWeek == 1) {
            // Sunday Independence Day, Observed Monday
            SSH = 1;
        } else if ((curDate.getMonth() == 6 && curDate.getDate() == 3) && dayOfWeek == 5) {
            // Saturday Independence Day, observed Friday
            SSH = 1;
        } else if (curDate.getMonth() == 10 && curDate.getDate() == 11) {
            // Veterans' Day, non-weekend
            SSH = 1;
        } else if ((curDate.getMonth() == 10 && curDate.getDate() == 12) && dayOfWeek == 1) {
            // Sunday Veterans' Day, Observed Monday
            SSH = 1;
        } else if ((curDate.getMonth() == 10 && curDate.getDate() == 10) && dayOfWeek == 5) {
            // Saturday Veterans' Day, observed Friday
            SSH = 1;
        } else if (curDate.getMonth() == 11 && curDate.getDate() == 25) {
            // Christmas, non-weekend
            SSH = 1;
        } else if ((curDate.getMonth() == 11 && curDate.getDate() == 26) && dayOfWeek == 1) {
            // Sunday Christmas, Observed Monday
            SSH = 1;
        } else if ((curDate.getMonth() == 11 && curDate.getDate() == 24) && dayOfWeek == 5) {
            // Saturday Christmas, observed Friday
            SSH = 1;
        }
        // Increase day count if day is not holiday or weekend
        if (SSH == 0) count++;

        // Check if count exceeds leave available for current choice, move to next choice
        while (zeroCheck == 0) {
            console.log('While loop entered');
            if (curChoice == 'Shore' && count == shoreDays) {
                console.log('Shore end if check entered');
                endDateShoreString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
                count = 0;
                if (firstChoice == 'Shore') {
                    curChoice = secondChoice;
                } else if (secondChoice == 'Shore') {
                    curChoice = thirdChoice;
                } else if (thirdChoice == 'Shore') {
                    curChoice = fourthChoice;
                } else if (fourthChoice == 'Shore') {
                    curChoice = 'LWOP';
                }
            } else if (curChoice == 'Annual' && count == annualDays) {
                endDateAnnualString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
                count = 0;
                if (firstChoice == 'Annual') {
                    curChoice = secondChoice;
                } else if (secondChoice == 'Annual') {
                    curChoice = thirdChoice;
                } else if (thirdChoice == 'Annual') {
                    curChoice = fourthChoice;
                } else if (fourthChoice == 'Annual') {
                    curChoice = 'LWOP';
                }
            } else if (curChoice == 'Compensatory' && count == compDays) {
                endDateCompString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
                count = 0;
                if (firstChoice == 'Compensatory') {
                    curChoice = secondChoice;
                } else if (secondChoice == 'Compensatory') {
                    curChoice = thirdChoice;
                } else if (thirdChoice == 'Compensatory') {
                    curChoice = fourthChoice;
                } else if (fourthChoice == 'Compensatory') {
                    curChoice = 'LWOP';
                }
            } else if (curChoice == 'Sick' && count == sickDays) {
                endDateSickString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
                count = 0;
                if (firstChoice == 'Sick') {
                    curChoice = secondChoice;
                } else if (secondChoice == 'Sick') {
                    curChoice = thirdChoice;
                } else if (thirdChoice == 'Sick') {
                    curChoice = fourthChoice;
                } else if (fourthChoice == 'Sick') {
                    curChoice = 'LWOP';
                }
            } else {
                zeroCheck = 1;
            }
        }
        //Check if last loop, set final end date
        if (curChoice == 'Shore' && curDate == endDate) {
            endDateShoreString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
            shoreDays = count;
        }
        if (curChoice == 'Annual' && curDate == endDate) {
            endDateAnnualString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
            annualDays = count;
        }
        if (curChoice == 'Compensatory' && curDate == endDate) {
            endDateCompString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
            compDays = count;
        }
        if (curChoice == 'Sick' && curDate == endDate) {
            endDateSickString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
            sickDays = count;
        }
        if (curChoice == 'LWOP' && curDate == endDate) {
            endDateLWOPString = curDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});
            LWOPDays = count;
        }

        curDate.setDate(curDate.getDate() + 1);
        debugCount++;
    }

    console.log(debugCount.toString());
    console.log('Shore Start:' + startDateShoreString);
    console.log('Shore End:' + endDateShoreString);
    console.log('Annual Start:' + startDateAnnualString);
    console.log('Annual End:' + endDateAnnualString);
    console.log('Comp Start:' + startDateCompString);
    console.log('Comp End:' + endDateCompString);
    console.log('LWOP Start:' + startDateLWOPString);
    console.log('LWOP End:' + endDateLWOPString);

    

    // Fetch an existing PDF document
    const url = 'opm71_fillable.pdf';
  	const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get PDFDocument Form Fields
    const form = pdfDoc.getForm();
    //const fields = form.getFields();
    //fields.forEach(field => {
    //    const type = field.constructor.name;
    //    const name = field.getName();
    //    var fieldText = '';
    //    try {
    //        fieldText = field.getText();
    //        fieldChecked = 'null';
    //    }
    //    catch(err) {
    //        fieldText = 'null';
    //        try {
    //            fieldChecked = field.isChecked();
    //        }
    //        catch(err) {
    //            fieldChecked = 'null';
    //        }
    //    }
    //    console.log(`${type}: ${name}: ${fieldText}: ${fieldChecked}`);
    //})

    //Convert Final days to hours
    annualHours = annualDays * 8;
    sickHours = sickDays * 8;
    compHours = compDays * 8;
    let LWOPHours = LWOPDays * 8;

    // Fill PDF Text Fields
    form.getTextField('form1[0].#subform[0].Table1[0].Row2[0].TextField[0]').setText(lastName + ', ' + firstName + ', ' + middleName);
    form.getTextField('form1[0].#subform[0].Table1[0].Row2[0].TextField[1]').setText(employeeID);
    form.getTextField('form1[0].#subform[0].Table1[0].Row4[0].TextField[0]').setText('Military Sealift Command');

    // Fill leave date fields
    if (startDateShoreString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox4[1]').check();
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].DateTimeField21[0]').setText(startDateShoreString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].DateTimeField22[0]').setText(endDateShoreString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].DateTimeField28[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].DateTimeField31[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row2[0].TextField[0]').setText(shoreDays);
        form.getTextField('form1[0].#subform[0].Table8[0].Row2[0].TextField[0]').setText(shoreDays + 'to be billed as shore leave days.');
    }
    if (startDateAnnualString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox1[0]').check();
        form.getTextField('form1[0].#subform[0].Table3[0].Row3[0].DateTimeField1[0]').setText(startDateAnnualString);
        form.getTextField('form1[0].#subform[0].Table3[0].Row3[0].DateTimeField2[0]').setText(endDateAnnualString);
        form.getTextField('form1[0].#subform[0].Table3[1].Row3[0].DateTimeField1[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table3[1].Row3[0].DateTimeField2[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table4[0].Row2[0].TextField[0]').setText(annualHours.toString());
    }
    if (startDateCompString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox4[0]').check();
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].DateTimeField19[0]').setText(startDateCompString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].DateTimeField20[0]').setText(endDateCompString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].DateTimeField27[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].DateTimeField30[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row1[0].TextField[0]').setText(compHours.toString());
    }
    if (startDateSickString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox1[3]').check();
        form.getTextField('form1[0].#subform[0].Table3[0].Row6[0].DateTimeField7[0]').setText(startDateSickString);
        form.getTextField('form1[0].#subform[0].Table3[0].Row6[0].DateTimeField8[0]').setText(endDateSickString);
        form.getTextField('form1[0].#subform[0].Table3[1].Row6[0].DateTimeField15[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table3[1].Row6[0].DateTimeField16[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table4[0].Row5[0].TextField[0]').setText(sickHours.toString());
    }
    if (startDateLWOPString != '') {
        form.getCheckBox('form1[0].#subform[0].CheckBox4[2]').check();
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].DateTimeField23[0]').setText(startDateLWOPString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].DateTimeField24[0]').setText(endDateLWOPString);
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].DateTimeField29[0]').setText('8:00:00 AM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].DateTimeField32[0]').setText('5:00:00 PM');
        form.getTextField('form1[0].#subform[0].Table7[0].Row3[0].TextField[0]').setText(LWOPHours.toString());
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    // const pdfBytes = await pdfDoc.save({dataUri: true})
      
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri;
	// Trigger the browser to download the PDF document
    //download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}