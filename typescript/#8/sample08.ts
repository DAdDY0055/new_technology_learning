const zipSync = new Promise((resolve, reject) => {

  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'zip.json', true);
  console.log(xhr.response);

  xhr.onload = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // console.log(xhr.response);
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.statusText));
      }
    }
  }

  xhr.send(null);
}).then((value) => {
  console.log(value);
}).catch((resson) => {
  console.log(resson);
});
