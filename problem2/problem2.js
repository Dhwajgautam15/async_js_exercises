const fs = require('fs');

async function readAndConvertToUppercase() {
  try {
    const data = await readFileAsync('problem2/lipsum.txt', 'utf-8');
    const uppercaseContent = data.toUpperCase();
    const filename = 'uppercase.txt';
    await writeFileAsync(filename, uppercaseContent);
    await appendFileAsync('filenames.txt', filename + '\n');
    return 'uppercase.txt';
  } catch (error) {
    throw new Error(`Error in readAndConvertToUppercase: ${error.message}`);
  }
}

const sentenceFiles = [];
async function readUppercaseAndSplit() {
  try {
    const data = await readFileAsync('uppercase.txt', 'utf-8');
    const sentences = data.split(/[.!?]/);

    let filename;
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      if (sentence.length > 0) {
        filename = `sentence_${i + 1}.txt`;
        await writeFileAsync(filename, sentence);
        sentenceFiles.push(sentence);
        await appendFileAsync('filenames.txt', filename + '\n');
      }
    }
    return sentenceFiles;
  } catch (error) {
    throw new Error(`Error in readUppercaseAndSplit: ${error.message}`);
  }
}

async function readSentencesSortAndWrite() {
  try {
    const sortedSentences = sentenceFiles.sort().join('\n');
    const filename = 'sorted.txt';
    await writeFileAsync(filename, sortedSentences);
    await appendFileAsync('filenames.txt', filename + '\n');
    return 'sorted.txt';
  } catch (error) {
    throw new Error(`Error in readSentencesSortAndWrite: ${error.message}`);
  }
}

async function readFilenamesAndDelete() {
  try {
    const data = await readFileAsync('filenames.txt', 'utf-8');
    const fileList = data.split('\n').map((line) => line.trim());

    for (const filename of fileList) {
      try {
        if (filename) {
          await unlinkFileAsync(filename);
          console.log(`Deleted: ${filename}`);
        }
      } catch (err) {
        console.error(`Error deleting ${filename}: ${err.message}`);
      }
    }

    console.log('All files deleted.');
  } catch (err) {
    console.error(`Error reading filenames.txt: ${err.message}`);
  }
}

// Custom implementations for fs functions using callback patterns

function readFileAsync(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFileAsync(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function appendFileAsync(path, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function unlinkFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  try {
    await readAndConvertToUppercase();
    await readUppercaseAndSplit();
    await readSentencesSortAndWrite();
    await readFilenamesAndDelete();

    console.log('All tasks completed successfully.');
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

main();
