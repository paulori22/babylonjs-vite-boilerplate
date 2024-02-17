import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
    ArcRotateCamera,
    Color3,
    Engine,
    FreeCamera,
    HemisphericLight,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Texture,
    Vector3,
} from "@babylonjs/core";
import { Card } from "./Entity";
export class AppOne {
    engine: Engine;
    scene: Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas);
        window.addEventListener("resize", () => {
            this.engine.resize();
        });
        this.scene = createScene(this.engine, this.canvas);
    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            this.scene.debugLayer.show({ overlay: true });
        } else {
            this.scene.debugLayer.hide();
        }
    }

    run() {
        this.debug(true);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}

var createScene = function (engine: Engine, canvas: HTMLCanvasElement) {
    // this is the default code from the playground:

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new Scene(engine);
    const camera = new ArcRotateCamera(
        "camera",
        -Math.PI / 2,
        Math.PI / 2.5,
        3,
        new Vector3(0, 5, -10),
    );
    camera.upperBetaLimit = Math.PI / 2.2;
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 50;
    camera.setPosition(new Vector3(0, 5, -10));
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    /*     // This creates and positions a free camera (non-mesh)
    var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true); */

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    const card = new Card(scene, "Card Name", "Card Description", 2);
    //card.mesh.position = new Vector3(1, 3, 0);
    // Our built-in 'sphere' shape.
    /*     var sphere = MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 2, segments: 32 },
        scene,
    );
    // Move the sphere upward 1/2 its height
    let startPos = 2;
    sphere.position.y = startPos; */

    // Our built-in 'ground' shape.
    var ground = MeshBuilder.CreateGround(
        "ground",
        { width: 6, height: 6 },
        scene,
    );
    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseColor = new Color3(0.5, 0.8, 0.5); // RGB for a greenish color
    ground.material = groundMaterial;
    groundMaterial.bumpTexture = new Texture("./normal.jpg", scene);
    //groundMaterial.bumpTexture.level = 0.125;

    /*     var redMaterial = new BABYLON.StandardMaterial("redMaterial", scene);
    redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0); // RGB for red
    sphere.material = redMaterial; */

    // sphere movement
    /*     
    var sphereVelocity = 0;
    var gravity = 0.009;
    var reboundLoss = 0.1;

    scene.registerBeforeRender(() => {
        sphereVelocity += gravity;
        let newY = sphere.position.y - sphereVelocity;
        sphere.position.y -= sphereVelocity;
        if (newY < 1) {
            sphereVelocity = (reboundLoss - 1) * sphereVelocity;
            newY = 1;
        }
        sphere.position.y = newY;
        if (Math.abs(sphereVelocity) <= gravity && newY < 1 + gravity) {
            sphere.position.y = startPos++;
        }
    });
 */
    return scene;
};
