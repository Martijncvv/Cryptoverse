import {AdditiveBlending, Color, DoubleSide, ShaderMaterial, Uniform,} from "three";

/**
 * Creates a FakeGlowMaterial.
 *
 * @param {Object} parameters - The parameters to configure the material.
 * @param {number} [parameters.falloff=0.1] - The falloff factor for the glow effect.
 * @param {number} [parameters.glowInternalRadius=6.0] - The internal radius for the glow effect.
 * @param {Color} [parameters.glowColor=new Color('#00d5ff')] - The color of the glow effect.
 * @param {number} [parameters.glowSharpness=0.5] - The sharpness of the glow effect.
 * @param {number} [parameters.opacity=1.0] - The opacity of the hologram.
 * @param {number} [parameters.side=THREE.FrontSide] - The rendering side. Use `THREE.FrontSide`, `THREE.BackSide`, or `THREE.DoubleSide`.
 * @param {boolean} [parameters.depthTest=false] - Enable or disable depth testing.
 * @returns {ShaderMaterial} - The FakeGlow material.
 */
export function createFakeGlowMaterial(parameters = {}) {
  return new ShaderMaterial({
    vertexShader: `
      varying vec3 vPosition;
      varying vec3 vNormal;

      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * modelPosition;
        vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
        vPosition = modelPosition.xyz;
        vNormal = modelNormal.xyz;
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float falloff;
      uniform float glowSharpness;
      uniform float glowInternalRadius;
      uniform float opacity;

      varying vec3 vPosition;
      varying vec3 vNormal;

      void main()
      {
        vec3 normal = normalize(vNormal);
        if(!gl_FrontFacing) normal *= -1.0;
        
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = dot(viewDirection, normal);
        fresnel = pow(fresnel, glowInternalRadius + 0.1);
        
        float falloff = smoothstep(0.0, falloff, fresnel);
        float fakeGlow = fresnel;
        fakeGlow += fresnel * glowSharpness;
        fakeGlow *= falloff;
        
        gl_FragColor = vec4(clamp(glowColor * fresnel, 0.0, 1.0), clamp(fakeGlow, 0.0, opacity));
        
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      } 
    `,
    uniforms: {
      glowColor: new Uniform(parameters.glowColor || new Color("#00d5ff")),
      falloff: new Uniform(parameters.falloff || 0.1),
      glowSharpness: new Uniform(parameters.glowSharpness || 0.5),
      glowInternalRadius: new Uniform(parameters.glowInternalRadius || 6.0),
      opacity: new Uniform(parameters.opacity || 1.0),
    },
    side: parameters.side || DoubleSide,
    depthTest: parameters.depthTest || false,
    depthWrite: true,
    blending: parameters.blendMode || AdditiveBlending,
    transparent: true,
  });
}

export default createFakeGlowMaterial;
