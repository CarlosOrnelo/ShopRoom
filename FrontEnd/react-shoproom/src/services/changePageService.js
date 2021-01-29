import history from 'history/browser';

export function changePage (path) {
    
    history.push(path)
    history.go(path)
}
