/*
 * @Script: startUp.ts
 * @Author: Eamon Heffernan
 * @Email: eamonrheffernan@gmail.com
 * @Created At: 2021-08-01 11:46:20
 * @Last Modified By: Eamon Heffernan
 * @Last Modified At: 2021-08-01 18:17:32
 * @Description: Runs before any other script.
 */

// Running code that has to be run first.
require("../httpResponses");

//Proceeding with original start up.
require("../../" + process.argv[2]);
