
export default class EventObserver {
    observers: any[];

    constructor () {
      this.observers = []
    }
  
    subscribe (fn: any) {
      this.observers.push(fn)
    }
  
    unsubscribe (fn: any) {
      this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }
  
    broadcast (data: number) {
      this.observers.forEach(subscriber => subscriber(data))
    }
}




