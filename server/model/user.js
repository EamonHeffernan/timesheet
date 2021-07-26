"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = exports.Day = exports.User = exports.UserClass = exports.DayClass = exports.BreakClass = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class BreakClass {
    start;
    end;
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], BreakClass.prototype, "start", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], BreakClass.prototype, "end", void 0);
exports.BreakClass = BreakClass;
class DayClass {
    start;
    end;
    breaks;
    duration;
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], DayClass.prototype, "start", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], DayClass.prototype, "end", void 0);
__decorate([
    typegoose_1.prop({ type: () => BreakClass }),
    __metadata("design:type", Array)
], DayClass.prototype, "breaks", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], DayClass.prototype, "duration", void 0);
exports.DayClass = DayClass;
let UserClass = class UserClass {
    email;
    name;
    dob;
    hash;
    admin;
    sessionKey;
    days;
    sendableUser() {
        return {
            email: this.email,
            name: this.name,
            dob: this.dob,
            admin: this.admin,
        };
    }
};
__decorate([
    typegoose_1.prop({ index: true, unique: true }),
    __metadata("design:type", String)
], UserClass.prototype, "email", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserClass.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], UserClass.prototype, "dob", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserClass.prototype, "hash", void 0);
__decorate([
    typegoose_1.prop({ default: false, index: true }),
    __metadata("design:type", Boolean)
], UserClass.prototype, "admin", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], UserClass.prototype, "sessionKey", void 0);
__decorate([
    typegoose_1.prop({ type: () => DayClass }),
    __metadata("design:type", Array)
], UserClass.prototype, "days", void 0);
UserClass = __decorate([
    typegoose_1.modelOptions({ schemaOptions: { collection: "users" } })
], UserClass);
exports.UserClass = UserClass;
// Export the model
exports.User = typegoose_1.getModelForClass(UserClass);
exports.Day = DayClass;
exports.Break = BreakClass;
