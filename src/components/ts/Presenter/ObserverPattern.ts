export default class PathEventObserver {
    observers: Array<(path: number) => void>;

    constructor () {
      this.observers = []
    }
  
    public subscribe (fn: (path: number) => void): void {
      this.observers.push(fn)
    }
  
    public unsubscribe (fn: (path: number) => void): void {
      this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }
  
    public broadcast (data: number): void {
      this.observers.forEach(subscriber => subscriber(data))
    }
}




