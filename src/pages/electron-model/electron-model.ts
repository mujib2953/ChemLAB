import { Component, Input, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ElectronModel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-electron-model',
	templateUrl: 'electron-model.html'
})
export class ElectronModelPage {
	oCanvasData: any = {
		angle: 0
	};
	isStarted: boolean = true;
	ctx: any;
	myInterval: any;

	@Input() elementData:any;
	@ViewChild( 'canvasWrapper' ) canvasWrapper: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ElectronModelPage');
		
	}
	ngAfterViewChecked() {
		if( this.isStarted ) {
			this.creatCanvas();
			this.isStarted = false;
		}
		
	}

	creatCanvas(): void {
		let container: any = this.canvasWrapper.nativeElement;
		let can = document.createElement( 'canvas' );
		can.width = 280;
		can.height = 150;
		this.ctx = can.getContext( '2d' );
		
		this.oCanvasData.centX = can.width/2;
		this.oCanvasData.centY = can.height/2;
		this.oCanvasData.Width = can.width;
		this.oCanvasData.Height = can.height;

		container.appendChild( can );

		this.fillBg( can );
		this.createShell( can );
		this.motion( can );
	}

	fillBg( can: any ): void {

		this.ctx.fillStyle = '#EEE';
		this.ctx.fillRect(0, 0, can.width, can.height);

	}

	createShell( can: any ): void {

		let centerX: any = this.oCanvasData.centX;
		let centerY: any = this.oCanvasData.centY;
		let radius: number = 25;

		this.ctx.beginPath();
		this.ctx.arc( centerX, centerY, radius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = '#AFA';
		this.ctx.fill();
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = '#000';
		this.ctx.stroke();

		this.ctx.closePath();

		this.createOrbits();
		this.createElectrons();
	}


	createOrbits(): void {

		let centerX: any = this.oCanvasData.centX;
		let centerY: any = this.oCanvasData.centY;
		let radius: number = 45;
		let nOrbitCount: number = 2;

		for( let i = 0; i < nOrbitCount; i++ ) {

			this.ctx.beginPath();
			this.ctx.arc( centerX, centerY, radius, 0, 2 * Math.PI, false);
			this.ctx.lineWidth = 1;
			this.ctx.strokeStyle = '#000';
			this.ctx.stroke();
			this.ctx.closePath();

			radius += 15;
		}

	}

	createElectrons(): void {

		let centerX: any = this.oCanvasData.centX;
		let centerY: any = this.oCanvasData.centY;
		let radius: any = 5;

		// let elecX = centerX + 45;
		// let elecY = centerY;

		let elecX: any = centerX + Math.cos( this.oCanvasData.angle * ( Math.PI/2 ) ) * 45;
		let elecY: any = centerY + Math.sin( this.oCanvasData.angle * ( Math.PI/2 ) ) * 45;

		this.ctx.beginPath();
		this.ctx.arc( elecX, elecY, radius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = '#444';
		this.ctx.fill();
		this.ctx.closePath();
		this.oCanvasData.angle += 0.02;
	}

	motion( can: any ): void {
		console.log( 'Motion..' );
		this.clearCanvas( can );

		if( this.myInterval == undefined ) {

			this.myInterval = setInterval( ()=> {
				this.motion( can );
			}, 500 );

		}
		this.createShell( can );
	}

	clearCanvas( can: any ): void {
		can.width = can.width;
	}
}
