#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_col;
varying vec2 v_tex0;
uniform sampler2D texture0;

uniform float smoothing;
// = 1.0/32.0;

// drop shadow computed in fragment shader
void main() {
    vec4 texColor = texture2D(texture0, v_tex0);

    float dst = texColor.a;
    float alpha = smoothstep(0.5 - smoothing, 0.5 + smoothing, dst);
    vec4 base = v_col * vec4(alpha);

    gl_FragColor = base;
    if (gl_FragColor.a<0.1)
        discard;
}