import { Injectable } from '@angular/core'
import { concatMap, delay, finalize, from, of } from 'rxjs'
import { MediaService } from '../shared/service/media.service'

export type SimonColor = 'R' | 'G' | 'B' | 'Y'

export class SimonButton {
  active: boolean = false

  constructor(public color: SimonColor, public audio: string) {
  }

  activate(timeout: number = 420) {
    this.active = !this.active
    setTimeout(() => {
      this.active = false
    }, timeout)
  }
}

export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getIndex(id: SimonColor, controls: SimonButton[]) {
  return controls.findIndex(c => c.color === id)
}

export function getItem(id: SimonColor, controls: SimonButton[]) {
  return controls.find(c => c.color === id) || controls[0]
}

@Injectable({
  providedIn: 'root'
})
export class SimonService {
  controls: SimonButton[] = [
    new SimonButton('G', 'a4'),
    new SimonButton('R', 'f4'),
    new SimonButton('Y', 'c4'),
    new SimonButton('B', 'd4')
  ]

  defaultRules: SimonColor[] = ['G', 'B', 'G', 'B', 'R', 'Y', 'R', 'Y']
  rules: SimonColor[] = []

  inProgress: boolean = false
  playerInput: SimonColor[] = []

  constructor(private media: MediaService) {
  }

  start() {
    if (this.rules.length) {
      return
    }
    this.addRule()
    // this.addRule()
    // this.showPattern()
  }

  addRule() {
    this.rules.push(this.generateRule())
    this.playerInput = [...this.rules]
    this.inProgress = true
    this.showPattern()
  }

  generateRule() {
    const {length} = this.defaultRules
    return [...this.defaultRules][getRandom(0, length - 1)]
  }

  showPattern(time = 666) {
    from(this.rules)
      .pipe(
        concatMap(item => of(item).pipe(delay(time))),
        finalize(() => {
          console.log(2)
          this.inProgress = false
        })
      )
      .subscribe(a => {
        const item = getItem(a, this.controls)
        item.activate(time)
        this.media.play(item.audio)
      })
  }

  press(control: SimonButton) {
    if (this.inProgress) {
      console.log(1)
      return
    }
    if (!this.rules.length) {
      return
    }

    const first = this.playerInput.shift()
    control.activate()
    if (control.color !== first) {
      this.over()
    } else {
      this.media.play(control.audio)
      if (!this.playerInput.length) {
        setTimeout(() => {
          this.addRule()
        }, 1000)

      }
    }
  }

  over() {
    this.media.play('game-over')
  }
}
