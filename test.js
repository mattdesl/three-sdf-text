var Promise = require('bluebird')
var load = Promise.promisify(require('scriptjs'))
var domready = Promise.promisify(require('domready'))
var img = Promise.promisify(require('img'))

var fontImageSrc = 'font/LatoBlack-sdf.png'
var Font = require('./font/LatoBlack-sdf.json')

var img = require('img')
var path = 'bower_components/three.js/build/three.js'

//once we're ready to show the app..
Promise.all([
    img(fontImageSrc),
    domready(),
    load(path)
]).spread(function(image) {
    run(image)
})

// load(path, function() {
//     domready(run)
// })

function run(fontImage) {
    var THREE = window.THREE
    
    var OrbitViewer = require('three-orbit-viewer')(THREE)
    var TextElement = require('./')(THREE)

    var app = OrbitViewer({
        clearColor: 0x1f1f1f,
        clearAlpha: 1.0,
        fov: 65,
        near: 0.001,
        position: new THREE.Vector3(1, 1, -2)
    })

    
    var gl = app.renderer.getContext()
        
    var fontTex2 = THREE.ImageUtils.loadTexture(fontImageSrc)
    fontTex2.minFilter = THREE.LinearMipMapLinearFilter
    fontTex2.magFilter = THREE.LinearFilter
    fontTex2.flipY = false
    fontTex2.anistrophy = app.renderer.getMaxAnisotropy();


    var geo = new THREE.BoxGeometry(1,1,1)
    var mat = new THREE.MeshBasicMaterial({  map: fontTex2, color: 0x1d1d1d })
    var box = new THREE.Mesh(geo, mat)
    app.scene.add(box)

    var text = TextElement(app.renderer, {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in consectetur nisl. In ornare semper lectus, vitae sagittis libero placerat nec. Integer augue nunc, dignissim nec scelerisque sit amet, ultricies sit amet nisi. Nullam tristique luctus urna, sed finibus odio accumsan ac. Donec ultricies purus sit amet augue congue tristique. Maecenas tincidunt sem at est semper posuere. Proin rutrum eleifend vulputate. Nulla vulputate urna eu nibh facilisis vulputate. Suspendisse viverra id ligula a eleifend.',
        wrapWidth: 400,
        align: 'left',
        font: Font,
        padding: -4,
        color: 0xaaff00,
        textures: [ fontTex2 ]
    })

    var textObj = new THREE.Object3D()
    
    var s = 0.01
    textObj.scale.set(s,s,s)
    textObj.position.set(-0.5, -text.element.getBounds().height/2 *s, -1.5)

    app.scene.add(textObj)

    var time = 0
    app.on('render', function(dt) {
        textObj.rotation += dt/1000 * 0.15

        text.begin()
        text.draw(app.camera, textObj)
        text.end()

        app.renderer.resetGLState()
    })
}