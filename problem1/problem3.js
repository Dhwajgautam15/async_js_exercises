const fs = require('fs').promises;

async function executeOperations() {
    try {
        await writeFileAsync("file1", "abcd");
        console.log("file1 written successfully");

        await writeFileAsync("file2", "abcd");
        console.log("file2 written successfully");

        await writeFileAsync("file3", "abcd");
        console.log("file3 written successfully");

        await unlinkFileAsync("file1");
        console.log("file1 deleted successfully");

        await unlinkFileAsync("file2");
        console.log("file2 deleted successfully");

        await unlinkFileAsync("file3");
        console.log("file3 deleted successfully");
    } catch (error) {
        console.error(error);
    }
}

async function writeFileAsync(fileName, data) {
    try {
        await fs.writeFile(fileName, data);
    } catch (err) {
        throw `Error in writing ${fileName}: ${err.message}`;
    }
}

async function unlinkFileAsync(fileName) {
    try {
        await fs.unlink(fileName);
    } catch (err) {
        throw `Error in unlinking ${fileName}: ${err.message}`;
    }
}


executeOperations();
