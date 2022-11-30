export type Direction =
    'ArrowUp' |
    'ArrowDown' | 
    'ArrowLeft' |
    'ArrowRight'
;

export type ContentType = 'wood' | 'rock' | 'lake' | 'player' | 'source';
export type SurfaceType = 'earth';
export class Plot {
  public surfaceType : SurfaceType = 'earth'
  public contentType : ContentType|null = null;
  public contentSize : number|Array<string> = 1;
  public x : number = 0;
  public y : number = 0;

  public constructor (x: number,y: number) {
    this.x = x;
    this.y = y;
  }
}