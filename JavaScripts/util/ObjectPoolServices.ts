/** 
 * @Author       : MengYao.Zhao
 * @Date         : 2022/03/9 09:39:34
 * @Description  : 通用对象池
 */
export namespace objectPoolServices {

    interface IPool {
        getSize(): number;
        clear(): void;
        spawn(): any;
        return(instance: any): void;
    }

    export class ObjectPool<T> implements IPool {

        private spawnFun: () => T;

        private pool: Array<T>;

        public constructor(spawn: () => T, initNum: number = 3) {
            this.spawnFun = spawn;
            this.pool = new Array<T>(initNum);
            for (let index = 0; index < initNum; index++) {
                this.pool[index] = this.spawnFun();
            }
        }

        public spawn(): T {
            if (this.pool.length > 0) {
                return this.pool.pop();
            }
            return this.spawnFun();
        }

        public return(instance: T): void {
            if (instance == null) {
                return;
            }
            this.pool.push(instance);
        }

        public getSize(): number {
            return this.pool.length;
        }

        public forEach(fn: (param: T) => void) {
            this.pool.forEach((obj) => {
                fn(obj)
            })
        }

        public getPoolEntry(): Array<T> {
            return this.pool;
        }

        public clear(): void {
            this.pool.length = 0;
        }
    }

    const poolMap: Map<string, IPool> = new Map<string, IPool>();

    type Class<T> = { new(...arg): T }

    export function getPool<T>(cls: Class<T>, autoCreat: boolean = true): ObjectPool<T> {
        let pool = poolMap.get(cls.name);
        if (pool === undefined && autoCreat) {
            initPool(cls, () => new cls())
        }
        return poolMap.get(cls.name) as ObjectPool<T>;
    }

    export function initPool<T>(cls: Class<T>, spawn: () => T, initNum: number = 3): ObjectPool<T> {
        let pool = poolMap.get(cls.name);
        if (pool === undefined) {
            pool = new ObjectPool<T>(spawn, initNum);
            poolMap.set(cls.name, pool);
        }
        return pool as ObjectPool<T>;
    }

    export function destroyPool<T>(cls: Class<T>): void {
        let pool = poolMap.get(cls.name);
        if (pool !== undefined) {
            pool.clear();
        }
        poolMap.delete(cls.name);
    }

    export function clear() {
        for (const [key, pool] of poolMap) {
            pool.clear();
        }
        poolMap.clear();
    }
}