attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 vertice;

uniform float timeFactor;
uniform float normScale;

void main() {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x + normScale * sin(timeFactor), aVertexPosition.y, aVertexPosition.z, 1.0);
    vertice = gl_Position;
}

