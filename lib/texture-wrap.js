// in time this will be replaced with a solution
// that better supported ThreeJS Texture objects


function TextureWrap(renderer, tex) {
    if (!(this instanceof TextureWrap))
        return new TextureWrap(renderer, tex)
    this.renderer = renderer
    this.texture = tex
    this._shape = [0, 0]
}

TextureWrap.prototype.bind = function(unit) {
    updateSize(this._shape, this.texture)


    var gl = this.renderer.getContext()
    this.renderer.setTexture(this.texture, unit|0)
    
    gl.bindTexture(gl.TEXTURE_2D, this.texture.__webglTexture)
}

Object.defineProperty(TextureWrap.prototype, "shape", {

    get: function() {
        updateSize(this._shape, this.texture)
        return this._shape
    }
})

function updateSize(shape, texture) {
    shape[0] = (texture.image && texture.image.width)  |0
    shape[1] = (texture.image && texture.image.height) |0
}

module.exports = TextureWrap