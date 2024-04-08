#! /usr/bin/env node
import inquirer from "inquirer";
let balance = 100000;
let pinNumber = 12345;
let pinCode = await inquirer.prompt([
    {
        name: 'pin',
        type: 'number',
        mask: "*",
        message: "Enter Your Pin Number:"
    },
]);
async function atm() {
    if (pinCode.pin === pinNumber) {
        let transactions = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "Choose the Transaction You want to Perform:",
                choices: ["Check Balance", "FastCash", "Withdraw", "Deposit", "Exit"],
            },
        ]);
        switch (transactions.action) {
            case "Check Balance":
                console.log(`Your Available Balance is: ${balance}`);
                break;
            case "Withdraw":
                let Withdraw = await inquirer.prompt([
                    { name: "amount", type: "number", message: "Enter Your Amount:" },
                ]);
                if (Withdraw.amount <= balance) {
                    console.log(`Withdrawn ${Withdraw.amount}. \n Your New Balance is ${balance -= Withdraw.amount}.`);
                }
                else {
                    console.log("Sorry, You have Insufficient Fund");
                }
                break;
            case "FastCash":
                let cash = await inquirer.prompt([
                    {
                        name: "fast",
                        type: "list",
                        message: "Choose the Amount:",
                        choices: ["5000", "10000", "25000", "50000"],
                    },
                ]);
                if (cash.fast <= balance) {
                    console.log(`Your Withdrawn Amount Is ${cash.fast} \n New Balance ${balance -= cash.fast}.`);
                }
                else {
                    console.log("Sorry, You have Insufficient Fund");
                }
                break;
            case "Deposit":
                let depositAmount = await inquirer.prompt([
                    { name: "number", type: "number", message: "Amount You want to deposit:" },
                ]);
                if (depositAmount.number) {
                    console.log(`Deposit Amount${depositAmount.number} \n New Balance${balance += depositAmount.number}`);
                }
                break;
            case "Exit":
                let cancel = await inquirer.prompt([
                    {
                        name: "finish",
                        type: "confirm",
                        message: "Do You Want To Exit:",
                    }
                ]);
                if (cancel.finish === false) {
                    return;
                }
                break;
            default:
                console.log(`Please Choose the Correct Transaction ${transactions.action}`);
        }
    }
    else {
        console.log("Invalid Pin.");
    }
}
let result = await atm().catch(console.error);
console.log(result);
atm();
// Method 2
// import inquirer from "inquirer"
// class Atm {
//     currentBalance: number;
//     constructor(currentBalance: number) {
//         this.currentBalance = currentBalance;
//     }
//     deposit(amount: number) {
//         this.currentBalance += amount
//         console.log(`You Deposit Amount Is: ${amount} , Your Current Balance Is: ${this.currentBalance}`)
//     }
//     withdraw(amount: number) {
//         if (amount <= this.currentBalance) {
//             this.currentBalance -= amount;
//             console.log(`Withdrawal Amount Is: ${amount} Your Current Balance Is: ${this.currentBalance} `)
//         } else {
//             console.log(`Insufficient Balance ${this.currentBalance} Cannot Perform Your Tranaction`)
//         }
//     }
//     fastCash(amount: number) {
//         if (this.currentBalance > amount) {
//             this.withdraw(amount)
//         } else {
//             console.log(`Insufficient Balance ${this.currentBalance}`)
//         }
//     }
//     checkBalance() {
//         console.log(`Currenet Balance ${this.currentBalance}`)
//     }
// }
// let atm = new Atm(100000)
// async function tranactionPerform() {
//     while (true) {
//         let task = await inquirer.prompt([{
//             name: 'Perform',
//             type: "list",
//             message: "Please Choose An Option",
//             //choices: ["Deposit", "Withdraw", "Fast Cash", "Check Balance", " Exit"]
//             choices: ["Deposit", "Withdraw", "Fast Cash", "Check Balance" ]
//         }]);
//         switch (task.Perform) {
//             case "Deposit":
//                 const { depositAmount } = await inquirer.prompt([{
//                     type: "number",
//                     name: "depositAmount",
//                     message: "Enter Amount To Deposit:"
//                 }]);
//                 atm.deposit(depositAmount)
//                 break;
//             case 'Withdraw':
//                 const { withdrawAmount } = await inquirer.prompt({
//                     type: 'number',
//                     name: 'withdrawAmount',
//                     message: 'Enter withdrawal amount:'
//                 });
//                 atm.withdraw(withdrawAmount);
//                 break;
//             case 'Check Balance':
//                 atm.checkBalance()
//                 break;
//             case 'Fast Cash':
//                 let { fastCashAmount } = await inquirer.prompt([{
//                     name: 'fastCashAmount',
//                     type: 'list',
//                     message: 'Please Choose A Selected Amount',
//                     choices: [100, 200, 500, 1000, 5000, 10000]
//                 }]);
//                 atm.fastCash(fastCashAmount);
//                 break;
//                 // case 'Exit':
//                 //     let { confirmExit } = await inquirer.prompt({
//                 //         name: 'confirmExit',
//                 //         type: 'confirm',
//                 //         message: "Are You Sure To Exit"
//                 //     });
//                 //     if (confirmExit) {
//                 //         console.log('Exiting.....');
//                 //         process.exit();
//                 //     } else {
//                 //         console.log('Do You Want To Perform Your Transaction');
//                 //     }
//                 //     break; 
//             default:
//                 console.log("Invalid Option")
//         }
//     }
// }
// tranactionPerform();
