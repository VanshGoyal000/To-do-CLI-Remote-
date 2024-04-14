import mongoose from "mongoose";
import ora from "ora";
import chalk from "chalk";
import { config } from "dotenv";
config();

export async function connectDb(){
    try {
        const spinner = ora('Connecting to DB...').start()
        await mongoose.connect(`${process.env.MONGO_URL}`)
        spinner.stop()
        console.log(chalk.greenBright(`Connected to MongoDB`))
    } catch (error) {
        console.log(chalk.redBright('Error: ') , error);
        process.exit(1)
    }
}
export async function disconnectDB(){
    try {
        await mongoose.disconnect()
        console.log(chalk.greenBright('Disconnected from the DB'))
    } catch (error) {
        console.log(chalk.redBright('Error : ' ) , error)
    }
    process.exit(1)
}



