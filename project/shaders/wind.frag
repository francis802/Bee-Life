#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D grassTex;

void main() {

  vec4 colorTex = texture2D(grassTex, vTextureCoord);

  gl_FragColor = colorTex;
}