import inquirer from "inquirer";
import { connectDb , disconnectDB } from "../db/connectDb.js";
import todos from "../models/todo.model.js";
import ora from "ora";
import chalk from "chalk";

async function input(){
    const ans = await inquirer.prompt([
        { name : 'name' , message : 'Name of task' , type: 'input'}, 
        { name : 'detail', message : 'Enter details of Task ' , type : 'input'},
    ])
    return ans
}

const askQues = async() => {
    const todoarr = []
    let loop = false

    do{
        const userRes = await input()
        todoarr.push(userRes)
        const confirmQ = await  inquirer.prompt([{ name : 'confirm' , message : 'Do you want to add more tasks?', type:'confirm' }])
        if(confirmQ.confirm){
            loop = true
        }else{
            loop = false
        }}
        while(loop)
    
    return todoarr
    }


    export default async function addTask(){
        try {
            const userRes = await askQues();

            await connectDb();

            let spinner = ora('Creating Todos...').start()

            for(let i =0 ; i < userRes.length ; i++){
                const response = userRes[i];
                await todos.create(response)
            }

            spinner.stop()
            console.log(
                chalk.greenBright('Created The To-do')
            )

            await disconnectDB();

        } catch (error) {
            console.log("Something wrong " , error)
            process.exit(1)
        }
    }

    