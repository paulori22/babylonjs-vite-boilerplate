import {
    Color3,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3,
} from "@babylonjs/core";
import {
    AdvancedDynamicTexture,
    Button,
    Control,
    Image,
    StackPanel,
    TextBlock,
} from "@babylonjs/gui";

export class Card {
    public scene: Scene;
    public mesh: Mesh;

    private name: string = "";
    private description: string = "";
    private points: number = 0;

    constructor(
        scene: Scene,
        name: string,
        description: string,
        points: number,
    ) {
        this.scene = scene;
        this.name = name;
        this.description = description;
        this.points = points;

        this.mesh = MeshBuilder.CreateBox(
            "card_test",
            { width: 0.63, height: 0.68, depth: 0.01 },
            this.scene,
        );

        this.mesh.position = new Vector3(0, 2, -4);

        this.loadCardGui();
    }

    async loadCardGui() {
        const plane = MeshBuilder.CreatePlane("plane", {
            height: 0.67,
            width: 0.63,
        });
        plane.position.z = -0.01;
        plane.position.y = 0;
        plane.parent = this.mesh;

        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(
            plane,
            0.63 * 512,
            0.67 * 512,
        );

        let loadedGUI = await advancedTexture.parseFromURLAsync(
            "gui/cardGuiTexture.json",
        );
        const titleTextBlock = loadedGUI.getControlByName("title") as TextBlock;
        titleTextBlock.text = this.name;
        const descriptionTextBlock = loadedGUI.getControlByName(
            "description",
        ) as TextBlock;
        descriptionTextBlock.text = this.description;
        const pointLeftTextBlock = loadedGUI.getControlByName(
            "pointLeft",
        ) as TextBlock;
        pointLeftTextBlock.text = this.points.toString();
        const pointRightTextBlock = loadedGUI.getControlByName(
            "pointRight",
        ) as TextBlock;
        pointRightTextBlock.text = this.points.toString();
    }
}
