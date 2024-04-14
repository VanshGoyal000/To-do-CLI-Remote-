import { connectDb , disconnectDB } from "../db/connectDb.js";
import { getTaskCode } from "./deleteTask.js";
import inquirer from "inquirer";
import todos from "../models/todo.model.js";
import ora from "ora";
import chalk from "chalk";

async function askUpdate(todo){
    try {
        const update = await inquirer.prompt([
                {name : 'name' , message: 'Update the Name?' , type: 'input'},
                {name : 'detail' , message: 'Update the detail?' , type: 'input' , default : todo.detail},
                {name : 'status' , message: 'Update the Status?' , type: 'list' , choices: ['Pending' , 'Completed'] , default : todo.status},
        ])
        return update 
    } catch (error) {
        console.log('something went wrong ' , error)
    }
}

export default async function updateTask(){
    try{
        const userCode = await getTaskCode()

        await connectDb()
        const spinner = ora('Finding the To do ... ').start()
        const todo = await todos.findOne({
            code : userCode.code
        })
        spinner.stop()

        if(!todo){
            console.log(chalk.redBright('Code is Wrong'))
            process.exit(1)
        }else{
            console.log(chalk.green('Type updated prop or press ENTER if not want to enter'))

            const update = await askUpdate(todo)

            if(update.status == 'Completed'){
                spinner.text = 'Deleting the to-do...'
                spinner.start()
            
                await todos.deleteOne({_id : todo._id})
                
                spinner.stop()
                console.log(chalk.greenBright('Deleted The To-do'))
            } else {
                const spinner = ora('Updating the to-do').start()
            
                await todos.updateOne({_id : todo._id} , update , {runValidators : true})
            
                spinner.stop()
                console.log(chalk.greenBright('Updated the To-do'))
            }
            

        await disconnectDB()
        }
    }catch(error){
        console.log(chalk.red(`Error Occured ${error}`))
        process.exit(1)
    }

}
