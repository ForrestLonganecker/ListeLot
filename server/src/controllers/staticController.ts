// Actions defined for static routes
export {};

interface Res {
  send: Function
};

interface Req {
  
}

module.exports = {
  index(req: Req, res: Res){
    res.send('Hello ListeLot!');
  }
};