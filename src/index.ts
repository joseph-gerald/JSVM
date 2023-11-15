import { obfuscate } from "./obfuscator";
import fs from "fs";
import { spawn } from "child_process";

function byteCount(s: any) {
    return encodeURI(s).split(/%..|./).length - 1;
}

(async () => {
    const input = fs.readFileSync("input/4.js").toString();
    let output = await obfuscate(input);
    if (output == undefined) {
        console.log("Output is undefined");
        return;
    }
    const shouldEval = false;
    fs.writeFileSync("output/output.js", output);
    if (shouldEval) {
        console.info("Evaluating output with NodeJS...\n");

        const nodeProcess = spawn("node", ["output/output.js"], {
            stdio: "inherit",
        });

        const timeStarted = Date.now();

        nodeProcess.on("error", (error) => {
            console.error("Failed to execute 'node':", error);
        });

        nodeProcess.on("close", (code) => {
            if (code === 0) {
                console.log("\nOutput evaluation completed successfully.");
                console.log("It took " + (Date.now() - timeStarted) + "ms to run!")
                console.log("SIZE: " + byteCount(input) + " -> " + byteCount(output) + " bytes")
            } else {
                console.error(`'node' process exited with code ${code}.`);
                console.error("!! Is code beutified? !!")
            }
        });
    } else {
        console.log("\nOutput evaluation completed successfully.");
        console.log("SIZE: " + byteCount(input) + " -> " + byteCount(output) + " bytes")
    }
})();