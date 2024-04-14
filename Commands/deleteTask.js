import inquirer from "inquirer";
import ora from "ora";
import { connectDb , disconnectDB } from "../db/connectDb.js";
import chalk from "chalk";
import todos from "../models/todo.model.js";

export async function getTaskCode(){
    try {
        const ans = await inquirer.prompt([
            {
                name: 'code',
                'message': 'Enter Code of the to-do',
                type: 'input',
            },
        ])

        ans.code = ans.code.trim()
        return ans
    } catch (error) {
        console.log("Something went Wrong " , Error)
    }
}

export default async function deleteTask(){
    try {
        
        const userCode = await getTaskCode()
        await connectDb()

        const spinner = ora('Deleting the To-do...').start();

        const response = await todos.deleteOne({
            code : userCode.code
        })
        spinner.stop()

        if(response.deletedCount === 0){
            console.log(chalk.redBright('Could not find any todo , deletion failed'))
        }else{
            console.log(chalk.redBright('Delete Successcfully'))
        }

        await disconnectDB()
    } catch (error) {
        console.log("Something Went Wrong , Error:" , error)
        process.exit(1)
    }
}
