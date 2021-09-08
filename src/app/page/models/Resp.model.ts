export class Resp<T> {
    constructor (
        public error: string,
        public data: T
    ) { }

}
