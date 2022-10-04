import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  mute: boolean = false
  disable: boolean = false
  cache: { [key: string]: HTMLAudioElement } = {}

  constructor() {
  }

  play(name: string) {
    if (this.mute) {
      return
    }
    const cache = this.stop(name)
    if (cache) {
      return cache.play()
    }
    let audio = new Audio(`assets/audio/${name}.mp3`)
    this.cache[name] = audio
    return audio.play()
  }

  stop(name: string) {
    const cache = this.cache[name]
    if (cache) {
      cache.pause()
      cache.currentTime = 0
    }
    return cache
  }

  vibrate(pattern: number[] = [0]) {
    const canVibrate = 'vibrate' in navigator
    if (this.disable || !canVibrate) {
      return
    }
    navigator.vibrate(pattern)
  }

  toggleMute() {
    this.mute = !this.mute
    for (let key in this.cache) {
      const audio = this.cache[key]
      audio.pause()
      audio.currentTime = 0
    }
  }
}
