attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;


uniform float timeFactor;


varying vec2 vTextureCoord;

void main() {

	vec3 offset = vec3(0.0, 0.0, 0.0);
    vec3 xzScale = vec3(0.0, 0.0, 1.0);

    vTextureCoord = aTextureCoord;

    offset=xzScale*0.1*sin(timeFactor*aVertexPosition.y*0.1)*aVertexPosition.y;


    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

