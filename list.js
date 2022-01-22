/**
 * This preview generator is used to generate the preview for the list of
 * Run script: node list.js
 */

const fs = require('fs');

const baseRepoAddress = 'https://raw.githubusercontent.com/AlgernonRepo/OperatingSystemIcons/master',
    previewSize = 'OperatingSystemIconsSVG';

function updateList(newData) {
    fs.readFile('./README.md', 'utf8', (err, data) => {
        if (err) {
            console.error(err);

            return;
        }

        if (data) {
            const match = data.match('<!-- TABLE_START -->((.|\n|\s|\r)*)<!-- TABLE_END -->');

            if (match && match[1]) {
                data = data.replace(match[1], `\n\n${newData}\n`);

                new Promise(function (resolve, reject) {
                    fs.writeFile('./README.md', data, 'utf8', function (err) {
                        if (err) reject(err);
                        else resolve(data);
                    });
                });
            }
        }
    });
}

try {
    var tableMarkdown = ``;

    fs.readdir(`./${previewSize}`, (err, files) => {
        files.forEach(file => {
            tableMarkdown += `![](${baseRepoAddress}/${previewSize}/${file} "${file}")\n`;
        });

        if (tableMarkdown) {
            updateList(tableMarkdown);
        }
    });
} catch (err) {
    console.log(err.toString());
}