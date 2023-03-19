const { Configuration, OpenAIApi } = require("openai");
const readline = require('readline');

const configuration = new Configuration({
   organization: "org-T8Su9wEl3AA1mLKGvOjGDwAc",
   apiKey: "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",
});

const openai = new OpenAIApi(configuration);

let myArray = [];

async function callApi(data) {
   const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `translate and write word : "${data}" into hindi language fonts`,
      max_tokens: 200,
      temperature: 0,
   });
   const final_output = response.data.choices[0].text;
   console.log(final_output);
}

async function runApi() {
   const data = myArray;

   for (let i = 0; i < data.length; i++) {
      await callApi(data[i].trim());
   }
}

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

rl.question('Enter Your Input : ', async (name) => {
   let userInput = name;
   myArray = userInput.split(",").map(str => str.trim());

   rl.close();
});


runApi();