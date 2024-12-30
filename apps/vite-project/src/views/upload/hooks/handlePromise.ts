export function handlePromise(arr: any[], cb: (resolve, reject, index) => void | any, limit = 3) {

  return new Promise((finalResolve) => {
    let cbIndex = 0;
    function run(index) {
      try {
        new Promise((resolve, reject) => {

          cb(resolve, reject, cbIndex);
          cbIndex++;
        })
          .then(res => {
            if (cbIndex < arr.length) {
              run(index);
            } 
          })
          .catch(err => {
            console.log("err", err);
          });
      } catch (error) {
        console.log("err", error);
      }
    }
    for (let index = 0; index < limit; index++) {
      run(index);
    }

  })
}