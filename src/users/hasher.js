"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashString = exports.checkHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * Check if hash was created from string
 * @param plainText Plaintext input
 * @param hash Hashed version to compare against
 * @returns Boolean if the hash was created from the plaintext string
 */
const checkHash = (plainText, hash) => {
    return bcrypt_1.default.compareSync(plainText, hash);
};
exports.checkHash = checkHash;
/**
 * Hash a string
 * @param input Plaintext input
 * @returns Hashed version of string with 10 salt rounds
 */
const hashString = (input) => {
    return bcrypt_1.default.hashSync(input, 10);
};
exports.hashString = hashString;
//# sourceMappingURL=hasher.js.map