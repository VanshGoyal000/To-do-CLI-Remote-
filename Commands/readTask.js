import { connectDb , disconnectDB } from "../db/connectDb.js";
import Todo from "../models/todo.model.js"; // Renamed the imported model to Todo
import chalk from "chalk";
import ora from "ora";

export default async function readTask() {
    try {
        await connectDb()
        const spinner = ora('Fetching Data ...').start()

        const tasks = await Todo.find({}) // Renamed variable to tasks

        spinner.stop()

        if (tasks.length === 0) {
            console.log(chalk.blue('You do not have any tasks'))
        } else {
            tasks.forEach(task => {
                console.log(
                    chalk.cyanBright('Task code : ') + task.code + '\n' +
                    chalk.blueBright('Name : ') + task.name + '\n' +
                    chalk.yellow("Detail: ") + task.detail + "\n" +
                    chalk.grey("Status: ") + task.status + "\n"
                )
            });
        }

        await disconnectDB()
    } catch (error) {
        console.log("Something went really wrong call to FBI", error)
        process.exit(1)
    }
}

