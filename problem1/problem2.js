const fs = require('fs');


writeFilePromise("file1", "abcd")
    .then((result) => {
        console.log(result);
        return writeFilePromise("file2", "abcd");
    })
    .then((result) => {
        console.log(result);
        return writeFilePromise("file3", "abcd");
    })
    .then((result) => {
        console.log(result);
        return unlinkFilePromise("file1");
    })
    .then((result) => {
        console.log(result);
        return unlinkFilePromise("file2");
    })
    .then((result) => {
        console.log(result);
        return unlinkFilePromise("file3");
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });


function writeFilePromise(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, (err,data) => {
            if (err) {
                reject(`Error in writing ${fileName}: ${err.message}`);
            } else {
                resolve(`${fileName} written successfully`);
            }
        });
    });
}

function unlinkFilePromise(fileName) {
    return new Promise((resolve, reject) => {
        fs.unlink(fileName, (err,data) => {
            if (err) {
                reject(`Error in unlinking ${fileName}: ${err.message}`);
            } else {
                resolve(`${fileName} deleted successfully`);
            }
        });
    });
}

