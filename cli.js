#!/usr/bin/env node

// var program = require('commander');

// program
//   .version('1.0.0')
//   .description('Input: \nEnter any string in command \nOutput: \n1. Converts input string to uppercase \n2. Converts input string to alternate upperand lower case \n3. Generate each input string characters into CSV file')
//   .option('-c, --config <inputstr>', 'configuration')
  
// program.parse(process.argv)

// if (program.config)
//     console.log('input: ', `${program.config}`)
// else
//     console.log('no input string enter')


const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const csvWriter = require('csv-writer')

var questions = [{
  type: 'input',
  name: 'string',
  message: "Please input a string\n",
}]

inquirer.prompt(questions).then(answers => {

    string = answers['string']

    // Converts input string to uppercase
    stringUp = string.toUpperCase()

    // Converts input string to alternate upperand lower case
    stringAlt = string.split('')
    for (i=0; i< string.length; i++) {
        if (i % 2) {
            stringAlt[i] = string[i].toUpperCase()
        } else {
            stringAlt[i] = string[i].toLowerCase()
        }
    }
    stringAlt = stringAlt.join('')

    // Generate each input string characters into CSV file
    arr4csv = string.split('')
    file_path = path.join(__dirname,'/app', 'string.csv')
    // createCsvWriter  = csvWriter.createObjectCsvWriter
    const createCsvWriter  = csvWriter.createArrayCsvWriter
    const writer = createCsvWriter ({
        path: file_path
    })

    const records = [
        arr4csv
    ]
    



    console.log(`1. ${stringUp}`)
    console.log(`2. ${stringAlt}`)

    writer.writeRecords(records)
        .then(() => {
            console.log(`3. CSV created at ${file_path}`);
        });
})