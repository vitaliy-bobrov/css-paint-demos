/* tslint:disable */
export enum Cell {Dead,Alive,}
export class Universe {
free(): void;

static  new(): Universe;

 width(): number;

 height(): number;

 cells(): number;

 render(): string;

 tick(): void;

}
