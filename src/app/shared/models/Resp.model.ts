export class Resp<T> {
    constructor (
        public error: boolean,
        public data: T
    ) { }

}
