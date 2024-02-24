class MyPromise {
  constructor(func) {
    this.thenCallbacks = [];
    this.catchCallbacks = [];
    this.finallyCallbacks = [];
    try {
      func(this.onSuccess, this.onReject);
    } catch (e) {
      this.onReject(e);
    }
  }
  onSuccess(res) {
    let runningVal = res;
    this.thenCallbacks.forEach((cb) => {
      try {
        runningVal = cb(runningVal);
      } catch (e) {
        this.onReject();
      }
    });
    this.runFinally();
    return runningVal;
  }
  onReject(res) {
    let runningVal = res;
    this.catchCallbacks.forEach((cb) => {
      try {
        runningVal = cb(runningVal);
      } catch (e) {
        this.onReject();
      }
    });
    this.runFinally();
    return runningVal;
  }
  runFinally(res) {
    let runningVal = res;
    this.finallyCallbacks.forEach((cb) => {
      try {
        runningVal = cb(runningVal);
      } catch (e) {
        this.onReject();
      }
    });
    // this.runFinally();
    return runningVal;
    // this.finallyCallbacks.forEach((cb) => cb());
  }
  then(cb) {
    this.thenCallbacks.push(cb);
    console.log(this.then);
    // return this;
  }
  catch(cb) {
    this.catchCallbacks.push(cb);
    // return this;
  }
  finally(cb) {
    this.finallyCallbacks.push(cb);
    // return this;
  }
  resolve(val) {
    return new Promise((res) => res(val));
  }
  reject(val) {
    return new Promise((_, rej) => rej(val));
  }
  all() {}
  allSettled() {}
}

module.exports = MyPromise;
