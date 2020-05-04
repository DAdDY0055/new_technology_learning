"use strict";
var Address = /** @class */ (function () {
    function Address(_zip) {
        this._zip = _zip;
        this.addresses = {
            '079-1100': {
                'prefecture': '北海道',
                'city': '赤平山'
            },
            '038-0000': {
                'prefecture': '青森県',
                'city': '青森市'
            },
            '111-1111': {
                'prefecture': 'hogehoge県',
                'city': 'fugafuga市'
            }
        };
        // this.zip = zip;
    }
    Object.defineProperty(Address.prototype, "zip", {
        get: function () {
            // return this._zip;
            return this._zip;
        },
        set: function (value) {
            this._zip = value;
        },
        enumerable: true,
        configurable: true
    });
    Address.prototype.getAddress = function () {
        var here = this.addresses[this.zip];
        return here.prefecture + " " + here.city;
    };
    return Address;
}());
var myaddress = new Address('038-0000');
myaddress.zip = '111-1111';
console.log(myaddress.zip);
console.log(myaddress.getAddress());
console.log(myaddress.addresses);
myaddress.addresses = 'errer';
