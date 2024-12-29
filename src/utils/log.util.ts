import {green, red, yellow} from "colors";

export function successLog(text: string): void {
  if (text) {
    console.log(green(text));
  }
}

export function errorLog(text: string): void {
  if (text) {
    console.error(red(text));
  }
}

export function wraningLog(text: string): void {
  if (text) {
    console.warn(yellow(text));
  }
}
