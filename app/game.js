class Game{
	constructor(){
		if ( THREE.WEBGL.isWebGLAvailable() === false ) {    document.body.appendChild( THREE.WEBGLd.getWebGLErrorMessage() );}
			
		this.container;
		this.player = { };
		this.stats;
		this.controls;
		this.camera;
		this.scene;
		this.renderer;
		
		this.container = document.createElement( 'div' );
		this.container.style.height = '100%';
		document.body.appendChild( this.container );
        
		const game = this;
		
		this.assetsPath = './assets/';
		
		this.clock = new THREE.Clock();
        
        this.init();

		window.onError = function(error){
			console.error(JSON.stringify(error));
		}
	}
	
	init() {

		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		this.camera.position.set(112, 100, 400);
        
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xa0a0a0 );
		this.scene.fog = new THREE.Fog( 0xa0a0a0, 700, 1800 );

		let light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		light.position.set( 0, 200, 0 );
		this.scene.add( light );

		light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0, 200, 100 );
		light.castShadow = true;
		light.shadow.camera.top = 180;
		light.shadow.camera.bottom = -100;
		light.shadow.camera.left = -120;
		light.shadow.camera.right = 120;
		this.scene.add( light );

		// ground
		var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 4000, 4000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
		mesh.rotation.x = - Math.PI / 2;
		//mesh.position.y = -100;
		mesh.receiveShadow = true;
		this.scene.add( mesh );

		var grid = new THREE.GridHelper( 4000, 60, 0x000000, 0x000000 );
		//grid.position.y = -100;
		grid.material.opacity = 0.2;
		grid.material.transparent = true;
		this.scene.add( grid );

		// model
		const loader = new THREE.FBXLoader();
		const game = this;
		


		const loader1 = new THREE.FontLoader();

		loader1.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

			const geometry1 = new THREE.TextGeometry( 'Jebac prace', {
				font: font,
				size: 80,
				height: 5,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 10,
				bevelSize: 8,
				bevelOffset: 0,
				bevelSegments: 5
			});
			
			game.material1 = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
			
			game.cube1 = new THREE.Mesh( geometry1, game.material1 );

			game.scene.add( game.cube1 );
			
			game.back = true;

			game.i = 0;
			
		} );



		loader.load( `${this.assetsPath}BaseballIdle.fbx`, function ( object ) {

			object.mixer = new THREE.AnimationMixer( object );
			game.player.mixer = object.mixer;
			game.player.root = object.mixer.getRoot();
			
			object.name = "Warrior";
					
			object.traverse( function ( child ) {
				if ( child.isMesh ) {
					child.castShadow = true;
					child.receiveShadow = false;		
				}
			} );
			
            // const tLoader = new THREE.TextureLoader();
            // tLoader.load(`${game.assetsPath}images/SimplePeople_FireFighter_Brown.png`, function(texture){
			// 	object.traverse( function ( child ) {
			// 		if ( child.isMesh ){
			// 			child.material.map = texture;
			// 		}
			// 	} );
			// });
            
			game.scene.add(object);
			game.player.object = object;
			game.player.mixer.clipAction(object.animations[0]).play();
            
            game.animate();
		} );
		
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.shadowMap.enabled = true;
		this.container.appendChild( this.renderer.domElement );
        
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 150, 0);
        this.controls.update();
			
		window.addEventListener( 'resize', function(){ game.onWindowResize(); }, false );
	}
	
	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

	}

	animate() {
		const game = this;
		const dt = this.clock.getDelta();
		
		requestAnimationFrame( function(){ game.animate(); } );
		
		if (game.player.mixer!==undefined) game.player.mixer.update(dt);
		
        if (game.back) {
            game.cube1.position.z -= 1;
        } else {
            game.cube1.position.z += 1;
        }

        if (game.cube1.position.z < -200) {
            game.back = false;
        }

        if (game.cube1.position.z > 0) {
            game.back = true;
        }
		
		if (game.i%2 === 0) {
			game.cube1.material = new THREE.MeshPhongMaterial( { color: 0x000099 } )
		} else {
			game.cube1.material =	new THREE.MeshPhongMaterial( { color: 0xff0000 } )
		}
		
		game.i += 1;

		this.renderer.render( this.scene, this.camera );

	}
}