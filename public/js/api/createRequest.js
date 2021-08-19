/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = options.responseType;

  if (options.method === 'GET') {

    let url = options.url + '?';
    for (const key in options.data) {
      url += `${key}${options.data[key]}&`
    }
    url = url.slice(0, -1);
    try {
      xhr.open(options.method, url);
      xhr.send();
    }
    catch (e) {
      options.callback(e, null);
    }
  }
  else {
    const formData = new FormData();
    for (const key in options.data) {
      formData.append(key, options.data[key]);
    }
    try {
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }
    catch (e) {
      options.callback(e, null);
    }
  }

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      options.callback(null, xhr.response);
    }
  });

  xhr.addEventListener('error', function () {
      options.callback(xhr.status, xhr.statusText);
    }
  );

}