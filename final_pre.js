const readline = require('readline');
const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

// ________________________________________________________________



// *Configuration for openai Api : 

const configuration = new Configuration({
  organization: "org-T8Su9wEl3AA1mLKGvOjGDwAc",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

// ________________________________________________________________



// *Calling Api function :

let elapsedTimeInMs;
let elapsedTimeInSec;
let elapsedTimeInSeconds;


async function callApi(data, callback) {

  fs.appendFileSync('output/output.txt', `INPUT : ${data} \n`);       //*takes input

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `translate and write each word seprately which seprated by comma : "${data}" into hindi language fonts`,
    max_tokens: 200,
    temperature: 0,
  });

  const final_output = response.data.choices[0].text;

  callback();

  fs.appendFileSync("output/output.txt", `OUTPUT: ${final_output} \n \n \n`);      //*Writes Output
  fs.appendFileSync("output/output.txt", `Elapsed Time (in ms): ${elapsedTimeInMs} ms Elapsed Time (in sec): ${elapsedTimeInSeconds} sec \n`);
  fs.appendFileSync("output/output.txt", '\n  ________________________________________ \n \n');

}

// ________________________________________________________________



// *Taking Input -------->

const rl = readline.createInterface({

  input: process.stdin,
  output: process.stdout

});

let startTime;

rl.question('Enter Your Input - ', (input) => {

  // *Calling Function Here ----->

  startTime = process.hrtime();

  callApi(input, () => {

    const endTime = process.hrtime(startTime);

    // *in ms
    elapsedTimeInMs = endTime[0] * 1000 + endTime[1] / 1000000;
    console.log(`Elapsed time (in ms): ${elapsedTimeInMs}ms`);

    // *in sec
    elapsedTimeInSec = (endTime[0] * 1e9 + endTime[1]) / 1e9;
    elapsedTimeInSeconds = elapsedTimeInSec.toFixed(2); // convert from nanoseconds to seconds
    console.log(`Elapsed time (in sec): ${elapsedTimeInSec.toFixed(2)}s`);
    rl.close();

  });
});


// ________________________________________________________________

const wait = () => {
  return new Promise(resolve => {
    if (elapsedTimeInMs) {
      resolve(elapsedTimeInMs);
    } else {
      setTimeout(() => resolve(wait()), 100);
    }
  });
}

wait();

const wait2 = () => {
  return new Promise(resolve => {
    if (elapsedTimeInSec) {
      resolve(elapsedTimeInSec);
    } else {
      setTimeout(() => resolve(wait()), 100);
    }
  });
}

wait2();
