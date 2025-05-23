class currency{
    constructor(fromcurency,tocurrency,value){
        
        this.fromcurency=fromcurency;
        this.tocurrency=tocurrency;
        this.value=value;
    }
}

const tygia1 =new currency("USD","VND",25.954);
const tygia2 =new currency("USD","CNY",7.20);
const tygia3 =new currency("USD","YEN",142.63);
const tygia4 =new currency("USD","EUR",0.88);
const tygia5 =new currency("USD","BTC",0.0000091);
const tygia6 =new currency("USD","USD",1);

  let tygia=[tygia1,tygia2,tygia3,tygia4,tygia5,tygia6];
export default tygia;