class Game{
    constructor(){

		const loader = new THREE.FontLoader();

		const asd = this;

		loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        asd.scene = new THREE.Scene();
		asd.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

		asd.renderer = new THREE.WebGLRenderer();
        asd.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( asd.renderer.domElement );


			const geometry = new THREE.TextGeometry( 'Jebac prace', {
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
			
		const light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 0, 20, 10 );
        const ambient = new THREE.AmbientLight( 0x707070 ); // soft white light

		asd.material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
		
        asd.cube = new THREE.Mesh( geometry, asd.material );

        asd.scene.add( asd.cube );
        asd.scene.add( light );
        asd.scene.add( ambient );

		asd.camera.position.z = 100;
		asd.camera.position.x = 300;
        
        asd.animate();

        asd.back = true;

		asd.i = 0;
			
		} );
    }
    
	animate() {
        const game = this;
        requestAnimationFrame( function(){ game.animate(); } );

        //this.cube.rotation.x += 0.01;
        //this.cube.rotation.y += 0.01;
        if (this.back) {
            this.cube.position.z -= 1;
        } else {
            this.cube.position.z += 1;
        }

        if (this.cube.position.z < -200) {
            this.back = false;
        }

        if (this.cube.position.z > 0) {
            this.back = true;
        }
		
		if (this.i%2 === 0) {
			this.cube.material = new THREE.MeshPhongMaterial( { color: 0x000099 } )
		} else {
			this.cube.material =	new THREE.MeshPhongMaterial( { color: 0xff0000 } )
		}
		
					this.i += 1;

        this.renderer.render( this.scene, this.camera );
    }
}