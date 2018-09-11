import Store from './store';

const store = new Store();
let id = 0;

function toaster(item, cb) {
    id += 1;
    store.add(Object.assign({ id, onClose: cb }, item));
}

export { toaster, store };
