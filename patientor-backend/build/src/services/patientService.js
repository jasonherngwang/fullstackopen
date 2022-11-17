'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const patients_1 = __importDefault(require('../../data/patients'));
const getAllPatients = () => {
  return patients_1.default;
};
const getNonSensitiveEntries = () => {
  return patients_1.default;
};
exports.default = {
  getAllPatients,
  getNonSensitiveEntries,
};