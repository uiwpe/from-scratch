import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core'
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'
import { fromEvent, Observable, Subscription, tap } from 'rxjs'

@Directive({
  selector: '[fsAvoid]'
})
export class AvoidDirective implements OnInit, OnDestroy {
  @Input() active: boolean = false
  @Input() attraction: boolean = false // 0 ->  <- 0

  @HostBinding('style.margin.px') margin: number = 12

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: MouseEvent) {
    const {clientX, clientY} = event
    // console.log(clientX, clientY)
    this.mouseover(clientX, clientY)
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    const {clientX, clientY} = event
    // console.log(clientX, clientY)
    this.mouseover(clientX, clientY)
  }

  parentEvent!: Subscription

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.parentEvent = fromEvent(this.el.nativeElement.parentElement, 'mousemove')
      .pipe(tap((e: any) => console.log(e)))
      .subscribe()
  }

  ngOnDestroy() {
    this.el.nativeElement.parentElement.removeEventListener('mouseover')
  }

  //  (mouseover)="avoid($event, button)" (mouseleave)="back()"
  mouseover(x: number, y: number) {
    this.attraction ? this.follow(x, y) : this.avoid(x, y)
  }

  avoid(x: number, y: number) {
    const {nativeElement} = this.el
    const {parentElement} = nativeElement
    // console.log(nativeElement, parentElement)

    console.log(x, y, nativeElement.getBoundingClientRect())

    // const {top, left} = this.el.nativeElement.styles
    // console.log(top, left)
  }

  follow(x: number, y: number) {
  }
}
