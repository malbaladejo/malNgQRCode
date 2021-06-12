import { Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Point } from 'jsqr/dist/locator';
import { ScanService } from './scan.service';
import jsQR from 'jsqr';

@Injectable({
    providedIn: 'root'
})
export class JsQrService implements ScanService {
    private canvasElement: HTMLCanvasElement;
    private canvas: CanvasRenderingContext2D;
    private video: HTMLVideoElement;
    private tracks: MediaStreamTrack[];

    private code: Subject<string>;
    private $code: Observable<string>;

    private refreshIntervalId;
    private refreshIntervalInMs = 500;

    constructor() {

    }

    public start(): Observable<string> {
        this.initialize();
        this.startVideo();
        return this.$code;
    }

    public stop() {
        this.tracks.forEach(track => {
            track.stop();
        });

        this.video.srcObject = null;
        clearInterval(this.refreshIntervalId);
    }

    private initialize() {
        this.code = new Subject<string>();
        this.$code = this.code.asObservable();

        this.video = document.createElement('video') as HTMLVideoElement;
        this.canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        this.canvas = this.canvasElement.getContext('2d');
    }

    private startVideo() {
        // Use facingMode: environment to attemt to get the front camera on phones
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
            this.tracks = stream.getVideoTracks();
            this.video.srcObject = stream;
            this.video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
            this.video.play();
            this.refreshIntervalId = setInterval(() => this.onRefresh(), this.refreshIntervalInMs);
        });
    }

    private onRefresh() {

        if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.canvasElement.hidden = false;

            this.canvasElement.height = this.video.videoHeight;
            this.canvasElement.width = this.video.videoWidth;
            this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
            const imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert',
            });
            if (code) {
                const color = '#FF3B58';
                this.drawRectangle(
                    code.location.topLeftCorner,
                    code.location.topRightCorner,
                    code.location.bottomRightCorner,
                    code.location.bottomLeftCorner,
                    color);

                this.code.next(code.data);
            } else {
            }
        }
    }

    private drawRectangle(
        topLeftCorner: Point,
        topRightCorner: Point,
        bottomRightCorner: Point,
        bottomLeftCorner: Point,
        color: string) {
        this.drawLine(topLeftCorner, topRightCorner, color);
        this.drawLine(topRightCorner, bottomRightCorner, color);
        this.drawLine(bottomRightCorner, bottomLeftCorner, color);
        this.drawLine(bottomLeftCorner, topLeftCorner, color);
    }

    private drawLine(begin: Point, end: Point, color: string) {
        this.canvas.beginPath();
        this.canvas.moveTo(begin.x, begin.y);
        this.canvas.lineTo(end.x, end.y);
        this.canvas.lineWidth = 4;
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
    }
}
