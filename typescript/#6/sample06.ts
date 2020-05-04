interface AddressFromat {
  zip: string;
  prefecture: string;
  city: string;
}

class Address implements AddressFromat {
  readonly addresses: any;
  public zip;
  public prefecture;
  public city;

  public constructor(private _zip: string) {
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

  get zip(): string {
    // return this._zip;
    return this._zip;
  }

  set zip(value: string) {
    this._zip = value;
  }

  public getAddress(): string {
    let here = this.addresses[this.zip];
    return `${here.prefecture} ${here.city}`
  }
}

let myaddress = new Address('038-0000');
myaddress.zip = '111-1111';

console.log(myaddress.zip);
console.log(myaddress.getAddress());
console.log(myaddress.addresses);

myaddress.addresses = 'errer';
