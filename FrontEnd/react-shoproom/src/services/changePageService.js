import history from 'history/browser';

export function changePage (path, data) {
  
    history.push({pathname: path, state: data});
    history.go(path);
}
