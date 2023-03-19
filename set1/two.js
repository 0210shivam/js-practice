const readline = require('readline');

let myArray = [];

async function callApi(data) {

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `translate and write word : "${data}" into hindi language fonts`,
    max_tokens: 200,
    temperature: 0,
  });


  const final_output = response.data.choices[0].text;
  console.log(final_output)
}

function callApii(dataa){
  console.log(dataa)
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter Your Input : ', async (name) => {
  let userInput = name;
  myArray = userInput.split(",").map(str => str.trim());

  for(let i=0; i < myArray.length; i++){
    await callApi(myArray[i]);
  }




  rl.close();
});



