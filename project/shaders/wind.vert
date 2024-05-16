attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float timeFactor;
uniform sampler2D waterMap;

varying vec2 vTextureCoord;

void main() {

	vec3 offset = vec3(0.0, 0.0, 0.0);

    vTextureCoord = aTextureCoord;

    vec2 factor = vec2(timeFactor *0.4, timeFactor * 0.4) + vTextureCoord;

    offset.z = texture2D(waterMap, factor).b * 0.1;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

